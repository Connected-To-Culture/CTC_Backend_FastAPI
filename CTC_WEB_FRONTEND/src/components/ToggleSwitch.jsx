import React from "react";
import "../styles/ToggleSwitch.css";

const ToggleSwitch = ({ options, activeOption, onChange }) => {
  return (
    <div className="toggle-switch">
      {options.map((option) => (
        <button
          key={option.value}
          className={`toggle-option ${activeOption === option.value ? "active" : ""}`}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default ToggleSwitch;
