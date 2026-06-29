import type { Dispatch, SetStateAction } from "react";
import type {
  ProductFormInput,
  ProductFormValues,
} from "../pages/products/validation/product.validation";
import type {
  ProductImage,
  ProductImageDraft,
  ProductRecord,
  ProductSection,
  ProductVariant,
} from "~/features/products/types/product.types";
import type {
  DataContainerProps,
  DataTableProps,
  FormFieldConfig,
  ModalFormProps,
} from "~/shared/types/ui.types";
import type { RenameKey } from "~/shared/types/utility.types";

export type { ProductImage, ProductImageDraft, ProductSection, ProductVariant };
export type { ProductImageType, ProductSectionType } from "~/features/products/types/product.types";

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

export type ProductTableProps = RenameKey<
  DataTableProps<Product>,
  "data",
  "products"
>;

export type ProductContainerProps = RenameKey<
  DataContainerProps<Product>,
  "data",
  "products"
>;

export type ProductFormField = FormFieldConfig<ProductFormInput>;
export type ProductFormFieldKey = keyof ProductFormInput;

export type ProductModalProps = {
  isOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export type ProductSubmitModalProps = ModalFormProps<ProductFormInput>;
