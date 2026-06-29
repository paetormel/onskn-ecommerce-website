import { useProducts } from "~/shared/hooks/useProducts";
import ProductContainer from "./components/ProductContainer";
import PageWrapper from "../../components/layouts/PageWrapper";
import ProductActions from "./components/ProductActions";

const Products = () => {
  const { data: products = [], isLoading, isError, error } = useProducts();

  return (
    <PageWrapper>
      {/* Product Actions */}
      <ProductActions />

      {/* Product container */}
      <ProductContainer
        products={products}
        isLoading={isLoading}
        isError={isError}
        error={error}
      />
    </PageWrapper>
  );
};

export default Products;
