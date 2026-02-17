import React from "react";

const ToggleSwitch = ({ options, activeOption, onChange, className = "" }) => {
  return (
    <div className={`toggle-switch ${className}`}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
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
