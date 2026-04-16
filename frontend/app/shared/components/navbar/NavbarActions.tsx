type NavbarActionsProps = {
  isHome: boolean;
  isMenuOpen: boolean;
  isCartOpen: boolean;
  onToggleMenu: () => void;
  onToggleCart: () => void;
};

const NavbarActions = ({
  isHome,
  isMenuOpen,
  isCartOpen,
  onToggleCart,
  onToggleMenu,
}: NavbarActionsProps) => {
  return (
    <div className="flex gap-5 text-[14px] font-jost">
      <div className="flex items-center m-0">
        <button
          type="button"
          className={`group relative cursor-pointer transition-colors duration-300 ${
            isHome ? "text-white" : "text-black"
          }`}
          onClick={onToggleCart}
          aria-expanded={isCartOpen}
          aria-label={isCartOpen ? "Close cart" : "Open cart"}
        >
          Shopping Bag (0)
          <span
            className={`absolute bottom-0 left-0 hidden h-px w-full origin-right scale-x-0 transition-transform duration-500 ease-in-out group-hover:origin-left group-hover:scale-x-100 md:block ${
              isHome ? "bg-white" : "bg-black"
            }`}
          />
        </button>
      </div>

      <button
        type="button"
        className={`lg:hidden ${isHome ? "text-white" : "text-black"}`}
        onClick={onToggleMenu}
        aria-expanded={isMenuOpen}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        Menu
      </button>
    </div>
  );
};

export default NavbarActions;