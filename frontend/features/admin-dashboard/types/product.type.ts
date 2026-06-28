import type { Dispatch, FormEventHandler, SetStateAction } from "react";
import type {
  ProductFormInput,
  ProductFormValues,
} from "../pages/products/validation/product.validation";
import type { ProductRecord } from "~/features/products/types/product.types";

export type ProductImageType = "PRIMARY" | "HOVER" | "GALLERY";

export interface ProductImage {
  id: string;
  url: string;
  type: ProductImageType;
}

export type ProductSectionType =
  | "DESCRIPTION"
  | "BENEFITS"
  | "HOW_IT_WORKS"
  | "HOW_TO_USE"
  | "PRODUCT_SAFETY"
  | "SUSTAINABILITY"
  | "INGREDIENTS";

export interface ProductSection {
  id?: string;
  type: ProductSectionType;
  title?: string;
  content: string;
  order: number;
}

export interface ProductVariant {
  id?: string;
  sizeLabel: string;
  sku: string;
  price: number;
  compareAtPrice?: number | null;
  stock: number;
}

export type Product = ProductRecord;
export type CreateProductInput = ProductFormValues;

export const initialFormState: ProductFormInput = {
  name: "",
  slug: "",
  categoryId: "",
  texture: "",
  baseDescription: "",
  isActive: true,
  sizeLabel: "100ml",
  price: 0,
  compareAtPrice: null,
  stock: 0,
  variants: [],
  skinTypes: [],
  primaryImage: null,
  hoverImage: null,
  galleryImage1: null,
  galleryImage2: null,
  sectionBenefits: "",
  sectionHowItWorks: "",
  sectionHowToUse: "",
  sectionProductSafety: "",
  sectionSustainability: "",
  sectionIngredients: "",
};

export type ProductTableProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

export type ProductContainerProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
  error: unknown;
};

export type ProductFormFieldKey =
  | "name"
  | "slug"
  | "categoryId"
  | "baseDescription"
  | "isActive";

export type ProductFormField = {
  label: string;
  key: ProductFormFieldKey;
  placeholder?: string;
  type?: string;
  step?: string;
  required?: boolean;
};

export type ProductModalProps = {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type ProductSubmitModalProps = {
  isOpen: boolean;
  onClose: () => void;
  formState: ProductFormInput;
  setFormState: Dispatch<SetStateAction<ProductFormInput>>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
};
