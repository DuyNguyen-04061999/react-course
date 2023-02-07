import { useToggle } from "@/hooks/useToggle";
import React, { useRef, useState } from "react";
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
  const [heightOption, setHeightOption] = useState(0);
  const onOpen = (e) => {
    e.stopPropagation();
    onToggle();
  };
  const optionRef = useRef();
  useEffect(() => {
    setHeightOption(optionRef.current?.scrollHeight);
  }, [show]);
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

      <div
        className="sub__wrap absolute top-full left-0 z-10 w-full overflow-hidden shadow-sm transition-all"
        style={{ height: show ? `${heightOption}px` : 0 }}
      >
        <div
          className="sub"
          ref={optionRef}
          style={{ display: "block", top: 0 }}
        >
          {options.map((option, id) => (
            <a href="#" key={option.value} onClick={_onChange(id)}>
              {option.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySelect;
