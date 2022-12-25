import { useState } from "react";

export const useToggle = () => {
  const [show, setShow] = useState(false);
  const onToggle = () => {
    setShow(!show);
  };

  return {
    show,
    onToggle,
    setShow,
  };
};
