import React from "react";
import { Button } from "../components/ui/button";

const weekDays = [
  { day: "Ma", date: "6" },
  { day: "Di", date: "7" },
  { day: "Wo", date: "8" },
  { day: "Do", date: "9" },
  { day: "Vr", date: "10" },
];

const weeks = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

export const BeschikbaarIndelen = (): JSX.Element => {
  return (
    <div className="bg-white overflow-hidden w-full min-w-[1920px] min-h-[950px] flex flex-col">
      <header className="w-full h-[90px] bg-white shadow-[0px_4px_4px_#00000040] flex items-center px-[71px] gap-[160px]">
        <div className="flex items-center gap-16">
          <div className="relative w-12 h-[71px]">
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

          <h1 className="[font-family:'Sumana',Helvetica] font-bold text-[#013b87] text-[40px] tracking-[0] leading-[normal]">
            Rooster
          </h1>
        </div>

        <nav className="flex items-center gap-11">
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
      </header>

      <main className="flex-1 flex flex-col items-center pt-[18px] gap-[9px]">
        <div className="flex items-center gap-[100px]">
          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <img
              className="w-[21px] h-[21px]"
              alt="Previous month"
              src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/ep-arrow-up-bold.svg"
            />
          </Button>

          <h2 className="[font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#003883] text-2xl tracking-[0] leading-[normal]">
            Januari 2025
          </h2>

          <Button variant="ghost" className="h-auto p-0 hover:bg-transparent">
            <img
              className="w-[21px] h-[21px]"
              alt="Next month"
              src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/ep-arrow-up-bold-1.svg"
            />
          </Button>
        </div>

        <div className="flex flex-col gap-0 mt-[26px]">
          {weeks.map((week) => (
            <div key={week.id} className="flex gap-0 mb-[72px] last:mb-0">
              {weekDays.map((dayInfo, dayIndex) => (
                <div key={dayIndex} className="flex flex-col gap-2.5">
                  <div className="w-16 h-[62px] bg-[#808cb7] rounded-sm flex items-center justify-center">
                    <div className="[font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl text-center tracking-[0] leading-[21.6px]">
                      {dayInfo.day}
                      <br />
                      {dayInfo.date}
                    </div>
                  </div>

                  <div className="relative w-16 h-[62px]">
                    <div className="absolute top-px left-0 w-[62px] h-[62px] bg-[#52a40b] rounded-sm" />
                    <div className="absolute top-[19px] left-[calc(50%_-_22px)] w-11 [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl text-center tracking-[0] leading-[21.6px] whitespace-nowrap">
                      A
                    </div>
                    <div className="absolute top-0 left-11 w-[18px] h-[62px] bg-[#ee7d11] rounded-[0px_2px_2px_0px]" />
                    <img
                      className="absolute top-[26px] left-[47px] w-3 h-2.5"
                      alt="Dropdown"
                      src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/polygon-5.svg"
                    />
                  </div>
                </div>
              ))}

              <div className="flex flex-col gap-2.5 ml-[72px]">
                <Button className="w-[310px] h-[62px] bg-[#808cb7] hover:bg-[#808cb7]/90 rounded-sm [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[21.6px]">
                  Hoevaak deze week indelen?
                </Button>

                <div className="relative w-[310px] h-[62px]">
                  <div className="absolute top-0 left-0 w-[310px] h-[62px] bg-[#ee7d11] rounded-sm" />
                  <div className="absolute top-[19px] left-[calc(50%_-_150px)] w-[180px] [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl tracking-[0] leading-[21.6px] whitespace-nowrap">
                    Maximaal 2 keer
                  </div>
                  <img
                    className="absolute top-[26px] left-[273px] w-[15px] h-[13px]"
                    alt="Dropdown"
                    src="https://c.animaapp.com/mhnzg7jrz7FVdC/img/polygon-7.svg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-[30px] mt-[9px]">
          <Button className="w-[278px] h-[62px] bg-[#ee7d11] hover:bg-[#ee7d11]/90 rounded-sm [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl text-center tracking-[0] leading-[21.6px]">
            Opmerking meegeven
          </Button>

          <Button className="w-[310px] h-[62px] bg-[#52a40b] hover:bg-[#52a40b]/90 rounded-sm [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-2xl text-center tracking-[0] leading-[21.6px]">
            Beschikbaarheid inleveren
          </Button>
        </div>
      </main>
    </div>
  );
};
