import React from "react";
import { Link } from "react-router-dom";

type NavbarBrandProps = {
  isHome: boolean;
  LogoTag: React.ElementType;
};

const NavbarBrand = ({ isHome, LogoTag }: NavbarBrandProps) => {
  return (
    <div className="flex items-center text-2xl font-bold ">
      <Link
        to="."
        aria-label="ONSKN Home"
        className={`block scale-x-135 origin-left font-semibold leading-[0.7] text-[20px] md:text-[105px] m-0 font-syne ${!isHome ? "text-primary" : "text-white"}`}
      >
        <LogoTag>
          ONSK<span className="inline-block transform -scale-x-100">N</span>
        </LogoTag>
      </Link>
    </div>
  );
};

export default NavbarBrand;
