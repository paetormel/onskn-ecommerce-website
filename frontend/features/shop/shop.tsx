import { lazy, Suspense } from "react";
import { Link, useLocation } from "react-router-dom";
import Product1 from "../../assets/images/product-1.webp";
import Product1Image from "../../assets/images/product1-image.webp";
import ProductCard from "~/features/products/components/ProductCard";
import { FiPlus } from "react-icons/fi";
import { RiArrowDownSLine } from "react-icons/ri";
import { useDisclosure } from "~/shared/hooks/useDisclosure";

const FilterPanel = lazy(() => import("~/features/filter/components/FilterPanel"));

const shopProductCards = Array.from({ length: 6 }, (_, index) => ({
  id: `shop-product-${index + 1}`,
  primaryImage: Product1,
  hoverImage: Product1Image,
}));

export default function Shop() {
  const { pathname } = useLocation();
  const isHome = pathname !== "/";
  const {isOpen, close, open} = useDisclosure();
  return (
    <div className=" flex flex-col">
      <section className="w-full">
        <div className="mx-5 lg:mx-12 max-w-7xl mt-27 mb-20 z-0">
          <p
            className={`-mt-8 md:mt-0 uppercase font-syne text-xs leading-4  ${isHome ? "text-primary" : "text-white"}`}
          >
            Discover personalized skincare that enhances your unique <br />{" "}
            beauty and boosts confidence. ONSKN tailored solutions will <br />{" "}
            leave you with healthy, radiant skin that feels amazing every <br />{" "}
            day. Experience the transformative power of skincare designed <br />{" "}
            just for you.
          </p>
          <div className="text-xs text-black  mt-5">
            <Link to="/">Home</Link>
            <span> / </span>
            <Link to="/shop" className="text-gray-400">
              Shop
            </Link>
          </div>
        </div>
      </section>
      <section className="min-h-screen">
        <span className="underline overflow-auto h-1"></span>
        <h1 className="text-[42px] font-jost font-medium uppercase mx-5 lg:mx-12 mb-5">
          Shop
        </h1>
        <hr className="h-px text-gray-400" />

        <div className="mx-5 lg:mx-12">
          <div className="flex justify-between items-center font-jost text-sm pt-5">
            <div className="flex gap-5">
              <button className="flex items-center font-semibold" onClick={open}>
                <FiPlus size={16} className="text-gray-800" />
                Filters
              </button>
              <button className="text-gray-500 border-b border-gray-500">
                Reset all
              </button>
            </div>
            <div className="flex items-center md:gap-2">
              <h3 className="font-semibold cursor-pointer">Sort by:</h3>
              <p className="flex items-center gap-1.25">
                <span className="md:block hidden">Default</span> <RiArrowDownSLine className="w-6 h-6 cursor-pointer"/>
              </p>
            </div>
          </div>
          <div className="gr grid grid-cols-1 lg:grid-cols-3 pt-5 gap-3 justify-items-center md:grid-cols-2">
            {shopProductCards.map((product) => (
              <ProductCard
                key={product.id}
                primaryImage={product.primaryImage}
                hoverImage={product.hoverImage}
              />
            ))}
          </div>
        </div>
      </section>
      {isOpen && (
        <Suspense fallback={null}>
          <FilterPanel onClose={close} />
        </Suspense>
      )}
    </div>
  );
}
