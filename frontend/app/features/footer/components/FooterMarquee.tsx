import { footerBrandLastLetter, footerBrandText } from "../footer.data";
import { memo } from "react";

/**
 * Sub-component for the brand text logic to prevent 
 * re-declaration inside the main render loop.
 */
const BrandLabel = memo(() => (
  <>
    {footerBrandText}
    <span className="inline-block transform -scale-x-100">
      {footerBrandLastLetter}
    </span>
  </>
));

BrandLabel.displayName = "BrandLabel";

const FooterMarquee = () => {
  // Organized Tailwind Classes: Layout > Box > Type > Visual > Interact
  const itemClasses = `
    shrink-0 origin-left 
    pr-10 md:pr-20
    font-syne text-[75px] md:text-[250px] font-medium md:font-semibold leading-none tracking-[-0.04em] 
    text-secondary 
    transform scale-x-140
  `.replace(/\s+/g, ' ').trim();

  return (
    <aside 
      className="w-full overflow-hidden border-t border-secondary/50 pt-2 md:pt-0" 
      aria-label="Footer Brand Scroller"
      role="complementary"
    >
      <div 
        className="flex gap-25 md:gap-100 animate-marquee whitespace-nowrap"
        aria-hidden="true" // Hide the entire marquee from SR if it's purely decorative
      >
        {/* We use a loop to keep the code DRY. 
          The first item can be a hidden H2 for SEO if the brand name isn't elsewhere.
        */}
        {[0, 1, 2].map((i) => (
          <span key={i} className={itemClasses}>
            <BrandLabel />
          </span>
        ))}
      </div>
      
      {/* Screen Reader Only text for SEO without the marquee jitter */}
      <h2 className="sr-only">
        {footerBrandText}{footerBrandLastLetter}
      </h2>
    </aside>
  );
};

export default FooterMarquee;