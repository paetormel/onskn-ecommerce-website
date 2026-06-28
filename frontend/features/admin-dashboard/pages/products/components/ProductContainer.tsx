import { FiSearch } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import ProductTable from "./ProductTable";
import type { ProductContainerProps } from "../../../types/product.type";
import React, { useEffect, useMemo, useState } from "react";

const ProductContainer = ({
  isLoading,
  products,
  isError,
  error,
}: ProductContainerProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchValue);

  const clearSearch = () => setSearchValue("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchValue]);
  const errorMessage =
    error instanceof Error ? error.message : "Failed to load products";

  const filteredProducts = useMemo(() => {
    const query = debouncedSearch.trim().toLowerCase();
    if (!query) return products;

    return products.filter(
      (product) =>
        String(product.name ?? "")
          .toLowerCase()
          .includes(query) ||
        String(product.slug ?? "")
          .toLowerCase()
          .includes(query) ||
        String(product.categoryId ?? "")
          .toLowerCase()
          .includes(query) ||
        String(product.baseDescription ?? "")
          .toLowerCase()
          .includes(query)
    );
  }, [products, debouncedSearch]);
  return (
    <div className="rounded-lg bg-white p-8 shadow">
      {/* SEARCH + FILTER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
        {/* SEARCH */}
        <div className="flex items-center border rounded-full border-gray-400 px-4 py-2">
          <FiSearch className="h-5 w-5" />

          <input
            type="text"
            placeholder="Search by name, slug, category ID, or description"
            className="mx-2 w-70 bg-transparent outline-none"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />

          <button type="button" onClick={clearSearch}>
            <IoCloseSharp className="h-5 w-5" />
          </button>
        </div>

        {/* FILTER */}
        <div className="flex items-center justify-center gap-3">
          <select className="rounded-lg border border-gray-400 px-3 py-2 text-sm bg-white">
            <option>Status</option>
            <option>unpaid</option>
            <option>return</option>
            <option>paid</option>
          </select>

          <button className="text-sm font-medium">Filter</button>
        </div>
      </div>

      {/* TABLE */}
      <ProductTable
        products={filteredProducts}
        isLoading={isLoading}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
};

export default React.memo(ProductContainer);
