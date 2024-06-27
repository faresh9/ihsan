import React from "react";

function InputText({ labelTitle, labelStyle, type, containerStyle, value, placeholder, updateFormValue, updateType }) {

  const handleChange = (e) => {
    updateFormValue({ updateType, value: e.target.value });
  };

  return (
    <div className={`form-control w-full ${containerStyle}`}>
      <label className="label">
        <span className={"label-text text-base-content " + labelStyle}>{labelTitle}</span>
      </label>
      <input
        type={type || "text"}
        value={value}
        placeholder={placeholder || ""}
        onChange={handleChange}
        className="input input-bordered w-full"
      />
    </div>
  );
}

export default InputText;
