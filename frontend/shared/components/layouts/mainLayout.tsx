import { Outlet } from "react-router-dom";
import Footer from "~/features/footer/components/Footer";
import Navbar from "~/features/navbar/Navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#F8F2ED] font-family-jost">
      <p className="text-center text-[16px] lg:text-sm bg-black text-white  py-3 md:py-2 uppercase">
        WELCOME TO ONSKN.
      </p>

      <div className="relative">
        <Navbar />
      </div>

      <main className=" relative grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
