import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

interface ShoppingBagProps {
  onClose: () => void;
}

const ShoppingBag = ({ onClose }: ShoppingBagProps) => {
  return (
    <div
      className="fixed inset-0 z-50 bg-black/60"
      onClick={onClose}
      aria-hidden="true"
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        className="ml-auto flex h-dvh w-full flex-col overflow-hidden text-black bg-white lg:w-125"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
      >
        <div className="text-white">
          <div className="flex items-center font-medium justify-between mx-5 pt-4 pb-9 border-b border-black/50">
            <Link
              to="."
              aria-label="ONSKN Home"
              className="text-md font-jost leading-5 text-black"
            >
            Your Bag  (0)
            </Link>

            <button
              type="button"
              className="cursor-pointer text-black text-md font-medium leading-5"
              onClick={onClose}
              aria-label="Close mobile menu"
            >
              Close
            </button>
          </div>
        </div>

        <section className="mt-12 mx-5 font-jost">
          <p className="font-semibold text-[17px]">
            Your cart is empty? You skinwill still <br /> look its best.
          </p>
          <button className="bg-black text-white flex items-center justify-center w-full mt-10 px-5 py-3">Shop All</button>
        </section>
      </motion.div>
    </div>
  );
};

export default ShoppingBag;
