import { Droppable } from "react-beautiful-dnd";
import { RetroCard } from "../RetroCard";
import { Card } from "../../common/types";
import { GroupContainer } from "./RetroGroup.styles";

export type RetroGroupProps = {
  groupId: string;
  cards: Card[];
  grow: boolean;
};

export const RetroGroup = ({ groupId, cards, grow }: RetroGroupProps) => {
  return (
    <Droppable droppableId={groupId}>
      {({ innerRef, droppableProps, placeholder }, { isDraggingOver }) => (
        <GroupContainer
          ref={innerRef}
          {...droppableProps}
          overlapping={isDraggingOver}
          transparent={!cards.length}
          grow={grow}
        >
          {cards.map(({ cardId, cardContent }, index) => (
            <RetroCard key={cardId} cardId={cardId} cardContent={cardContent} cardIndex={index} />
          ))}
          {placeholder}
        </GroupContainer>
      )}
    </Droppable>
  );
};
