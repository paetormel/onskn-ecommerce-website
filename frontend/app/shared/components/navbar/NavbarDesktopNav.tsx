import NavLinks from "./NavLinks";

type NavbarDesktopNavProps = {
  isHome: boolean;
};

const NavbarDesktopNav = ({ isHome }: NavbarDesktopNavProps) => {
  return (
    <ul className="hidden m-0 space-x-5 font-boldtext-white md:items-center md:flex">
      <NavLinks to="." isHome={isHome}>
        Home
      </NavLinks>
      <NavLinks to="shop" isHome={isHome}>
        Shop
      </NavLinks>
      <NavLinks to="about" isHome={isHome}>
        About
      </NavLinks>
      <NavLinks to="products" isHome={isHome}>
        Products
      </NavLinks>
    </ul>
  );
};

export default NavbarDesktopNav;
