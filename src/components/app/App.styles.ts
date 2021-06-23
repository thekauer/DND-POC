import styled from "styled-components";

export const Container = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: ${({ cols }) => "repeat(" + cols + ", 260px)"};
  column-gap: 2rem;
`;

export const CategoryContainer = styled.div`
  min-height: 500px;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 16px;
  border-radius: 8px;
`;
