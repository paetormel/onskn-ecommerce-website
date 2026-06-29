export type CategoryItem = {
  id: string;
  name: string;
};

export type CategoriesResponse = {
  success: boolean;
  data: CategoryItem[];
};
