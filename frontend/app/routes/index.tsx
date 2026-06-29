import { Suspense, lazy, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "~/shared/routes/PublicRoute";

const MainLayout = lazy(
  () => import("../../shared/components/layouts/mainLayout")
);
const ProductsLayout = lazy(
  () => import("../../shared/components/layouts/productsLayout")
);

//Landing pages
const Home = lazy(() => import("../../features/home/home"));
const About = lazy(() => import("../../features/about/about"));
const Products = lazy(() => import("../../features/products/products"));

//Admin dashboard
const AdminLayout = lazy(
  () => import("../../features/admin-dashboard/components/layouts/layout")
);
const AdminDashboard = lazy(
  () => import("../../features/admin-dashboard/pages/dashboard/Dashboard")
);
const AdminProducts = lazy(
  () => import("../../features/admin-dashboard/pages/products/Products")
);
const AdminOrders = lazy(
  () => import("../../features/admin-dashboard/pages/Orders")
);
const AdminCustomers = lazy(
  () => import("../../features/admin-dashboard/pages/Customers")
);
const AdminSettings = lazy(
  () => import("../../features/admin-dashboard/pages/Setting")
);

const ProductDetails = lazy(
  () => import("../../features/products/components/ProductView")
);
const Shop = lazy(() => import("../../features/shop/shop"));
const Login = lazy(() => import("../../features/auth/login"));
const Signup = lazy(() => import("../../features/auth/signup"));

function withSuspense(node: ReactNode) {
  return <Suspense fallback={null}>{node}</Suspense>;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    element: withSuspense(
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: withSuspense(
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
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
            path: ":slug",
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
  {
    element: withSuspense(<AdminLayout />),
    path: "/admin",
    children: [
      {
        index: true,
        element: withSuspense(<AdminDashboard />),
      },
      {
        path: "/admin/products",
        element: withSuspense(<AdminProducts />)
      },
      {
        path: "/admin/orders",
        element: withSuspense(<AdminOrders />)
      },
      {
        path: "/admin/customers",
        element: withSuspense(<AdminCustomers />)
      },
      {
        path: "/admin/setting",
        element: withSuspense(<AdminSettings />)
      }
    ]
  }
]);
