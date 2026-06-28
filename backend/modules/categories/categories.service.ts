import { findAllCategories } from "./categories.repository.js";
import type { CategoryItem } from "./categories.types.js";

export const getCategories = async (): Promise<CategoryItem[]> => {
  return findAllCategories();
};
