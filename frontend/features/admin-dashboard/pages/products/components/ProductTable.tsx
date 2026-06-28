import React from "react";
import EmptyState from "~/shared/components/empty";
import ErrorState from "~/shared/components/error";
import Loading from "~/shared/components/loading/loading";
import type { ProductTableProps } from "../../../types/product.type";
import ProductRow from "./ProductRow";

const ProductTable = ({
  products,
  isLoading,
  isError,
  errorMessage,
}: ProductTableProps) => {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-100 text-gray-500 text-sm uppercase tracking-wider">
            <th className="px-6 py-4">Image</th>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Size</th>
            <th className="px-6 py-4">Price</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {isLoading && (
            <tr>
              <td colSpan={5} className="px-6 py-6">
                <div className="flex justify-center">
                  <Loading />
                </div>
              </td>
            </tr>
          )}

          {isError && !isLoading && (
            <tr>
              <td colSpan={5} className="px-6 py-6">
                <ErrorState message={errorMessage} />
              </td>
            </tr>
          )}

          {!isLoading && !isError && products.length === 0 && (
            <tr>
              <td colSpan={5} className="px-6 py-6">
                <EmptyState
                  title="No products found"
                  message="Add a product or change your search to see results."
                />
              </td>
            </tr>
          )}

          {!isLoading &&
            !isError &&
            (products ?? []).map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default React.memo(ProductTable);
