import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/zustand/authStore";
const ProtectedRoute = ({ children }) => {
    const { fetchUser,isAuthenticated } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            fetchUser();
        }
    }, [isAuthenticated, fetchUser]);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }

    if (!isAuthenticated) {
        navigate("/");
        return null;
    }

    return children;
};

export default ProtectedRoute;
