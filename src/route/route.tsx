import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home";
// import Products from "../Pages/Products";
import About from "../Pages/About";
import Login from "../Pages/Login";
import UserDashboard from "../Pages/UserProtectedPage/UserDashboard";
import Settings from "../Pages/UserProtectedPage/Settings";
import Orders from "../Pages/UserProtectedPage/Orders";
import Register from "../Pages/Register";
import ManageOrder from "../Pages/AdminPage/ManageOrder";
import CreateProduct from "../Pages/AdminPage/CreateProduct";
import ManageUser from "../Pages/AdminPage/ManageUser";
import ManageProduct from "../Pages/AdminPage/ManageProduct";
import AdminDashboard from "../Pages/AdminPage/AdminDashboard";
import UpdateProducts from "../Pages/AdminPage/UpdateProducts";
import Products from "../Pages/Products";
import ProductDetails from "../components/ProductDetails";
import CheckOut from "../Pages/UserProtectedPage/CheckOut";
import VerifyOrder from "../Pages/UserProtectedPage/VerifyOrder";
import ProtectedRoute from "../components/Layout/ProtectedRoute";
import TotalRevenue from "../Pages/TotalRevenue";
import ProductName from "../components/ProductName";
// import NewsLetterSection from "../Components/NewsLetterSection";
import NewsletterTable from "../Pages/AdminPage/ManageNews";
import Allinformation from "../Pages/AdminPage/Allinformation";
import Profile from "../components/Profile";
import InformationOfUser from "../Pages/UserProtectedPage/InformationUser";

export const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/products",

        element: <Products />,
      },
      {
        path: "/products/:id",

        element: <ProductDetails />,
      },
      {
        path: "/product/:name",

        element: <ProductName />,
      },
      {
        path: "/checkout",

        element: (
          <ProtectedRoute role="customer">
            {" "}
            <CheckOut />
          </ProtectedRoute>
        ),
      },

      {
        path: "/checkout/verify",

        element: <VerifyOrder />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <Register />,
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute role="customer">
        <UserDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "settings",
        element: (
          <ProtectedRoute role="customer">
            <Settings />
          </ProtectedRoute>
        ),
      },
      {
        path: "orders",
        element: (
          <ProtectedRoute role="customer">
            <Orders />
          </ProtectedRoute>
        ),
      },
      {
        path: "information",
        element: (
          <ProtectedRoute role="customer">
            <InformationOfUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <Profile user={{ name: "", email: "", role: "", iat: 0, exp: 0 }} />
        ),
      },
    ],
  },
  {
    path: "admin/dashboard",
    element: (
      <ProtectedRoute role="admin">
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "homeDash",
        element: (
          <ProtectedRoute role="admin">
            <Allinformation />
          </ProtectedRoute>
        ),
      },
      {
        path: "manageorder",
        element: (
          <ProtectedRoute role="admin">
            <ManageOrder />
          </ProtectedRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <Profile user={{ name: "", email: "", role: "", iat: 0, exp: 0 }} />
        ),
      },

      {
        path: "createproduct",
        element: (
          <ProtectedRoute role="admin">
            <CreateProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "manageuser",
        element: (
          <ProtectedRoute role="admin">
            <ManageUser />
          </ProtectedRoute>
        ),
      },
      {
        path: "manageproduct",
        element: (
          <ProtectedRoute role="admin">
            <ManageProduct />
          </ProtectedRoute>
        ),
      },
      {
        path: "manageproduct/:id",
        element: (
          <ProtectedRoute role="admin">
            <UpdateProducts />
          </ProtectedRoute>
        ),
      },
      {
        path: "totalrevenue",
        element: (
          <ProtectedRoute role="admin">
            <TotalRevenue />
          </ProtectedRoute>
        ),
      },
      {
        path: "newsLatter",
        element: (
          <ProtectedRoute role="admin">
            <NewsletterTable />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
