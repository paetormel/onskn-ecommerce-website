import { FaUser } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { IoNotifications } from "react-icons/io5";

const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white">
      <div className="w-100 flex items-center gap-4 border border-gray-400 rounded-full px-4 py-2">
        <FiSearch className="h-5 w-5" />
        <input type="text" name="" id="" placeholder="Search..." />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 flex items-center justify-center gap-2 border-[0.1px] text-gray-400 rounded-full p-2">
          <IoNotifications className="h-5 w-5 text-gray-400" />
        </div>
        <div className="w-10 h-10 flex items-center justify-center gap-2 bg-primary/10 text-primary rounded-full p-2">
          <FaUser />
        </div>
        <div>
          <p className="-mb-1 text-sm font-medium">ormelpaet653@gmail.com</p>
          <span className=" text-xs text-slate-400">Admin</span>
        </div>
        <HiMiniChevronUpDown className="ml-2 text-slate-400" size={20} />
      </div>
    </div>
  );
};

export default Header;
