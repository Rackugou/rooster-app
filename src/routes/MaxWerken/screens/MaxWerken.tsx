import React from "react";
import { Card, CardContent } from "../components/ui/card";

const frequencyOptions = [
  { id: 1, label: "Maximaal 1 keer", bgColor: "bg-white" },
  { id: 2, label: "Maximaal 2 keer", bgColor: "bg-[#ffe8d3]" },
  { id: 3, label: "Maximaal 3 keer", bgColor: "bg-white" },
  { id: 4, label: "Maximaal 4 keer", bgColor: "bg-[#ffe8d3]" },
  { id: 5, label: "Maximaal 5 keer", bgColor: "bg-white" },
];

export const MaxWerken = (): JSX.Element => {
  const [selectedOption, setSelectedOption] = React.useState<number | null>(
    null,
  );

  return (
    <div className="overflow-x-hidden w-full min-w-[309.86px] min-h-[306.7px] flex">
      <Card className="w-[310px] h-auto shadow-[0px_4px_4px_#00000040] rounded-[2px] overflow-hidden">
        <CardContent className="p-0">
          {frequencyOptions.map((option, index) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`w-full h-[62px] ${option.bgColor} ${
                index === 0 ? "rounded-t-[2px]" : ""
              } ${
                index === frequencyOptions.length - 1 ? "rounded-b-[2px]" : ""
              } flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity ${
                selectedOption === option.id
                  ? "ring-2 ring-[#003883] ring-inset"
                  : ""
              }`}
            >
              <span className="[font-family:'Source_Sans_Pro',Helvetica] font-semibold text-[#003883] text-2xl text-center tracking-[0] leading-[21.6px] whitespace-nowrap">
                {option.label}
              </span>
            </button>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};
