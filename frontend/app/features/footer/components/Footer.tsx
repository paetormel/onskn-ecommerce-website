import FooterBadges from "./FooterBadges";
import FooterBottom from "./FooterBottom";
import FooterMarquee from "./FooterMarquee";
import FooterNav from "./FooterNav";
import FooterNewsletter from "./FooterNewsLetter";

/**
 * Main footer container.
 * Keeps the current design and behavior while splitting content into focused subcomponents.
 */
const Footer = () => {
  return (
    <footer className="flex min-h-[85vh] flex-col justify-between bg-primary pt-10 pb-5 font-jost text-xs text-secondary md:pt-15">
      <div className="flex flex-col justify-between gap-10 px-4 pb-10 md:flex-row md:px-12">
        <div className="flex flex-col gap-10 text-sm md:flex-row md:justify-between md:gap-25">
          <FooterBadges />
          <FooterNav />
        </div>
        <FooterNewsletter />
      </div>

      <FooterMarquee />
      <FooterBottom />
    </footer>
  );
};

export default Footer;