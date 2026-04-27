import type { ReactNode } from "react";

type ProductFeatureProps = {
  content: ReactNode;
  image: string;
  titleId: string;
};

const ProductFeature = ({ content, image, titleId }: ProductFeatureProps) => (
  <section
    aria-labelledby={titleId}
    className="flex w-full flex-col overflow-hidden bg-primary md:h-screen md:flex-row"
  >
    <div className="flex w-full items-center justify-center md:w-1/2 md:text-center">
      {content}
    </div>

    <div className="w-full md:w-1/2">
      <img
        src={image}
        alt="ONSKN face moisturizer product feature"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
    </div>
  </section>
);

export default ProductFeature
