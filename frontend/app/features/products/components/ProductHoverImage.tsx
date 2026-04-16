import type { ProductImageProps } from "../types/product.types";
import OptimizedImage from "./OptimizedImage";

function ProductHoverImage({ src, alt }: ProductImageProps) {
    return (
      <div className="absolute inset-0 hidden opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100 md:block">
        <OptimizedImage
          src={src}
          alt={alt}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  export default ProductHoverImage