import React from "react";

const Field = ({
  label,
  required,
  renderInput,
  error,
  type = "text",
  ...props
}) => {
  return (
    <label>
      <p>
        {label}
        {required && <span>*</span>}
      </p>
      <div className="relative flex-grow">
        {renderInput ? (
          renderInput({ ...props, error })
        ) : (
          <input
            type={type}
            {...props}
            className="w-full"
            style={{ border: error ? "1px solid red" : "" }}
          />
        )}
        {error && <ErrorText error={error} />}
      </div>
    </label>
  );
};

export const ErrorText = ({ error }) => {
  return (
    <span className="absolute left-0 top-full italic text-red-500">
      {error}
    </span>
  );
};

export default Field;
