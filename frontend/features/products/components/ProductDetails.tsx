interface ProductDetailsProps {
  name: string;
  price?: number;
  compareAtPrice?: number | null;
  size: string;
}

function ProductDetails({
  name,
  price,
  compareAtPrice,
  size,
}: ProductDetailsProps) {
  return (
    <div className="py-2">
      <div className="flex items-center justify-between">
        <h3 className="font-jost">{name}</h3>

        <div className="flex items-center gap-2">
          {compareAtPrice && (
            <span className="text-sm text-slate-400 line-through">
              {compareAtPrice}
            </span>
          )}

          <span>{price != null ? price.toFixed(2) : "—"}</span>
        </div>
      </div>

      <div className="text-xs text-slate-400">{size}</div>
    </div>
  );
}

export default ProductDetails;