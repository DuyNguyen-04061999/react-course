import React from "react";

const MyCheckbox = ({ value, onChange, children, ...props }) => {
  const _onChange = (e) => {
    onChange({ target: { value: e.target.checked } });
  };
  return (
    <div className="checkcontainer">
      {children}
      <input
        type="checkbox"
        {...props}
        onChange={(e) => _onChange(e)}
        checked={value}
      />
      <span className="checkmark" />
    </div>
  );
};

export default MyCheckbox;
