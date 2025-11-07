import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useAuth } from "../../contexts/AuthContext";
import { saveEmployeeAvailability, EmployeeAvailability, AvailabilityEntry, WeeklyMaxTimes } from "../../lib/database";

interface AvailabilityOption {
  label: string;
  bgColor: string;
  textColor: string;
  value: string;
}

const availabilityOptions: AvailabilityOption[] = [
  { label: "A", bgColor: "bg-[#52a40b]", textColor: "text-white", value: "avond" },
  { label: "X", bgColor: "bg-[#c50e0e]", textColor: "text-white", value: "niet_beschikbaar" },
  { label: "MA", bgColor: "bg-[#faa82d]", textColor: "text-white", value: "middag_avond" },
  { label: "M", bgColor: "bg-[#f8d10f]", textColor: "text-white", value: "middag" },
];

interface WeekDay {
  day: string;
  date: number;
  fullDate: Date;
}

interface Week {
  id: number;
  days: WeekDay[];
}

const monthNames = [
  "Januari", "Februari", "Maart", "April", "Mei", "Juni",
  "Juli", "Augustus", "September", "Oktober", "November", "December"
];

const dayNames = ["Ma", "Di", "Wo", "Do", "Vr"];

export const BeschikbaarIndelen = (): JSX.Element => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedAvailability, setSelectedAvailability] = useState<{ [key: string]: AvailabilityOption }>({});
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [selectedMaxTimes, setSelectedMaxTimes] = useState<{ [key: number]: number }>({});
  const [openMaxTimesDropdown, setOpenMaxTimesDropdown] = useState<number | null>(null);

  if (!user) {
    navigate('/');
    return <></>;
  }

  const isMonthPast = (): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    monthEnd.setHours(23, 59, 59, 999);

    return monthEnd < today;
  };

  const canEditMonth = !isMonthPast();

  const handleAvailabilityChange = useCallback((dayKey: string, option: AvailabilityOption) => {
    if (!canEditMonth) return;
    setSelectedAvailability((prev) => ({ ...prev, [dayKey]: option }));
    setOpenDropdown(null);
  }, [canEditMonth]);

  const handleMaxTimesChange = useCallback((weekId: number, times: number) => {
    if (!canEditMonth) return;
    setSelectedMaxTimes((prev) => ({ ...prev, [weekId]: times }));
    setOpenMaxTimesDropdown(null);
  }, [canEditMonth]);

  const generateWeeks = (date: Date): Week[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    // Find first Monday of the month (not before)
    const firstDay = new Date(year, month, 1);
    let firstMonday = new Date(firstDay);
    const dayOfWeek = firstDay.getDay();
    
    // If first day is not Monday, find the next Monday
    if (dayOfWeek !== 1) {
      const daysUntilMonday = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
      firstMonday.setDate(firstDay.getDate() + daysUntilMonday);
    }
    
    // Find last day of the month
    const lastDay = new Date(year, month + 1, 0);
    
    // Find the last Friday that is still in the month OR the Friday of the week containing the last day
    let lastFriday = new Date(lastDay);
    const lastDayOfWeek = lastDay.getDay();
    
    if (lastDayOfWeek === 5) {
      // Last day is Friday, use it
      lastFriday = new Date(lastDay);
    } else if (lastDayOfWeek === 6) {
      // Last day is Saturday, go back to Friday (still in month)
      lastFriday.setDate(lastDay.getDate() - 1);
    } else if (lastDayOfWeek === 0) {
      // Last day is Sunday, go back to Friday (still in month)
      lastFriday.setDate(lastDay.getDate() - 2);
    } else if (lastDayOfWeek < 5) {
      // Last day is Mon-Thu, extend to Friday of that week (into next month)
      lastFriday.setDate(lastDay.getDate() + (5 - lastDayOfWeek));
    }
    
    const weeks: Week[] = [];
    let currentWeekStart = new Date(firstMonday);
    let weekIndex = 0;
    
    // Generate weeks from first Monday to last Friday
    while (currentWeekStart.getTime() <= lastFriday.getTime()) {
      const week: Week = {
        id: weekIndex + 1,
        days: []
      };
      
      // Generate Monday to Friday for each week
      for (let dayIndex = 0; dayIndex < 5; dayIndex++) {
        const currentDay = new Date(currentWeekStart);
        currentDay.setDate(currentWeekStart.getDate() + dayIndex);
        
        week.days.push({
          day: dayNames[dayIndex],
          date: currentDay.getDate(),
          fullDate: new Date(currentDay)
        });
      }
      
      weeks.push(week);
      
      // Move to next week
      const nextWeekStart = new Date(currentWeekStart);
      nextWeekStart.setDate(currentWeekStart.getDate() + 7);
      
      // Stop if the next week's Monday is after the last Friday
      if (nextWeekStart.getTime() > lastFriday.getTime()) {
        break;
      }
      
      currentWeekStart = nextWeekStart;
      weekIndex++;
    }
    
    return weeks;
  };

  const weeks = generateWeeks(currentDate);

  const handlePreviousMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSubmitAvailability = () => {
    if (!user) return;

    const availability: AvailabilityEntry[] = [];
    weeks.forEach(week => {
      week.days.forEach(dayInfo => {
        const dayKey = `${week.id}-${week.days.indexOf(dayInfo)}`;
        const selected = selectedAvailability[dayKey];
        if (selected) {
          availability.push({
            date: dayInfo.fullDate.toISOString().split('T')[0], // YYYY-MM-DD
            shiftType: selected.value as 'avond' | 'niet_beschikbaar' | 'middag_avond' | 'middag',
          });
        }
      });
    });

    const weeklyMaxTimes: WeeklyMaxTimes[] = weeks.map(week => ({
      weekId: week.id,
      maxTimes: selectedMaxTimes[week.id] || 2, // Default to 2 if not selected
    }));

    const monthString = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}`;

    const dataToSave: EmployeeAvailability = {
      userId: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      month: monthString,
      availability: availability,
      weeklyMaxTimes: weeklyMaxTimes,
    };

    saveEmployeeAvailability(dataToSave);
    alert("Beschikbaarheid succesvol ingeleverd!");
  };

  return (
    <div className="bg-white overflow-x-hidden w-full min-h-screen flex flex-col">
      <header className="w-full h-[90px] bg-white shadow-[0px_4px_4px_#00000040] flex items-center justify-between px-[71px] relative">
        <div className="flex items-center gap-[43px]">
          <div className={`relative w-12 h-[71px] ${isMenuOpen ? 'lg:block hidden' : ''}`}>
            <div className="absolute top-[19px] left-0 w-[47px] h-14 bg-[#ee7d11]" />
            <img
              className="absolute top-0 left-0 w-7 h-[33px] object-cover"
              alt="Image"
              src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/image-2.png"
            />
            <img
              className="absolute top-px left-0 w-[46px] h-[69px] object-cover"
              alt="Untitled"
              src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/untitled-1-1.png"
            />
            <div className="absolute top-[52px] left-px [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-[19.1px] tracking-[0] leading-[17.2px] whitespace-nowrap">
              B.V.K
            </div>
          </div>

          <h1 className={`[font-family:'Sumana',Helvetica] font-bold text-[#013b87] text-[40px] tracking-[0] leading-[normal] ${isMenuOpen ? 'lg:block hidden' : ''}`}>
            Rooster
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-11 ml-[73px] mt-[12px]">
            <Button
              variant="ghost"
              className="h-auto p-0 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#ee7d11] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
            >
              Beschikbaarheid
            </Button>

            <Button
              variant="ghost"
              className="h-auto p-0 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#003883] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
            >
              Rooster
            </Button>

            <Button
              variant="ghost"
              className="h-auto p-0 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#013b87] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
            >
              Persoonlijk Rooster
            </Button>
          </nav>

          {/* Responsive Navigation - Moves closer on medium screens */}
          <nav className="hidden lg:flex xl:hidden items-center gap-8 ml-[40px] mt-[12px]">
            <Button
              variant="ghost"
              className="h-auto p-0 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#ee7d11] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
            >
              Beschikbaarheid
            </Button>

            <Button
              variant="ghost"
              className="h-auto p-0 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#003883] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
            >
              Rooster
            </Button>

            <Button
              variant="ghost"
              className="h-auto p-0 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#013b87] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
            >
              Persoonlijk Rooster
            </Button>
          </nav>
        </div>

        {/* Desktop Logout */}
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="hidden lg:block h-auto p-0 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#ee7d11] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
        >
          Uitloggen
        </Button>

        {/* Hamburger Menu Button */}
        <Button
          variant="ghost"
          className="lg:hidden h-auto p-2 hover:bg-transparent relative z-50 mt-[12px]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X style={{ width: '36px', height: '36px' }} className="text-[#ee7d11]" strokeWidth={2} />
          ) : (
            <Menu style={{ width: '36px', height: '36px' }} className="text-[#ee7d11]" strokeWidth={2} />
          )}
        </Button>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-0 left-0 right-0 bg-white shadow-[0px_4px_4px_#00000040] z-40">
            <nav className="flex flex-col p-6 gap-4 mt-[12px]">
              <Button
                variant="ghost"
                className="h-auto p-0 justify-start [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#ee7d11] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
              >
                Beschikbaarheid
              </Button>

              <Button
                variant="ghost"
                className="h-auto p-0 justify-start [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#003883] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
              >
                Rooster
              </Button>

              <Button
                variant="ghost"
                className="h-auto p-0 justify-start [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#013b87] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
              >
                Persoonlijk Rooster
              </Button>

              <div className="border-t border-gray-200 pt-4 mt-2">
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="h-auto p-0 justify-start [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#ee7d11] text-xl tracking-[0] leading-[normal] hover:bg-transparent"
                >
                  Uitloggen
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col items-center pt-[18px] gap-[9px]">
        <div className="relative flex items-center justify-center">
          <Button 
            variant="ghost" 
            className="h-auto p-0 hover:bg-transparent absolute left-[-100px]"
            onClick={handlePreviousMonth}
          >
            <img
              className="w-[21px] h-[21px]"
              alt="Previous month"
              src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/ep-arrow-up-bold.svg"
            />
          </Button>

          <div className="flex flex-col items-center gap-2">
            <h2 className="[font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#003883] text-2xl tracking-[0] leading-[normal] min-w-[200px] text-center">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            {!canEditMonth && (
              <p className="text-sm text-gray-500 [font-family:'Source_Sans_Pro',Helvetica]">
                Deze maand is gesloten
              </p>
            )}
          </div>

          <Button 
            variant="ghost" 
            className="h-auto p-0 hover:bg-transparent absolute right-[-100px]"
            onClick={handleNextMonth}
          >
            <img
              className="w-[21px] h-[21px]"
              alt="Next month"
              src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/ep-arrow-up-bold-1.svg"
            />
          </Button>
        </div>

        <div className="flex flex-col gap-[10px] mt-[26px]">
          {weeks.map((week) => (
            <div key={week.id} className="flex gap-[10px]">
              {week.days.map((dayInfo, dayIndex) => (
                <div key={dayIndex} className="flex flex-col gap-[10px]">
                  <div className="w-[64px] h-[62px] bg-[#808cb7] rounded-sm flex items-center justify-center shrink-0">
                    <div className="[font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl text-center tracking-[0] leading-[21.6px]">
                      {dayInfo.day}
                      <br />
                      {dayInfo.date}
                    </div>
                  </div>

                  <div className="relative w-[64px] h-[62px] shrink-0">
                    <button
                      className={`absolute top-px left-0 w-[64px] h-[62px] ${selectedAvailability[`${week.id}-${dayIndex}`]?.bgColor || 'bg-[#52a40b]'} rounded-sm shrink-0 flex items-center ${canEditMonth ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                      onClick={() => canEditMonth && setOpenDropdown(openDropdown === `${week.id}-${dayIndex}` ? null : `${week.id}-${dayIndex}`)}
                      disabled={!canEditMonth}
                    >
                      <span className={`[font-family:'Source_Sans_Pro',Helvetica] font-semibold ${selectedAvailability[`${week.id}-${dayIndex}`]?.textColor || 'text-white'} text-2xl text-center tracking-[0] leading-[21.6px] whitespace-nowrap w-[46px]`}>
                        {selectedAvailability[`${week.id}-${dayIndex}`]?.label || 'A'}
                      </span>
                      <div className={`absolute top-0 left-[46px] w-[18px] h-[62px] ${canEditMonth ? 'bg-[#ee7d11]' : 'bg-gray-400'} rounded-[0px_2px_2px_0px]`} />
                      <img
                        className={`absolute top-[27px] left-[49px] w-3 h-2.5 transition-transform duration-200 ${openDropdown === `${week.id}-${dayIndex}` ? 'rotate-180' : ''}`}
                        alt="Dropdown"
                        src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/polygon-5.svg"
                      />
                    </button>
                    {openDropdown === `${week.id}-${dayIndex}` && canEditMonth && (
                      <div className="absolute top-[62px] left-0 z-10 bg-white shadow-md rounded-sm w-[64px] overflow-hidden">
                        {availabilityOptions.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            className={`w-full h-[62px] ${option.bgColor} ${option.textColor} [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-2xl text-center tracking-[0] leading-[21.6px] hover:opacity-90`}
                            onClick={() => handleAvailabilityChange(`${week.id}-${dayIndex}`, option)}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-[10px]">
                <div className="w-[310px] h-[62px] bg-[#808cb7] rounded-sm flex items-center justify-center shrink-0 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[21.6px]">
                  Hoevaak deze week indelen?
                </div>

                <div className="relative w-[310px] h-[62px] shrink-0">
                  <button
                    className={`absolute top-0 left-0 w-[310px] h-[62px] ${canEditMonth ? 'bg-[#ee7d11]' : 'bg-gray-400'} rounded-sm flex items-center justify-between px-4 ${canEditMonth ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'}`}
                    onClick={() => canEditMonth && setOpenMaxTimesDropdown(openMaxTimesDropdown === week.id ? null : week.id)}
                    disabled={!canEditMonth}
                  >
                    <span className="[font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[21.6px] whitespace-nowrap">
                      Maximaal {selectedMaxTimes[week.id] || 2} keer
                    </span>
                    <img
                      className={`w-[15px] h-[13px] transition-transform duration-200 ${openMaxTimesDropdown === week.id ? 'rotate-180' : ''}`}
                      alt="Dropdown"
                      src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/polygon-7.svg"
                    />
                  </button>
                  {openMaxTimesDropdown === week.id && canEditMonth && (
                    <div className="absolute top-[62px] left-0 z-10 bg-white shadow-md rounded-sm w-[310px] overflow-hidden">
                      {[1, 2, 3, 4, 5].map((times, index) => (
                        <button
                          key={times}
                          className={`w-full h-[62px] ${index % 2 === 0 ? 'bg-white' : 'bg-[#ffe8d3]'} text-[#003883] [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-2xl text-center tracking-[0] leading-[21.6px] hover:opacity-90`}
                          onClick={() => handleMaxTimesChange(week.id, times)}
                        >
                          Maximaal {times} keer
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-[9px]" style={{ width: `${weeks[0]?.days.length * 64 + (weeks[0]?.days.length - 1) * 10 + 10 + 310}px` }}>
          <Button className="w-[278px] h-[62px] bg-[#ee7d11] hover:bg-[#ee7d11]/90 rounded-sm [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl text-center tracking-[0] leading-[21.6px]">
            Opmerking meegeven
          </Button>

          <Button
            onClick={handleSubmitAvailability}
            disabled={!canEditMonth}
            className={`w-[310px] h-[62px] ${canEditMonth ? 'bg-[#52a40b] hover:bg-[#52a40b]/90' : 'bg-gray-400 cursor-not-allowed opacity-60'} rounded-sm [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl text-center tracking-[0] leading-[21.6px]`}
          >
            {canEditMonth ? 'Beschikbaarheid inleveren' : 'Deze maand is gesloten'}
          </Button>
        </div>
      </main>
    </div>
  );
};
