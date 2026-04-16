import { type ElementType, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";

interface MobileMenuProps {
  LogoTag: ElementType;
  isHome: boolean;
  onClose: () => void;
}

const MobileMenu = ({ LogoTag, isHome, onClose }: MobileMenuProps) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.touchAction = originalTouchAction;
    };
  }, []);

  return (
    <motion.div
      initial={{ clipPath: "inset(0 0 0 100%)" }}
      animate={{ clipPath: "inset(0 0 0 0)" }}
      exit={{ clipPath: "inset(0 0 0 100%)" }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex h-dvh w-full flex-col justify-between overflow-hidden bg-primary md:hidden"
      aria-modal="true"
      role="dialog"
      aria-label="Mobile menu"
    >
      <div className="flex flex-col">
        <div className="flex justify-between px-5 py-4">
          <Link
            to="."
            aria-label="ONSKN Home"
            className="m-0 block origin-left scale-x-130 text-[25px] font-syne leading-[0.7] text-white"
            onClick={onClose}
          >
            <LogoTag>
              ONSK
              <span className="inline-block -scale-x-100">N</span>
            </LogoTag>
          </Link>

          <button
            type="button"
            className="cursor-pointer text-md font-medium leading-5 text-white"
            onClick={onClose}
            aria-label="Close mobile menu"
          >
            Close
          </button>
        </div>

        <hr className="mx-4 max-w-full border-white/50" />
      </div>

      <nav aria-label="Mobile navigation">
        <ul
          className={`m-0 flex flex-col text-3xl uppercase ${
            isHome ? "text-white" : "text-black"
          }`}
        >
          <NavLinks to="." isHome={isHome} onClick={onClose}>
            Home
          </NavLinks>
          <NavLinks to="shop" isHome={isHome} onClick={onClose}>
            Shop
          </NavLinks>
          <NavLinks to="about" isHome={isHome} onClick={onClose}>
            About
          </NavLinks>
          <NavLinks to="products" isHome={isHome} onClick={onClose}>
            Contact
          </NavLinks>
        </ul>
      </nav>

      <address className="not-italic text-lg font-bold mx-5 my-7 text-white">
        <p>support@gmail.com</p>
        <p className="mt-1.5">ormel@gmail.com</p>
      </address>
    </motion.div>
  );
};

export default MobileMenu;
