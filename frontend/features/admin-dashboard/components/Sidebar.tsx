  import React from "react";
  import { NavLink } from "react-router";
  import type { IconType } from "react-icons";
  import { IoIosLogOut } from "react-icons/io";

  import {
    LuLayoutDashboard,
    LuPackage,
    LuShoppingCart,
    LuUsers,
    LuSettings
  } from "react-icons/lu";
  import { FaUser } from "react-icons/fa";

  interface NavItem {
    name: string;
    path: string;
    icon: IconType;
  }

  const Sidebar: React.FC = () => {
    const navItems: NavItem[] = [
      { name: "Dashboard", path: "/admin", icon: LuLayoutDashboard },
      { name: "Products", path: "/admin/products", icon: LuPackage },
      { name: "Orders", path: "/admin/orders", icon: LuShoppingCart },
      { name: "Customers", path: "/admin/customers", icon: LuUsers },
      {name: "Settings", path: "/admin/setting", icon: LuSettings},
    ];

    const navLinkStyle = ({ isActive }: { isActive: boolean }): string =>
      `group flex items-center gap-3.5 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
        isActive
          ? "bg-primary/80 text-white shadow-lg shadow-secondary/20"
          : "hover:bg-white/5"
      }`;

    return (
      <aside className="w-60 sticky top-0 h-screen flex flex-col border-r border-white/10 p-4">
        {/* Brand */}
        <div className="mb-10 px-2 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-bold text-lg">
            A
          </div>
          <h1 className="text-xl font-bold tracking-tight">Admin Portal</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1">
          <ul className="flex flex-col gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  className={navLinkStyle}
                >
                  <Icon className="text-lg opacity-80 group-hover:opacity-100" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="flex justify-between items-center pt-6 border-t border-white/10">
          <div className="flex items-center gap-3 px-2 hover:text-gray-400 cursor-pointer transition-colors">
            <div className="w-10 h-10 flex items-center justify-center bg-secondary text-primary rounded-full">
              <FaUser />
            </div>
            <div className="text-xs">
              <p className="font-medium">Admin User</p>
              <p>Settings</p>
            </div>
          </div>
            <button className="cursor-pointer">
            <IoIosLogOut size={25}/>
            </button>
        </div>
      </aside>
    );
  };

  export default Sidebar;
