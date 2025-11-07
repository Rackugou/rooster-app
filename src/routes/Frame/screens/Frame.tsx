import React from "react";

const statusItems = [
  {
    label: "A",
    bgColor: "bg-[#52a40b]",
    rounded: "rounded-t-[2px]",
    topPosition: "top-0",
  },
  {
    label: "X",
    bgColor: "bg-[#c50e0e]",
    rounded: "",
    topPosition: "top-5",
  },
  {
    label: "MA",
    bgColor: "bg-[#faa82d]",
    rounded: "",
    topPosition: "top-[39px]",
  },
  {
    label: "M",
    bgColor: "bg-[#f8d10f]",
    rounded: "rounded-b-[2px]",
    topPosition: "top-[58px]",
  },
];

export const Frame = (): JSX.Element => {
  return (
    <div className="overflow-x-hidden w-full min-w-[31px] min-h-[78px] relative">
      {statusItems.map((item, index) => (
        <div
          key={index}
          className={`${item.topPosition} absolute left-0 w-[33px] h-5`}
        >
          <div
            className={`${item.bgColor} ${item.rounded} absolute top-0 left-0 w-[31px] h-5`}
          />
          <div className="absolute top-0.5 left-0 w-[31px] [font-family:'Source_Sans_Pro',Helvetica] font-semibold text-white text-xs text-center tracking-[0] leading-[normal] whitespace-nowrap">
            {item.label}
          </div>
        </div>
      ))}
      <div className="absolute top-0 left-0 w-[31px] h-[78px] rounded-sm border border-solid border-[#4d526f]" />
    </div>
  );
};
