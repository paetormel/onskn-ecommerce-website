import { FiSearch } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";
import ProductCard from "~/features/products/components/ProductCard";
import BestSellerPrimaryImage from "../../assets/images/product-1.webp";
import BestSellerHoverImage from "../../assets/images/product1-image.webp";

const products = Array.from({ length: 6 }, (_, index) => ({
  id: String(index + 1),
  primaryImage: BestSellerPrimaryImage,
  hoverImage: BestSellerHoverImage,
}));

export default function Products() {
  return (
    <main className="px-5 w-full">
      <section className="my-35">
        <div className=" flex border-px border-gray-500 border-b pb-2">
          <FiSearch className="w-7 h-7  "/>
          <input type="text" placeholder="Search" className="mx-2 w-full"/>
          <IoCloseSharp className="w-7 h-7"/>
        </div>
        <span className="text-gray-500 mt-4 inline-block">(5 reuslts)</span>
      </section>
      <section className="">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 md:mx-2 gap-10 justify-items-center items-center">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              primaryImage={product.primaryImage}
              hoverImage={product.hoverImage}
              productId={product.id}
            />
          ))}
        </div>

      </section>
    </main>
  );
}
