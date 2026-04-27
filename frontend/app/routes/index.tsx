import { Suspense, lazy, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";

const MainLayout = lazy(() => import("../../shared/components/layouts/mainLayout"));
const ProductsLayout = lazy(() =>
  import("../../shared/components/layouts/productsLayout")
);
const Home = lazy(() => import("../../features/home/home"));
const About = lazy(() => import("../../features/about/about"));
const Products = lazy(() => import("../../shared/components/products"));
const ProductDetails = lazy(() => import("../../features/products/components/ProductView"));
const Shop = lazy(() => import("../../features/shop/shop"));
const Login = lazy(() => import("../../features/auth/login"));
const Signup = lazy(() => import("../../features/auth/signup"));

function withSuspense(node: ReactNode) {
  return <Suspense fallback={null}>{node}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: withSuspense(<Login />),
  },
  {
    path: "/signup",
    element: withSuspense(<Signup />),
  },
  {
    element: withSuspense(<MainLayout />),
    children: [
      {
        index: true,
        element: withSuspense(<Home />),
      },
      {
        path: "/about",
        element: withSuspense(<About />),
      },
      {
        path: "/products",
        element: withSuspense(<ProductsLayout />),
        children: [
          {
            index: true,
            element: withSuspense(<Products />),
          },
          {
            path: ":productId",
            element: withSuspense(<ProductDetails />),
          },
        ],
      },
      {
        path: "/shop",
        element: withSuspense(<Shop />),
      },
    ],
  },
]);
