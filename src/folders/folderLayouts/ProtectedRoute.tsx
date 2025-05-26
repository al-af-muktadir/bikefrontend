import { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/storeHooks";
import { logout, useCurrentToken } from "../../Slice/AuthStore";
import { Navigate, useLocation } from "react-router-dom";
import { jwtDecode, JwtPayload } from "jwt-decode";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string;
}) => {
  interface DecodedToken extends JwtPayload {
    role: string;
  }
  const location = useLocation();
  const dispatch = useAppDispatch();
  const token = useAppSelector(useCurrentToken);

  //("in p rute", user, token);
  let userauth;

  if (token) {
    userauth = jwtDecode<DecodedToken>(token);
  }
  //("userauth", userauth);

  if (role !== undefined && role !== userauth?.role) {
    dispatch(logout());

    return <Navigate to="/login" replace={true} />;
  }
  if (!token) {
    dispatch(logout());
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }

  return children;
};

export default ProtectedRoute;
