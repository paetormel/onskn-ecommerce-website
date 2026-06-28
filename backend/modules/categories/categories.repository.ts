import prisma from "../../src/lib/prisma.js";
import type { CategoryItem } from "./categories.types.js";

export const findAllCategories = async (): Promise<CategoryItem[]> => {
  return prisma.category.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });
};
