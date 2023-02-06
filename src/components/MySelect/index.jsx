import { useToggle } from "@/hooks/useToggle";
import React, { useState } from "react";
import { useEffect } from "react";

// const options = [
//   {
//     value: "",
//     label: "",
//   },
// ];

const MySelect = ({ options, placeholder, onChange }) => {
  const [label, setLabel] = useState(placeholder);
  const { show, setShow, onToggle } = useToggle();
  const onOpen = (e) => {
    e.stopPropagation();
    onToggle();
  };

  useEffect(() => {
    const onClose = () => {
      setShow(false);
    };

    window.addEventListener("click", onClose);
    //cleanup fn
    return () => {
      window.removeEventListener("click", onClose);
    };
  }, []);

  const _onChange = (index) => (e) => {
    e.preventDefault();
    onChange({ target: { value: options[index].value } });
    setLabel(options[index].label);
  };
  return (
    <div className="select">
      <div className="head" onClick={onOpen}>
        {label}
      </div>
      
      <div className="sub" style={{ display: show ? "block" : "none" }}>
        {options.map((option, id) => (
          <a href="#" key={option.value} onClick={_onChange(id)}>
            {option.label}
          </a>
        ))}
      </div>
    </div>
  );
};

export default MySelect;
