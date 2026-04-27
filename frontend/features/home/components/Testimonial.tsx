import Testimonial1 from "../../../assets/images/testimonial1.webp";
import Testimonial2 from "../../../assets/images/testimonial2.jpg";
import Testimonial3 from "../../../assets/images/testimonial3.webp";
import { IoMdStar } from "react-icons/io";
import { easeOut, motion } from "motion/react";

const testimonials = [
  {
    id: 1,
    image: Testimonial1,
    name: "Sophia",
    text: "My skin feels smoother, softer, and more hydrated after using ONSKN.",
  },
  {
    id: 2,
    image: Testimonial2,
    name: "Ava",
    text: "I love how lightweight it feels on my skin while still giving deep moisture.",
  },
  {
    id: 3,
    image: Testimonial3,
    name: "Mia",
    text: "One of the best skincare products I’ve tried. My skin looks healthier and more radiant.",
  },
];

const Testimonials = () => {
  return (
    <section className="mx-5 overflow-hidden py-20 md:py-40">
      <div className="overflow-hidden mb-5 ">
        <motion.h2
          id="testimonials-heading"
          initial={{ y: '100%' }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            duration: 0.8,
            ease: easeOut,
          }}
          className="font-jost  text-[30px] mb-3 -mt-2 mx-2"
        >
          Why People Love ONSKN
        </motion.h2>
      </div>
     

      <div className="custom-scrollbar overflow-x-auto scroll-smooth md:snap-x md:snap-mandatory">
        <div className="flex gap-4 pb-2 w-[180vw]">
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="min-w-[320px] bg-white p-4 md:min-w-125 md:snap-start"
            >
              <div className="flex flex-col gap-3 md:flex-row">
                <img
                  src={item.image}
                  alt={`${item.name} testimonial`}
                  loading="lazy"
                  decoding="async"
                  className="h-52 w-full object-cover md:h-35 md:w-35"
                />

                <div className="flex flex-1 flex-col justify-center">
                  <div className="flex text-primary">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <IoMdStar key={index} />
                    ))}
                  </div>

                  <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>

                  <p className="mt-2 text-sm leading-6 text-black/80">
                    {item.text}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
