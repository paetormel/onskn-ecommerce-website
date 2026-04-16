import { motion } from 'motion/react';
import HeroImage from "../../../assets/images/photo-3.jpeg";

/**
 * Hero section for the home page.
 *
 * Uses a background image and animated entrance.
 * Includes the main page heading for better semantics and SEO.
 */
function HomeHero() {
    return (
      <motion.section
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ ease: "easeInOut", duration: 0.8 }}
        className="h-screen w-full bg-cover bg-center bg-no-repeat min-h-[80vh]"
        style={{ backgroundImage: `url(${HeroImage})` }}
        aria-label="ONSKN hero section"
      >
        <div className="mx-5 lg:mx-12 max-w-7xl my-18 md:my-27 z-0">
          <h1 className="sr-only">ONSKN Premium Skincare</h1>
  
          <p className="uppercase font-syne text-xs leading-4 text-white">
            Discover your confidence with ONSKN. Skincare created to <br />
            reveal the skin you feel proud of-refined, nourished and <br />
            authentically yours.
          </p>
        </div>
      </motion.section>
    );
  }

  export default HomeHero;