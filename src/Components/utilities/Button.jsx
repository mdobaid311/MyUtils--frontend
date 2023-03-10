import React from "react";

const Button = ({ label, Icon, onClick }) => {
  return (
    <button
      className="p-2 flex items-center  bg-[#0064FE] text-white rounded-md"
      onClick={onClick}
    >
      {Icon && <Icon className="mr-2" />} {label}
    </button>
  );
};

export default Button;
