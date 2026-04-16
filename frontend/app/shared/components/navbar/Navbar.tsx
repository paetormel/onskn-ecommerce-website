import { Suspense, lazy, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import NavbarBrand from "./NavBrand";
import NavbarDesktopNav from "./NavbarDesktopNav";
import NavbarActions from "./NavbarActions";
import { FiUser } from "react-icons/fi";
import { useDisclosure } from "~/shared/hooks/useDisclosure";

const MobileMenu = lazy(() => import("./MobileMenu"));
const ShoppingBag = lazy(() => import("./ShoppingBag"));

const Navbar = () => {
  const { pathname } = useLocation();

  const isHome = pathname === "/";
  const LogoTag = isHome ? "h1" : "span";

  const menuDisclosure = useDisclosure();
  const cartDisclosure = useDisclosure();

  useEffect(() => {
    menuDisclosure.close();
  }, [pathname]);

  return (
    <header className="absolute top-0 left-0 z-50 w-full bg-transparent">
      <nav className="mx-5 flex justify-between py-5 text-sm font-medium lg:ml-10 lg:mr-12">
        <NavbarBrand isHome={isHome} LogoTag={LogoTag} />

        <div className="flex items-start gap-5 md:gap-8">
          <div className="flex items-center gap-5">
            <NavbarDesktopNav isHome={isHome} />
            <NavbarActions
              isHome={isHome}
              isMenuOpen={menuDisclosure.isOpen}
              isCartOpen={cartDisclosure.isOpen}
              onToggleCart={cartDisclosure.toggle}
              onToggleMenu={menuDisclosure.toggle}
            />
            <div className="hidden flex items-start justify-center">
              <div className="w-8 h-8 rounded-full bg-amber-600" />
            </div>
            <div className="flex ml-5 items-center gap-3 text-sm text-white font-jost">
              <Link to="/login">
                <FiUser
                  size={20}
                  className={`${isHome ? "text-white" : "text-black"}`}
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <hr className="-mt-2 mx-5 h-px text-gray-400 md:hidden" />

      <AnimatePresence>
        {menuDisclosure.isOpen && (
          <Suspense fallback={null}>
            <MobileMenu
              LogoTag={LogoTag}
              isHome={isHome}
              onClose={menuDisclosure.close}
            />
          </Suspense>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {cartDisclosure.isOpen && (
          <Suspense fallback={null}>
            <ShoppingBag onClose={cartDisclosure.close} />
          </Suspense>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
