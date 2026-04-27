import { FiMinus, FiPlus } from "react-icons/fi";

const accordionSections = [
    {
      id: "1",
      title: "BENEFITS",
      content: "Visible Radiance Even Tone Smoother Texture Anti-Aging",
    },
    {
      id: "2",
      title: "HOW IT WORKS",
      content:
        "Experience a revitalizing formula where ursolic acid gently brightens and defends against aging, licorice root visibly fades dark spots for a luminous complexion, tripeptide-29 boosts collagen to smooth and firm, and carrageen moss drenches skin in lasting moisture while fortifying its natural barrier. Reveal skin that looks radiant, even, and resilient.",
    },
    {
      id: "3",
      title: "HOW TO USE",
      content:
        "Apply liberally to clean skin after PORE ONSKN Hydrating Cleanser.",
    },
    {
      id: "4",
      title: "PRODUCT SAFETY",
      content: "Fragrance Free Paraben Free Non Comedogenic Cruelty-Free",
    },
    {
      id: "5",
      title: "SUSTAINABILITY",
      content:
        "Recyclable container packaging Cartons are recyclable and reusable",
    },
    {
      id: "6",
      title: "INGREDIENTS",
      content:
        "Water, Glycerin, Caprylic/Capric Triglyceride, 3-Glyceryl Ascorbate, Niacinamide, Cocos Nucifera (Coconut) Fruit Water, Phospholipids, Ursolic Acid, Lactobacillus Ferment, Glycyrrhiza Glabra (Licorice) Root Extract, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate Copolymer, Chondrus Crispus Extract, Populus Tremuloides Bark Extract, Punica Granatum Extract, Tripeptide-29, Tocopheryl Acetate, Phenoxyethanol, Ethylhexylglycerin, Polyacrylate Crosspolymer-6, Sodium Hyaluronate, Leuconostoc/Radish Root Ferment Filtrate.",
    },
  ];

const Accordion = () => {
  return (
    <div>
    {accordionSections.map((item) => (
      <details key={item.id} className="group border-b">
        <summary className="relative cursor-pointer py-3 pr-8 font-medium list-none">
          {item.title}

          <FiPlus className="absolute right-2 top-1/2 -translate-y-1/2 group-open:hidden" />
          <FiMinus className="absolute right-2 top-1/2 -translate-y-1/2 hidden group-open:block" />
        </summary>

        <p className="py-2 text-gray-500 text-sm font-jost">{item.content}</p>
      </details>
    ))}
  </div>
  )
}

export default Accordion
