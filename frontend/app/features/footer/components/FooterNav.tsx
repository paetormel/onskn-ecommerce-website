import { Link } from "react-router-dom";
import { footerLinkGroups } from "../footer.data";

/**
 * Renders grouped footer navigation text.
 * These are kept as plain text to preserve the current UI and behavior.
 */
const FooterNav = () => {
  return (
    <nav
      aria-label="Footer navigation"
      className="text-[16px] md:flex md:flex-row md:gap-35 md:text-sm"
    >
      <div className="flex flex-col gap-1 md:flex-row md:gap-35">
        {footerLinkGroups.map((group) => (
          <ul key={group.id} className="flex flex-col  gap-1">
            {group.items.map((item) => (
              <li key={item}>
                <Link
                  to="/shop"
                  title="Go to Shop"
                  aria-label="Go to Shop"
                  className="hover:text-amber-100 cursor-pointer"
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </nav>
  );
};

export default FooterNav;
