import type { ProductImageProps } from "../types/product.types";
import OptimizedImage from "./OptimizedImage";

function ProductMainImage({ src, alt }: ProductImageProps) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      className="h-full w-full object-cover"
    />
  );
}

export default ProductMainImage