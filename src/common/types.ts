export type Card = {
  cardId: string;
  cardContent: string;
};

export type Group = {
  groupId: string;
  cards: Card[];
};

export type SimpleCategory = {
  categoryId: string;
  cards: Card[];
};

export type GroupingCategory = {
  categoryId: string;
  groups: GroupingCategoryGroupValues;
};

export type GroupingCategoryGroupValues = {
  [key: string]: Group;
};
