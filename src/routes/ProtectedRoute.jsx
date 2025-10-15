import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext/AuthContext";


export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn === false) {
      navigate("/Fotros/login");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn === false) {
    return null; // مانع از رندر محتوای صفحه قبل از ریدایرکت
  }

  return children;
}
