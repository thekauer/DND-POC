import { Draggable } from "react-beautiful-dnd";
import { CardContainer } from "./RetroCard.styles";

export type RetroCardProps = {
  cardId: string;
  cardIndex: number;
  cardContent: string;
};

export const RetroCard = ({ cardId, cardIndex, cardContent }: RetroCardProps) => {
  return (
    <Draggable draggableId={cardId} index={cardIndex}>
      {({ innerRef, draggableProps, dragHandleProps }, { isDragging }) => (
        <CardContainer
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          selected={isDragging}
        >
          <div>{cardContent}</div>
        </CardContainer>
      )}
    </Draggable>
  );
};
