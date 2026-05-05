import { FiSearch } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import ProductCard from "~/features/products/components/ProductCard";
import { useCreateProduct, useProducts } from "~/features/products/hooks/useProducts";
import { useMemo, useState } from "react";
import Loading from "~/shared/components/loading/loading";

type ProductFormState = {
  name: string;
  sku: string;
  slug: string;
  description: string;
  longDescription: string;
  basePrice: string;
  compareAtPrice: string;
  texture: string;
  skinTypes: string;
  sizeLabel: string;
  primaryImageFile: File | null;
  hoverImageFile: File | null;
};

const initialFormState: ProductFormState = {
  name: "",
  sku: "",
  slug: "",
  description: "",
  longDescription: "",
  basePrice: "",
  compareAtPrice: "",
  texture: "",
  skinTypes: "",
  sizeLabel: "100ml",
  primaryImageFile: null,
  hoverImageFile: null,
};

export default function Products() {
  const { data: products = [], isLoading, isError, error } = useProducts();
  const createProduct = useCreateProduct();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [formState, setFormState] = useState<ProductFormState>(initialFormState);

  const filteredProducts = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    if (!query) return products;
    return products.filter(
      (product) =>
        String(product.name ?? "").toLowerCase().includes(query) ||
        String(product.sku ?? "").toLowerCase().includes(query) ||
        String(product.slug ?? "").toLowerCase().includes(query),
    );
  }, [products, searchValue]);

  const closeModal = () => {
    setIsModalOpen(false);
    setFormState(initialFormState);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.primaryImageFile) return;

    createProduct.mutate(
      {
        name: formState.name,
        sku: formState.sku,
        slug: formState.slug,
        description: formState.description,
        longDescription: formState.longDescription,
        basePrice: Number(formState.basePrice),
        compareAtPrice: formState.compareAtPrice ? Number(formState.compareAtPrice) : null,
        texture: formState.texture,
        skinTypes: formState.skinTypes,
        sizeLabel: formState.sizeLabel,
        primaryImageFile: formState.primaryImageFile,
        hoverImageFile: formState.hoverImageFile,
      },
      {
        onSuccess: closeModal,
      },
    );
  };

  return (
    <main className="px-5 w-full">
      <section className="my-35">
        <div className="mb-5 flex items-center justify-end">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="rounded-xl bg-primary px-4 py-2 font-jost text-sm font-medium text-white transition hover:opacity-90"
          >
            Add Product
          </button>
        </div>
        <div className=" flex border-px border-gray-500 border-b pb-2">
          <FiSearch className="w-7 h-7  " />
          <input
            type="text"
            placeholder="Search"
            className="mx-2 w-full"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <button type="button" onClick={() => setSearchValue("")}>
            <IoCloseSharp className="w-7 h-7" />
          </button>
        </div>
        <span className="text-gray-500 mt-4 inline-block">({filteredProducts.length} results)</span>
      </section>
      <section className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 md:mx-2 gap-10 justify-items-center items-center">
          {isLoading && <Loading />}
          {isError && (
            <p className="col-span-full text-sm text-red-500">
              {error instanceof Error ? error.message : "Failed to load products"}
            </p>
          )}
          {!isLoading &&
            !isError &&
            filteredProducts.map((product) => (
            <ProductCard
              key={product.product_id}
              primaryImage={product.primary_image_url ?? product.hover_image_url ?? ""}
              hoverImage={product.hover_image_url ?? product.primary_image_url ?? ""}
              productId={String(product.product_id)}
              name={product.name}
              price={Number(product.base_price)}
              sizeLabel={product.texture ?? "100ml"}
            />
            ))}
        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Add Product</h2>
              <button type="button" onClick={closeModal} className="text-slate-500 hover:text-black">
                <IoCloseSharp className="h-6 w-6" />
              </button>
            </div>

            <form className="grid grid-cols-1 gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
              <input className="rounded-xl border p-3" placeholder="Name" required value={formState.name} onChange={(event) => setFormState((prev) => ({ ...prev, name: event.target.value }))} />
              <input className="rounded-xl border p-3" placeholder="SKU" required value={formState.sku} onChange={(event) => setFormState((prev) => ({ ...prev, sku: event.target.value }))} />
              <input className="rounded-xl border p-3" placeholder="Slug" required value={formState.slug} onChange={(event) => setFormState((prev) => ({ ...prev, slug: event.target.value }))} />
              <input className="rounded-xl border p-3" placeholder="Base Price" type="number" step="0.01" required value={formState.basePrice} onChange={(event) => setFormState((prev) => ({ ...prev, basePrice: event.target.value }))} />
              <input className="rounded-xl border p-3" placeholder="Compare At Price" type="number" step="0.01" value={formState.compareAtPrice} onChange={(event) => setFormState((prev) => ({ ...prev, compareAtPrice: event.target.value }))} />
              <input className="rounded-xl border p-3" placeholder="Size Label (e.g. 120ml)" value={formState.sizeLabel} onChange={(event) => setFormState((prev) => ({ ...prev, sizeLabel: event.target.value }))} />
              <input className="rounded-xl border p-3" placeholder="Texture" value={formState.texture} onChange={(event) => setFormState((prev) => ({ ...prev, texture: event.target.value }))} />
              <input className="rounded-xl border p-3" placeholder="Skin Types" value={formState.skinTypes} onChange={(event) => setFormState((prev) => ({ ...prev, skinTypes: event.target.value }))} />
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm text-slate-600">Primary Image</label>
                <input
                  className="w-full rounded-xl border p-3"
                  type="file"
                  accept="image/*"
                  required
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      primaryImageFile: event.target.files?.[0] ?? null,
                    }))
                  }
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-1 block text-sm text-slate-600">Hover Image (optional)</label>
                <input
                  className="w-full rounded-xl border p-3"
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    setFormState((prev) => ({
                      ...prev,
                      hoverImageFile: event.target.files?.[0] ?? null,
                    }))
                  }
                />
              </div>
              <textarea className="min-h-24 rounded-xl border p-3 md:col-span-2" placeholder="Description" required value={formState.description} onChange={(event) => setFormState((prev) => ({ ...prev, description: event.target.value }))} />
              <textarea className="min-h-28 rounded-xl border p-3 md:col-span-2" placeholder="Long Description" required value={formState.longDescription} onChange={(event) => setFormState((prev) => ({ ...prev, longDescription: event.target.value }))} />

              {createProduct.isError && (
                <p className="md:col-span-2 text-sm text-red-500">
                  {createProduct.error instanceof Error ? createProduct.error.message : "Failed to create product"}
                </p>
              )}

              <div className="md:col-span-2 flex justify-end gap-3">
                <button type="button" onClick={closeModal} className="rounded-xl border px-4 py-2 text-sm">
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createProduct.isPending || !formState.primaryImageFile}
                  className="rounded-xl bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                >
                  {createProduct.isPending ? "Saving..." : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
