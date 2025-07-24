import React from "react";

const Card = ({ title, subtitle, icon, color }) => {
  return (
    <div
      className={`
        rounded-xl shadow-md 
        flex flex-col justify-between
        w-44 h-32
        p-3
        ${color}
        transition duration-200
        hover:shadow-lg
      `}
      style={{
        minWidth: "140px", // Ensures good display on all screens
        minHeight: "110px",
      }}
    >
      <div className="mb-1 flex-1 flex flex-col gap-y-1 justify-start">
        <h3 className="text-2xl font-extrabold leading-none">{title}</h3>
        <span className="text-xs text-gray-700 font-medium">{subtitle}</span>
      </div>
      <div className="flex items-end justify-end">
        <img src={icon} alt="icon" className="h-8 w-8" />
      </div>
    </div>
  );
};

export default Card;
