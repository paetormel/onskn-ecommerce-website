import {
  initialFormState,
  type ProductModalProps,
} from "../../../types/product.type";
import { useCreateProduct } from "../../../hooks/useCreateProduct";
import { useCategories } from "../../../hooks/useCategories";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "~/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  productSchema,
  type ProductFormValues,
} from "../validation/product.validation";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { Textarea } from "~/components/ui/textarea";

type FileFieldName =
  | "primaryImage"
  | "hoverImage"
  | "galleryImage1"
  | "galleryImage2"
  | "galleryImage3";

function FileField({
  name,
  label,
  control,
  optional = false,
}: {
  name: FileFieldName;
  label: string;
  control: ReturnType<typeof useForm<ProductFormValues>>["control"];
  optional?: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`product-${name}`}>
            {label}
            {optional && " (optional)"}
          </FieldLabel>
          <Input
            id={`product-${name}`}
            type="file"
            accept="image/*"
            aria-invalid={fieldState.invalid}
            onChange={(e) => field.onChange(e.target.files?.[0] ?? null)}
            onBlur={field.onBlur}
            ref={field.ref}
            name={field.name}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

const AddProductModal = ({ isOpen, setIsModalOpen }: ProductModalProps) => {
  const createProduct = useCreateProduct();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const isPending = createProduct.isPending;
  const isError = createProduct.isError;
  const errorMessage = createProduct.error?.message ?? "";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialFormState,
  });

  const onClose = () => {
    setIsModalOpen(false);
    form.reset(initialFormState);
  };

  const onSubmit = form.handleSubmit((data) => {
    createProduct.mutate(data, { onSuccess: onClose });
  });

  const hasRequiredImages =
    !!form.watch("primaryImage") &&
    !!form.watch("galleryImage1") &&
    !!form.watch("galleryImage2") &&
    !!form.watch("galleryImage3");

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
        else setIsModalOpen(true);
      }}
    >
      <DialogContent className="max-h-[90vh] w-[95vw] overflow-y-auto sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit}>
          <FieldGroup className="gap-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Controller
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-name">Name</FieldLabel>
                    <Input
                      {...field}
                      id="product-name"
                      placeholder="Product name"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="slug"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-slug">Slug</FieldLabel>
                    <Input
                      {...field}
                      id="product-slug"
                      placeholder="product-slug"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="categoryId"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-category-id">Category</FieldLabel>
                    <select
                      id="product-category-id"
                      className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      aria-invalid={fieldState.invalid}
                      disabled={categoriesLoading}
                    >
                      <option value="">
                        {categoriesLoading ? "Loading categories..." : "Select a category"}
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="sizeLabel"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-size-label">Size Label</FieldLabel>
                    <Input
                      {...field}
                      id="product-size-label"
                      placeholder="100ml"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="price"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-price">Price</FieldLabel>
                    <Input
                      {...field}
                      id="product-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="29.99"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="compareAtPrice"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-compare-price">
                      Compare At Price (optional)
                    </FieldLabel>
                    <Input
                      id="product-compare-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="39.99"
                      aria-invalid={fieldState.invalid}
                      value={field.value ?? ""}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === "" ? null : Number(e.target.value)
                        )
                      }
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="stock"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-stock">Stock</FieldLabel>
                    <Input
                      {...field}
                      id="product-stock"
                      type="number"
                      min="0"
                      step="1"
                      placeholder="10"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="texture"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-texture">Texture</FieldLabel>
                    <Input
                      {...field}
                      id="product-texture"
                      placeholder="e.g. Gel, Cream, Serum"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="isActive"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-is-active">Status</FieldLabel>
                    <select
                      id="product-is-active"
                      className="flex h-8 w-full rounded-lg border border-input bg-transparent px-2.5 py-1 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                      value={field.value ? "true" : "false"}
                      onChange={(e) =>
                        field.onChange(e.target.value === "true")
                      }
                      aria-invalid={fieldState.invalid}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="skinTypes"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="product-skin-types">
                      Skin Types
                    </FieldLabel>
                    <Input
                      id="product-skin-types"
                      placeholder="Oily, Dry, Combination"
                      aria-invalid={fieldState.invalid}
                      value={(field.value ?? []).join(", ")}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value
                            .split(",")
                            .map((item) => item.trim())
                            .filter(Boolean)
                        )
                      }
                    />
                    <FieldDescription>
                      Comma-separated list of skin types.
                    </FieldDescription>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="baseDescription"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-base-description">
                    Base Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="product-base-description"
                    placeholder="Short product description"
                    aria-invalid={fieldState.invalid}
                    className="min-h-28"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <FieldSet>
              <FieldLegend>Product Images</FieldLegend>
              <FieldDescription>
                Upload primary, optional hover, and 3 gallery images. Backend
                accepts up to 5 images total.
              </FieldDescription>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <FileField
                  name="primaryImage"
                  label="Primary Image"
                  control={form.control}
                />
                <FileField
                  name="hoverImage"
                  label="Hover Image"
                  control={form.control}
                  optional
                />
              </div>

              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <FileField
                  name="galleryImage1"
                  label="Gallery Image 1"
                  control={form.control}
                />
                <FileField
                  name="galleryImage2"
                  label="Gallery Image 2"
                  control={form.control}
                />
                <FileField
                  name="galleryImage3"
                  label="Gallery Image 3"
                  control={form.control}
                />
              </div>
            </FieldSet>

            {isError && (
              <p className="text-sm text-destructive">{errorMessage}</p>
            )}

            <div className="flex justify-end gap-3">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isPending || !hasRequiredImages}>
                {isPending ? "Saving..." : "Create Product"}
              </Button>
            </div>
          </FieldGroup>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
