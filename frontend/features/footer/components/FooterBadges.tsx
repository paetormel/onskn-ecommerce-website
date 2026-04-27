import { footerBadgeLinks } from "../footer.data";

/**
 * Renders the app store badge links used in the footer.
 * Replace placeholder href values in footer.data.ts with real destination URLs.
 */
const FooterBadges = () => {
  return (
    <div className="flex flex-col gap-3">
      {footerBadgeLinks.map((badge) => (
        <a
          key={badge.id}
          href={badge.href}
          aria-label={badge.alt}
          className="transition-opacity duration-200 ease-in-out hover:opacity-70"
        >
          <img
            src={badge.src}
            alt={badge.alt}
            className={badge.className}
            loading="lazy"
            decoding="async"
          />
        </a>
      ))}
    </div>
  );
};

export default FooterBadges;
