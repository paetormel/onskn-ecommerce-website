import { Link } from "react-router-dom";
import About1 from "../../assets/images/philosophy-about-1.webp";
import About2 from "../../assets/images/philosophy-about-2.webp";
import Founder from "../../assets/images/founder.jpg";
import Product from "../../assets/images/testimonial3.webp";
import AboutSection from "./components/AboutSection";

export default function About() {
  return (
    <main className="flex flex-col py-17 font-jost md:py-20">
      <section className="w-full" aria-labelledby="about-heading">
        <nav
          aria-label="Breadcrumb"
          className="mx-9 mt-1 text-black md:mx-25 md:mt-8 md:text-xs"
        >
          <Link to="/">Home</Link>
          <span aria-hidden="true"> / </span>
          <span className="text-gray-400">About</span>
        </nav>

        <div className="flex flex-col">
          <header>
            <h1
              id="about-heading"
              className="mx-5 mt-6 mb-20 text-[35px] font-medium tracking-wider md:mx-12 md:mt-20 md:text-[43px]"
            >
              OUR STORY
            </h1>
          </header>

          <AboutSection
            title="Philosophy"
            description="ONSKN blends care and purpose to support healthy skin. Our formulas hydrate, soothe, and strengthen, helping the skin stay resilient against everyday environmental stress. We are committed to empowering all skin types with skincare that is effective, thoughtful, and truly supportive."
            firstImage={About2}
            firstImageAlt="ONSKN skincare product visual"
            secondImage={About1}
            secondImageAlt="Close-up skincare lifestyle visual"
            imageLayout="left-small"
            descriptionClassName="pr-30"
          />

          <AboutSection
            title="The Founder"
            description="Dr. Kianna De La Mores, a military veteran and healthcare leader founded ONSKN to celebrate the beauty and resilience of skin. Inspired by her journey and the challenges of finding solutions for diverse skin needs, she partnered with chemists to create products that prioritize health, balance, and radiance."
            firstImage={Founder}
            firstImageAlt="Portrait of the ONSKN founder"
            secondImage={Product}
            secondImageAlt="ONSKN skincare product display"
            imageLayout="left-large"
            titleClassName="whitespace-nowrap text-lg"
            descriptionClassName="pr-20"
          />
        </div>
      </section>
    </main>
  );
}
