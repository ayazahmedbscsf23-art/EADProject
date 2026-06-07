import React from "react";

export default function FormInput({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  as = "input"
}) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}

      {as === "textarea" ? (
        <textarea
          className="input"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          className="input"
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}