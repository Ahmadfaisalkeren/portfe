import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
    const isAuthenticated = !!localStorage.getItem("access_token");

    // console.log("Is Authenticated:", isAuthenticated);

    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
