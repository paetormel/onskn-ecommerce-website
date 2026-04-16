import { Link } from "react-router-dom";

type NavLinksProps = {
  to: string;
  children: string;
  isHome: boolean;
  onClick?: () => void;
};

const NavLinks = ({ to, children, isHome, onClick}: NavLinksProps) => {
  return (
    <Link
      to={to}
      className={`group relative inline-block mx-5 border-b md:ml-7 border-white/50 py-4 text-[27px]  font-semibold leading-tight transition-colors duration-300 md:mx-0 md:border-none md:p-0 md:text-[14px] md:font-semibold ${
        isHome ? "text-white" : "text-white md:text-black"
      }`}
      onClick={onClick}
    >
      <span className="relative z-10 block">{children}</span>

      <span
        className={`absolute bottom-0 left-0 mt-1 h-px w-full origin-right scale-x-0 transition-transform duration-300 ease-in-out will-change-transform group-hover:origin-left group-hover:scale-x-100 ${
          isHome ? "bg-white" : "bg-white md:bg-black"
        }`}
        aria-hidden="true"
      />
    </Link>
  );
};

export default NavLinks;
