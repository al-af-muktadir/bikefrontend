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
import ProductDetails from "../Components/ProductDetails";
import CheckOut from "../Pages/UserProtectedPage/CheckOut";
import VerifyOrder from "../Pages/UserProtectedPage/VerifyOrder";
import ProtectedRoute from "../Components/Layout/ProtectedRoute";
import TotalRevenue from "../Pages/TotalRevenue";

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
        path: "manageorder",
        element: (
          <ProtectedRoute role="admin">
            <ManageOrder />
          </ProtectedRoute>
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
    ],
  },
]);
