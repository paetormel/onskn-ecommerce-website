import { Link } from "react-router-dom";
import Gallery1 from "../../assets/images/gallery-1.jpeg";
import Gallery2 from "../../assets/images/gallery-2.webp";
import Gallery3 from "../../assets/images/gallery-3.jpg";
import Gallery4 from "../../assets/images/gallery-4.jpg";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState } from "react";
import Accordion from "~/shared/components/navbar/Accordian";

const PRODUCT_IMAGES = [
  { src: Gallery1, alt: "Even ONSKN Serum front view" },
  { src: Gallery2, alt: "Even ONSKN Serum side view" },
  { src: Gallery3, alt: "Even ONSKN Serum packaging" },
  { src: Gallery4, alt: "Even ONSKN Serum lifestyle shot" },
];

const ProductDetails = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(1);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? PRODUCT_IMAGES.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === PRODUCT_IMAGES.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePickImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <main className="flex flex-col gap-8 px-5 md:px-12 py-12 font-jost">
      <nav aria-label="Breadcrumb" className="mt-5 md:mt-20 text-xs text-black">
        <ol className="flex items-center gap-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="text-gray-400" aria-current="page">
            Product
          </li>
        </ol>
      </nav>

      <section
        aria-labelledby="product-title"
        className="grid gap-8 md:gap-25 md:grid-cols-2"
      >
        {/* IMAGE DETAILES */}
        <div className="hidden max-h-full md:block flex-1">
          <div className="relative">
            <img
              src={PRODUCT_IMAGES[currentImageIndex].src}
              alt={PRODUCT_IMAGES[currentImageIndex].alt}
              decoding="async"
              fetchPriority="high"
              className="w-full h-[700px] object-cover"
            />

            <button
              className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-2 hover:bg-black hover:text-white transition-colors duration-200"
              onClick={handlePrev}
            >
              <MdKeyboardArrowLeft size={20} className="cursor-pointer" />
            </button>
            <button
              className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-2 hover:bg-black hover:text-white transition-colors duration-200"
              onClick={handleNext}
            >
              <MdKeyboardArrowRight size={20} className="cursor-pointer " />
            </button>
          </div>

          <div className="w-full  flex gap-2 mt-2">
            {PRODUCT_IMAGES.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className={`${
                  index === currentImageIndex ? "border border-black" : ""
                } hidden flex-1 h-40 w-40 object-cover mt-4 cursor-pointer md:inline-block`}
                onClick={() => handlePickImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="block md:hidden -mx-5 overflow-x-auto px-5 touch-pan-x md:mx-0 md:overflow-visible md:px-0">
          <ul className="flex gap-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:snap-none">
            {PRODUCT_IMAGES.map((image, index) => (
              <li
                key={index}
                className="w-[78vw] flex-none snap-start sm:w-[62vw] md:w-auto"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className="h-100 w-full object-cover md:h-70"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* PRODUCT DETAILS */}
        <article className="flex flex-col gap-5 pr-45">
          <header className="flex flex-col gap-2">
            <h1 id="product-title" className="text-2xl md:text-3xl uppercase font-jost font-medium">
              Even ONSKN Serum
            </h1>

            <p className="text-xl">
              <span className="font-medium">$44.00</span>{" "}
              <span className="text-gray-400 line-through">$53.00</span>
            </p>
          </header>
          <div className="flex flex-col md:text-[16px] leading-5 text-gray-400 font-jost gap-2">
            <p>
              This lightweight serum delivers a luminous glow while gently
              brightening and evening out skin tone. Designed to complement the
              unique needs of melanated skin, it visibly reduces pigmentation.
            </p>

            <button type="button" className="w-fit text-sm underline">
              Show more
            </button>
          </div>
          <dl className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <dt className="font-medium text-gray-500">Recommended For</dt>
              <dd>All skin types.</dd>
            </div>

            <div className="flex flex-col gap-1">
              <dt className="font-medium text-gray-500 text-lg
              ">Skin Concern</dt>
              <dd>Uneven skin tone.</dd>
            </div>
          </dl>
          <div>
            <p className="inline-flex w-fit text-sm whitespace-nowrap bg-secondary px-3 py-1">
              30ml
            </p>
          </div>
          <div className="flex flex-col gap-4 md:gap-0 md:flex-row md:items-center md:justify-between">
            <div
              className="flex w-full items-center border md:w-fit"
              aria-label="Quantity selector"
            >
              <button
                type="button"
                className="px-4 py-3"
                aria-label="Decrease quantity"
              >
                -
              </button>

              <span
                className="flex-1 px-4 py-3 text-center md:flex-none"
                aria-live="polite"
              >
                1
              </span>

              <button
                type="button"
                className="px-4 py-3"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="md:flex-1 border px-6 py-3 bg-black text-white"
            >
              Add to cart
            </button>
          </div>

          {/* ACCORDIAN */}
          <Accordion />
        </article>
      </section>
    </main>
  );
};

export default ProductDetails;
