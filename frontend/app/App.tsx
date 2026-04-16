import { Suspense, lazy, type ReactNode } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const MainLayout = lazy(() => import("./layouts/mainLayout"));
const ProductsLayout = lazy(() => import("./layouts/productsLayout"));
const Home = lazy(() => import("./routes/home"));
const About = lazy(() => import("./routes/about"));
const Products = lazy(() => import("./routes/products"));
const ProductDetails = lazy(() => import("./features/product_details/ProductDetails"));
const Shop = lazy(() => import("./routes/shop"));
const Login = lazy(() => import("./routes/login"));
const Signup = lazy(() => import("./routes/signup"));

function withSuspense(node: ReactNode) {
  return <Suspense fallback={null}>{node}</Suspense>;
}

const router = createBrowserRouter([
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
          }
        ],
      },
      {
        path: "/shop",
        element: withSuspense(<Shop />),
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
