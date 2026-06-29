import { memo } from "react";
import ProductMainImage from "./ProductMainImage";
import ProductHoverImage from "./ProductHoverImage";
import ProductDetails from "./ProductDetails";
import SelectButton from "./SelectButton";
import type { ProductCardProps } from "../types/product.types";
import { useNavigate } from "react-router-dom";
import type { KeyboardEvent } from "react";

const SELECT_LABEL = "Select";

function ProductCard({
  primaryImage,
  hoverImage,
  productSlug,
  name,
  price,
  compareAtPrice,
  sizeLabel,
}: ProductCardProps) {
  const navigate = useNavigate();
  const isClickable = Boolean(productSlug);


  
  const handleCardClick = () => {
    if (!productSlug) return;
    navigate(`/products/${productSlug}`);
  };

  const handleCardKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!isClickable) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCardClick();
    }
  };

  return (
    <div
      className={`group w-full ${isClickable ? "cursor-pointer" : ""}`}
      onClick={isClickable ? handleCardClick : undefined}
      onKeyDown={handleCardKeyDown}
      role={isClickable ? "link" : undefined}
      tabIndex={isClickable ? 0 : undefined}
    >
      <div className="relative h-145 w-full overflow-hidden bg-white md:min-w-100">
        <ProductMainImage src={primaryImage} alt={`${name} MAIN`} />

        <ProductHoverImage src={hoverImage} alt={`${name} HOVER`} />

        <SelectButton
          className="hidden md:block absolute bottom-0 left-0 w-full translate-y-full bg-primary py-3 font-jost font-medium text-white transition-all duration-300 group-hover:translate-y-0 hover:bg-black"
          ariaLabel="Select options for cream"
          label="Select"
        />
      </div>

      <ProductDetails name={name} price={price} compareAtPrice={compareAtPrice} size={sizeLabel ?? "100ml"} />

      <SelectButton
        className="block w-full cursor-pointer bg-black py-3 font-jost font-medium text-white transition-all duration-300 lg:hidden"
        label={SELECT_LABEL}
      />
    </div>
  );
}

export default memo(ProductCard);
