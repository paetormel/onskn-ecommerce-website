import Appstore from "../../assets/images/appstore-badge.svg";
import GooglePlayStore from "../../assets/images/google-play-badge.svg";
import type { FooterBadgeLink, FooterLinkGroup } from "./footer.types";

export const footerBadgeLinks: FooterBadgeLink[] = [
  {
    id: "app-store",
    href: "https://apps.apple.com/us/app/onskn-skincare/id6743944844",
    src: Appstore,
    alt: "Download on the App Store",
    className: "w-50 max-w-full md:w-35",
  },
  {
    id: "google-play",
    href: "https://play.google.com/store/apps/details?id=com.onskn&hl=en_US&pli=1",
    src: GooglePlayStore,
    alt: "Get it on Google Play",
    className: "w-50 max-w-full md:w-35",
  },
];

export const footerLinkGroups: FooterLinkGroup[] = [
  {
    id: "group-1",
    items: ["Home", "Shop", "About"],
  },
  {
    id: "group-2",
    items: ["Contact", "Shipping & returns", "FAQs"],
  },
];

export const footerBrandText = "ONSK";
export const footerBrandLastLetter = "N";