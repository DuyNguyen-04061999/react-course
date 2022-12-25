import styled from "styled-components";

export const ButtonStyled = styled.button`
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`;
