import { useDisclosure } from "~/shared/hooks/useDisclosure";
import AddProductModal from "./AddProductModal";
import Title from "../../../components/Title";
import { GoPlus } from "react-icons/go";

const ProductActions = () => {
  const { isOpen, setIsOpen } = useDisclosure();

  return (
    <>
      <div className="mt-4 mb-8 flex items-center justify-between gap-3">
        <Title title="Products" />
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <GoPlus size={20} />
          Add Product
        </button>
      </div>

      <AddProductModal isOpen={isOpen} setIsModalOpen={setIsOpen} />
    </>
  );
};

export default ProductActions;
