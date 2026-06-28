import { FiSearch } from "react-icons/fi";
import ProductCard from "~/features/products/components/ProductCard";
import { useProducts } from "~/shared/hooks/useProducts";
import { useMemo, useState } from "react";
import Loading from "~/shared/components/loading/loading";

export default function Products() {
  const { data: products = [], isLoading, isError, error } = useProducts();
  const [searchValue, setSearchValue] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchValue.trim().toLowerCase();
    const activeProducts = products.filter((product) => product.isActive !== false);

    if (!query) return activeProducts;

    return activeProducts.filter((product) =>
      String(product.name ?? "")
        .toLowerCase()
        .includes(query)
    );
  }, [products, searchValue]);

  return (
    <main className="px-5 w-full">
      <section className="my-35">
        <div className="flex border-px border-gray-500 border-b pb-2">
          <FiSearch className="w-7 h-7" />
          <input
            type="text"
            placeholder="Search"
            className="mx-2 w-full"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
        </div>
        <span className="text-gray-500 mt-4 inline-block">
          ({filteredProducts.length} results)
        </span>
      </section>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 md:mx-2 gap-10 justify-items-center items-center">
          {isLoading && <Loading />}
          {isError && (
            <p className="col-span-full text-sm text-red-500">
              {error instanceof Error
                ? error.message
                : "Failed to load products"}
            </p>
          )}
          {!isLoading &&
            !isError &&
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                primaryImage={product.primaryImage}
                hoverImage={product.hoverImage}
                productSlug={product.slug}
                name={product.name}
                price={product.price}
                compareAtPrice={product.compareAtPrice}
                sizeLabel={product.sizeLabel ?? "100ml"}
              />
            ))}
        </div>
      </section>
    </main>
  );
}
