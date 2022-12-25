import React from "react";
import { ButtonStyled } from "./style";
import { LoadingOutlined } from "@ant-design/icons";

const Button = ({ loading = false, children, className = "" }) => {
  return (
    <ButtonStyled
      disabled={loading}
      className={`btn main rect outline-none flex items-center gap-x-5 ${className}`}
    >
      {loading && <LoadingOutlined style={{ fontSize: 24 }} />}
      {children}
    </ButtonStyled>
  );
};

export default Button;
