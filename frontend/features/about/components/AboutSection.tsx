type AboutSectionProps = {
    title: string;
    description: string;
    firstImage: string;
    firstImageAlt: string;
    secondImage: string;
    secondImageAlt: string;
    imageLayout?: "left-small" | "left-large";
    titleClassName?: string;
    descriptionClassName?: string;
  };
  
  export default function AboutSection({
    title,
    description,
    firstImage,
    firstImageAlt,
    secondImage,
    secondImageAlt,
    imageLayout = "left-small",
    titleClassName = "",
    descriptionClassName = "",
  }: AboutSectionProps) {
    const firstImageWidth =
      imageLayout === "left-small" ? "md:w-2/5 md:h-screen" : "md:w-3/5 md:h-[737px]";
  
    const secondImageWidth =
      imageLayout === "left-small" ? "md:w-3/5 md:h-[737px]" : "md:w-2/5 md:h-screen";
  
    return (
      <div className="mx-5 max-w-full md:mx-0">
        <div className="flex flex-col gap-5 py-5 md:flex-row">
          <div className="hidden w-2/5 md:block" aria-hidden="true"></div>
  
          <article className="flex w-full flex-col gap-5 border-t border-gray-400 py-5 md:w-3/5 md:flex-row md:gap-40">
            <h2
              className={`mb-5 text-lg font-medium md:mb-0 md:w-40 md:shrink-0 ${titleClassName}`}
            >
              {title}
            </h2>
  
            <p className={`leading-5 text-sm ${descriptionClassName}`}>
              {description}
            </p>
          </article>
        </div>
  
        <div className="flex flex-col gap-5 md:flex-row md:gap-0">
          <img
            src={firstImage}
            alt={firstImageAlt}
            loading="lazy"
            decoding="async"
            className={`w-full aspect-square object-cover md:aspect-auto ${firstImageWidth}`}
          />

          <img
            src={secondImage}
            alt={secondImageAlt}
            loading="lazy"
            decoding="async"
            className={`w-full aspect-square object-cover md:aspect-auto ${secondImageWidth}`}
          />
        </div>
      </div>
    );
  }
