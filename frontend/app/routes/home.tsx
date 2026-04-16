import BestSellerSection from "~/features/home/components/BestSellerSection";
import HomeHero from "~/features/home/components/HomeHero";
import ProductFeature from "~/features/home/components/ProductFeature";
import Testimonials from "~/features/home/components/Testimonial";
import SocialGrid from "~/features/home/components/SocialGrid";
import Feature1 from "../assets/images/Feature1.webp";
import Feature2 from "../assets/images/Feature2.webp";
import { easeOut, motion } from "motion/react";

const titleClass =
  "mb-3 text-[37px] font-medium leading-9 md:text-[45px] md:leading-12";

const textReveal = {
  initial: { y: "100%" },
  whileInView: { y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: easeOut },
};

const textRevealDelayed = {
  ...textReveal,
  transition: { ...textReveal.transition, delay: 0.1 },
};
export function meta() {
  return [
    { title: "ONSKN | Premium Skincare" },
    {
      name: "description",
      content: "Discover your confidence with ONSKN.",
    },
  ];
}

function Content1() {
  return (
    <div className="mx-4 py-10 font-jost font-medium text-white md:mx-35">
      <div className="overflow-hidden">
        <h2 id="product-feature-title-1" className={titleClass}>
          <motion.span className="inline-block" {...textReveal}>
            ONSKN FACE
          </motion.span>
        </h2>
      </div>

      <div className="-mt-3 overflow-hidden">
        <h2 id="product-feature-title-2" className={titleClass}>
          <motion.span className="inline-block" {...textRevealDelayed}>
            MOISTURIZER
          </motion.span>
        </h2>
      </div>

      <p className="text-base leading-5 text-white md:text-sm md:text-white/90">
        Transform your skin with our moisturizer DEW GLISTEN ONSKN, infused with
        a powerful ceramide complex. This luxurious formula wraps your skin in
        deep hydration, ensuring it stays soft and supple throughout the day.
        Its lightweight texture absorbs seamlessly, leaving no residue behind.
      </p>
    </div>
  );
}

function Content2() {
  return (
    <div className="mx-4 py-10 font-jost font-medium text-white md:mx-35">
      <div className="overflow-hidden">
        <h2 id="product-feature-title-1" className={titleClass}>
          <motion.span className="inline-block" {...textReveal}>
            ONSKN FACE
          </motion.span>
        </h2>
      </div>

      <div className="-mt-3 overflow-hidden">
        <h2 id="product-feature-title-2" className={titleClass}>
          <motion.span className="inline-block" {...textRevealDelayed}>
            SERUM
          </motion.span>
        </h2>
      </div>

      <p className="text-base leading-5 text-white md:text-sm md:text-white/90">
        Reveal a smoother, more even-toned complexion with our serum, expertly
        blended with licorice root and ursolic acid. Works to harmonize your
        skin tone, reducing imperfections.
      </p>
    </div>
  );
}

/**
 * Home page for the ONSKN storefront.
 */
export default function Home() {
  return (
    <main className="flex flex-col">
      <HomeHero />
      <BestSellerSection />
      <ProductFeature
        content={<Content1 />}
        image={Feature1}
        titleId="product-feature-1-title"
      />
      <Testimonials />
      <ProductFeature
        content={<Content2 />}
        image={Feature2}
        titleId="product-feature-2-title"
      />
      <SocialGrid />
    </main>
  );
}
