import React from "react";
import type { Product } from "../../../types/product.type";

const ProductRow = ({ product }: { product: Product }) => {
  const primaryImage = product.images.find((image) => image.isPrimary)?.url ?? product.images[0]?.url ?? "";

  return (
    <tr
      key={String(product.id)}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={product.name ?? "Product image"}
            className="h-12 w-12 rounded-md object-cover border border-gray-200"
          />
        ) : (
          <div className="h-12 w-12 rounded-md border border-dashed border-gray-300 bg-gray-100" />
        )}
      </td>
      <td className="px-6 py-4 font-semibold">{product.name}</td>
      <td className="px-6 py-4">{product.slug}</td>
      <td className="px-6 py-4">{product.categoryId || "-"}</td>
      <td className="px-6 py-4 max-w-xs truncate">{product.baseDescription}</td>
      <td className="px-6 py-4">
        {product.isActive ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Active
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Inactive
          </span>
        )}
      </td>
      <td className="px-6 py-4">{product.createdAt ? new Date(product.createdAt).toLocaleDateString() : "-"}</td>
    </tr>
  );
};

export default ProductRow;
