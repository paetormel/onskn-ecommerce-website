interface ProductDetailsProps {
    name: string;
    price: string;
    size: string
}

function ProductDetails({name, price, size}: ProductDetailsProps) {
    return (
      <div className="py-2">
        <div className="flex items-center justify-between">
          <h3 className="font-jost">{name}</h3>
          <span>{price}</span>
        </div>
        <div className="text-xs text-slate-400">{size}</div>
      </div>
    );
  }
  
  export default ProductDetails;