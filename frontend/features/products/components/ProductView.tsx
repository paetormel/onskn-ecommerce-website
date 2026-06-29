import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Accordion from "~/features/navbar/Accordian";
import Loading from "~/shared/components/loading/loading";
import { useProduct } from "~/shared/hooks/useProduct";
import {
  formatSectionTitle,
  getProductDisplayImages,
} from "~/features/products/api/productsApi";

const ProductView = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError, error } = useProduct(slug);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const displayImages = useMemo(
    () => (product ? getProductDisplayImages(product) : []),
    [product]
  );

  useEffect(() => {
    setCurrentImageIndex(0);
    setQuantity(1);
    setShowFullDescription(false);
  }, [product?.id]);

  const variant = product?.variants[0];
  const price = variant?.price ?? 0;
  const compareAtPrice = variant?.compareAtPrice ?? null;
  const sizeLabel = variant?.sizeLabel ?? "100ml";
  const recommendedFor =
    product?.skinTypes.length ? product.skinTypes.join(", ") : "All skin types.";
  const skinConcern =
    product?.texture?.trim() || product?.category.name || "N/A";

  const accordionSections = useMemo(
    () =>
      product?.sections.map((section) => ({
        id: section.id,
        title: formatSectionTitle(section.type, section.title),
        content: section.content,
      })) ?? [],
    [product]
  );

  const currentImage = displayImages[currentImageIndex];

  const handlePrev = () => {
    if (displayImages.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? displayImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    if (displayImages.length === 0) return;
    setCurrentImageIndex((prev) =>
      prev === displayImages.length - 1 ? 0 : prev + 1
    );
  };

  const handlePickImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (isLoading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-5 py-12 font-jost">
        <Loading />
      </main>
    );
  }

  if (isError || !product) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-5 py-12 font-jost">
        <p className="text-sm text-red-500">
          {error instanceof Error ? error.message : "Failed to load product"}
        </p>
        <Link to="/products" className="text-sm underline">
          Back to products
        </Link>
      </main>
    );
  }

  const description = product.baseDescription.trim();
  const shortDescription =
    description.length > 180 && !showFullDescription
      ? `${description.slice(0, 180)}...`
      : description;

  return (
    <main className="flex flex-col gap-8 px-5 py-12 font-jost md:px-12">
      <nav aria-label="Breadcrumb" className="mt-5 text-xs text-black md:mt-20">
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
            {product.name}
          </li>
        </ol>
      </nav>

      <section
        aria-labelledby="product-title"
        className="grid gap-8 md:grid-cols-2 md:gap-25"
      >
        <div className="hidden max-h-full flex-1 md:block">
          <div className="relative">
            {currentImage ? (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                decoding="async"
                fetchPriority="high"
                className="h-[700px] w-full object-cover"
              />
            ) : (
              <div className="flex h-[700px] w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                No image available
              </div>
            )}

            {displayImages.length > 1 && (
              <>
                <button
                  type="button"
                  className="absolute left-2 top-1/2 -translate-y-1/2 transform bg-white p-2 transition-colors duration-200 hover:bg-black hover:text-white"
                  onClick={handlePrev}
                  aria-label="Previous image"
                >
                  <MdKeyboardArrowLeft size={20} className="cursor-pointer" />
                </button>
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 transform bg-white p-2 transition-colors duration-200 hover:bg-black hover:text-white"
                  onClick={handleNext}
                  aria-label="Next image"
                >
                  <MdKeyboardArrowRight size={20} className="cursor-pointer" />
                </button>
              </>
            )}
          </div>

          <div className="flex min-w-full gap-2">
            {displayImages.map((image, index) => (
              <img
                key={`${image.src}-${index}`}
                src={image.src}
                alt={image.alt}
                loading="lazy"
                decoding="async"
                className={`mt-4 hidden h-40 min-w-35 flex-1 cursor-pointer object-cover md:inline-block ${
                  index === currentImageIndex ? "border border-black" : ""
                }`}
                onClick={() => handlePickImage(index)}
              />
            ))}
          </div>
        </div>

        <div className="block -mx-5 overflow-x-auto px-5 touch-pan-x md:mx-0 md:hidden md:overflow-visible md:px-0">
          <div className="relative mb-4">
            {currentImage ? (
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                decoding="async"
                fetchPriority="high"
                className="h-100 w-full object-cover"
              />
            ) : (
              <div className="flex h-100 w-full items-center justify-center bg-gray-100 text-sm text-gray-400">
                No image available
              </div>
            )}
          </div>

          <ul className="flex snap-x snap-mandatory gap-4">
            {displayImages.map((image, index) => (
              <li
                key={`${image.src}-${index}`}
                className="w-[78vw] flex-none snap-start sm:w-[62vw]"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                  className={`h-100 w-full cursor-pointer object-cover ${
                    index === currentImageIndex ? "border border-black" : ""
                  }`}
                  onClick={() => handlePickImage(index)}
                />
              </li>
            ))}
          </ul>
        </div>

        <article className="flex flex-col gap-5 pr-45">
          <header className="flex flex-col gap-2">
            <h1
              id="product-title"
              className="font-jost text-2xl font-medium uppercase md:text-3xl"
            >
              {product.name}
            </h1>

            <p className="text-xl">
              <span className="font-medium">${price.toFixed(2)}</span>{" "}
              {compareAtPrice != null && compareAtPrice > price && (
                <span className="text-gray-400 line-through">
                  ${compareAtPrice.toFixed(2)}
                </span>
              )}
            </p>
          </header>

          <div className="flex flex-col gap-2 font-jost leading-5 text-gray-400 md:text-[16px]">
            <p>{shortDescription || "No description available."}</p>

            {description.length > 180 && (
              <button
                type="button"
                className="w-fit text-sm underline"
                onClick={() => setShowFullDescription((prev) => !prev)}
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
            )}
          </div>

          <dl className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1">
              <dt className="font-medium text-gray-500">Recommended For</dt>
              <dd>{recommendedFor}</dd>
            </div>

            <div className="flex flex-col gap-1">
              <dt className="text-lg font-medium text-gray-500">Skin Concern</dt>
              <dd>{skinConcern}</dd>
            </div>
          </dl>

          <div>
            <p className="inline-flex w-fit whitespace-nowrap bg-secondary px-3 py-1 text-sm">
              {sizeLabel}
            </p>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-0">
            <div
              className="flex w-full items-center border md:w-fit"
              aria-label="Quantity selector"
            >
              <button
                type="button"
                className="px-4 py-3"
                aria-label="Decrease quantity"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>

              <span
                className="flex-1 px-4 py-3 text-center md:flex-none"
                aria-live="polite"
              >
                {quantity}
              </span>

              <button
                type="button"
                className="px-4 py-3"
                aria-label="Increase quantity"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="border bg-black px-6 py-3 text-white md:flex-1"
            >
              Add to cart
            </button>
          </div>

          <Accordion sections={accordionSections} />
        </article>
      </section>
    </main>
  );
};

export default ProductView;
