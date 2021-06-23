import styled from "styled-components";

type CardContainerProps = {
  selected: boolean;
};

export const CardContainer = styled.div<CardContainerProps>`
  box-sizing: border-box;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  background-color: ${({ selected }) => (selected ? "salmon" : "grey")};
  padding: 16px;
  border-radius: 8px;
  font-weight: bold;
  user-select: none;

  :hover {
    cursor: pointer;
  }
`;
