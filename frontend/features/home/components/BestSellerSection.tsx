/**
 * Best seller product highlight section.
 *
 * Keeps the current layout and styling unchanged.
 */
import { easeOut, motion } from "motion/react";

import BestSellerPrimaryImage from "../../../assets/images/product-1.webp";
import BestSellerHoverImage from "../../../assets/images/product1-image.webp";
import ProductCard from "~/features/products/components/ProductCard";

const bestSellerProducts = Array.from({ length: 5 }, (_, index) => ({
  id: `best-seller-${index + 1}`,
  primaryImage: BestSellerPrimaryImage,
  hoverImage: BestSellerHoverImage,
}));

function BestSellerSection() {
  return (
    <section
      className="mx-3 md:mx-10 z-10 py-20 my-10"
      aria-labelledby="best-seller-heading"
    >
      <div className="overflow-hidden">
        <motion.h2
          id="best-seller-heading"
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: easeOut,
          }}
          className="font-jost font-medium text-[45px] mb-3 -mt-2 mx-2"
        >
          ONSKIN BEST SELLER
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pt-5 md:mx-2 gap-2 justify-items-center items-center">
        {bestSellerProducts.map((product) => (
          <ProductCard
            key={product.id}
            primaryImage={product.primaryImage}
            hoverImage={product.hoverImage}
          />
        ))}
      </div>
    </section>
  );
}

export default BestSellerSection;
