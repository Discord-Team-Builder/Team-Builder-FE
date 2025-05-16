import React from "react";

const stringToColor = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = "#" + ((hash >> 24) & 0xFF).toString(16).padStart(2, '0') +
                ((hash >> 16) & 0xFF).toString(16).padStart(2, '0') +
                ((hash >> 8) & 0xFF).toString(16).padStart(2, '0');
  return color.slice(0, 7);
};

const sizeMap = {
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-xl"
};

const Avatar = ({ text = "", size = "md" }) => {
  const bgColor = stringToColor(text);

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold uppercase ${sizeMap[size]}`}
      style={{ backgroundColor: bgColor }}
    >
      {text}
    </div>
  );
};

export default Avatar;
