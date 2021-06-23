import styled from "styled-components";

type GroupContainerProps = {
  transparent: boolean;
  overlapping: boolean;
  grow: boolean;
};

export const GroupContainer = styled.div<GroupContainerProps>`
  height: ${({ grow }) => (grow ? "100%" : "auto")};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ transparent, overlapping }) => {
    return overlapping ? "lightblue" : transparent ? "transparent" : "lightgray";
  }};
  margin: ${({ transparent, overlapping }) => (transparent && overlapping ? "8px 0" : "0")};
  padding: ${({ transparent }) => (transparent ? "8px 4px" : "4px")};
  border-radius: 8px;
  gap: 8px;
`;
