// --- Layouts ---
export { default as AdminLayout } from "./components/layouts/layout";

// --- Pages ---
export { default as AdminDashboardPage } from "./pages/dashboard/Dashboard";
export { default as AdminProductsPage } from "./pages/products/Products";
export { default as AdminOrdersPage } from "./pages/Orders";
export { default as AdminCustomersPage } from "./pages/Customers";
export { default as AdminSettingsPage } from "./pages/Setting";

// --- Components ---
export { default as Sidebar } from "./components/Sidebar";
export { default as Title } from "./components/Title";
// Product Components
export { default as AddProductModal } from "./pages/products/components/AddProductModal";
export { default as ProductContainer } from "./pages/products/components/ProductContainer";
export { default as ProductTable } from "./pages/products/components/ProductTable";

// --- Types ---
export type {
  Product,
  ProductContainerProps,
  ProductFormField,
  ProductFormFieldKey,
  ProductModalProps,
  ProductTableProps,
} from "./types/product.type";
