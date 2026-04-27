import Gallery1 from "../../../assets/images/gallery-1.jpeg";
import Gallery2 from "../../../assets/images/gallery-2.webp";
import Gallery3 from "../../../assets/images/gallery-3.jpg";
import Gallery4 from "../../../assets/images/gallery-4.jpg";
import Gallery5 from "../../../assets/images/gallery-5.webp";
import Gallery6 from "../../../assets/images/gallery-6.jpeg";
import Gallery7 from "../../../assets/images/gallery-7.webp";

const images = [
  Gallery1,
  Gallery2,
  Gallery3,
  Gallery4,
  Gallery5,
  Gallery6,
  Gallery7,
];

const SocialGrid = () => {
  return (
    <section className="py-20 md:py-40 flex flex-col justify-center items-center overflow-hidden">
      <div className="w-full">
        <h2 className="text-left text-4xl ml-5 md:ml-0 md:text-center md:text-5xl font-medium mb-5 font-jost">
          FOLLOW US <br /> @ONSKN
        </h2>
        <div className="w-full md:w-[115vw]  overflow-x-auto md:overflow-hidden">
          <div className="grid w-max grid-cols-7 items-center justify-center gap-4 md:grid-cols-8 md:gap-5 lg:grid-cols-8">
            {images.map((image, index) => (
              <div
                key={index}
                className={`w-70 h-80  ${image === Gallery4 ? "md:w-full md:h-full md:col-span-2" : " md:w-50 md:h-70"}`}
              >
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className={`h-90 w-70 object-cover ${image === Gallery4 ? "md:w-full md:h-120" : " md:w-full md:h-60"}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialGrid;
