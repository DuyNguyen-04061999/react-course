import styled from "styled-components";

export const InputWrap = styled.div`
  position: relative;

  &.error {
    input {
      border-color: 1px solid red;
    }
  }
`;

export const InputStyled = styled.input`
  margin-bottom: 0 !important;
  transition: all 0.2s linear;
`;

export const EyeStyled = styled.div`
  position: absolute;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  cursor: pointer;

  svg {
    width: 18px;
    height: 18px;
  }
`;
