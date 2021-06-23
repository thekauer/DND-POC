import produce, { current as immerCurrent } from "immer";
import { useReducer, useCallback } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { RetroGroup } from "../RetroGroup";
import {
  SimpleCategory,
  Group,
  GroupingCategory,
  GroupingCategoryGroupValues,
} from "../../common/types";
import { SIMPLE, GROUPING } from "../../common/data";
import { Container, CategoryContainer } from "./App.styles";

const GROUPING_MODE = true;

const generateGroupId = () => Math.random().toString(36).slice(2);

const dragReducer = produce((state, { type, src, srcIndex, dest, destIndex }) => {
  // Handling simple drag and drop between categories.
  if (type === "SIMPLE") {
    // Removing the dragged card from the source category.
    const [removed] = state.items[src].cards.splice(srcIndex, 1);

    // Adding the previously removed card to the destination category.
    state.items[dest].cards.splice(destIndex, 0, removed);
  }

  // Handling drag and drop with grouping functionality between categories.
  if (type === "GROUPING") {
    // Parsing source and destination category ids from inputs.
    const [srcCategory] = src.split("__");
    const [destCategory] = dest.split("__");

    // Removing the dragged card from the source category.
    const [removed] = state.items[srcCategory].groups[src].cards.splice(srcIndex, 1);

    // Checking if the destination group is a placeholder at the moment.
    const isDestinationPlaceholder = !state.items[destCategory].groups[dest].cards.length;

    // Adding the previously removed card to the destination category.
    state.items[destCategory].groups[dest].cards.splice(destIndex, 0, removed);

    // Checking if the source group became a placeholder.
    if (!state.items[srcCategory].groups[src].cards.length) {
      // Regenerating groups in the source category.
      state.items[srcCategory].groups = Object.values(state.items[srcCategory].groups).reduce(
        (generated, current, index, arr) => {
          const currentGroup = current as Group;

          // Checking if the current group is a visible one.
          if (currentGroup.cards.length) {
            const placeholderGroupBeforeId = `${srcCategory}__group-${generateGroupId()}`;
            const placeholderGroupAfterId = `${srcCategory}__group-${generateGroupId()}`;

            const currentGroupId = `${srcCategory}__group-${generateGroupId()}`;

            return {
              ...(generated as GroupingCategoryGroupValues),
              // Injecting placeholder.
              [placeholderGroupBeforeId]: {
                groupId: placeholderGroupBeforeId,
                cards: [],
              },
              [currentGroupId]: {
                groupId: currentGroupId,
                cards: currentGroup.cards,
              },
              // Injecting placeholder if the group had cards.
              ...(index === arr.length - 1
                ? {
                    [placeholderGroupAfterId]: {
                      groupId: placeholderGroupAfterId,
                      cards: [],
                    },
                  }
                : {}),
            };
          }

          // Simply adding the last group because it's definitely a placeholder.
          if (index === arr.length - 1) {
            const placeholderGroupId = `${srcCategory}__group-${generateGroupId()}`;

            return {
              ...(generated as GroupingCategoryGroupValues),
              // Injecting placeholder.
              [placeholderGroupId]: {
                groupId: placeholderGroupId,
                cards: [],
              },
            };
          }

          // Otherwise nothing to do...
          return generated as GroupingCategoryGroupValues;
        },
        {} as GroupingCategoryGroupValues
      );
    }

    // Checking if the destination group was previously a placeholder.
    if (isDestinationPlaceholder) {
      // Regenerating groups in the destination category.
      state.items[destCategory].groups = Object.values(state.items[destCategory].groups).reduce(
        (generated, current, index, arr) => {
          const currentGroup = current as Group;

          // Checking if the current group is a visible one.
          if (currentGroup.cards.length) {
            const placeholderGroupBeforeId = `${destCategory}__group-${generateGroupId()}`;
            const placeholderGroupAfterId = `${destCategory}__group-${generateGroupId()}`;

            const currentGroupId = `${destCategory}__group-${generateGroupId()}`;

            return {
              ...(generated as GroupingCategoryGroupValues),
              // Injecting placeholder.
              [placeholderGroupBeforeId]: {
                groupId: placeholderGroupBeforeId,
                cards: [],
              },
              [currentGroupId]: {
                groupId: currentGroupId,
                cards: currentGroup.cards,
              },
              // Injecting placeholder if the group had cards.
              ...(index === arr.length - 1
                ? {
                    [placeholderGroupAfterId]: {
                      groupId: placeholderGroupAfterId,
                      cards: [],
                    },
                  }
                : {}),
            };
          }

          // Simply adding the last group because it's definitely a placeholder.
          if (index === arr.length - 1) {
            const placeholderGroupId = `${srcCategory}__group-${generateGroupId()}`;

            return {
              ...(generated as GroupingCategoryGroupValues),
              // Injecting placeholder.
              [placeholderGroupId]: {
                groupId: placeholderGroupId,
                cards: [],
              },
            };
          }

          // Otherwise nothing to do...
          return generated as GroupingCategoryGroupValues;
        },
        {} as GroupingCategoryGroupValues
      );
    }
  }
});

export const App = () => {
  const [state, dispatch] = useReducer(dragReducer, { items: GROUPING_MODE ? GROUPING : SIMPLE });

  const handleDragEnd = useCallback(({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    dispatch({
      type: GROUPING_MODE ? "GROUPING" : "SIMPLE",
      src: source.droppableId,
      srcIndex: source.index,
      dest: destination.droppableId,
      destIndex: destination.index,
    });
  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container cols={3}>
        {!GROUPING_MODE &&
          Object.values(state.items).map((category) => (
            <CategoryContainer key={(category as SimpleCategory).categoryId}>
              <RetroGroup
                groupId={(category as SimpleCategory).categoryId}
                cards={(category as SimpleCategory).cards}
                grow
              />
            </CategoryContainer>
          ))}
        {GROUPING_MODE &&
          Object.values(state.items).map((category) => (
            <CategoryContainer key={(category as GroupingCategory).categoryId}>
              {Object.values((category as GroupingCategory).groups).map((group, index, arr) => (
                <RetroGroup
                  key={group.groupId}
                  groupId={group.groupId}
                  cards={group.cards}
                  grow={index === arr.length - 1}
                />
              ))}
            </CategoryContainer>
          ))}
      </Container>
    </DragDropContext>
  );
};
