import { Navigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const decodedToken = parseJwt(token);

  if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
    return <Navigate to="/login" replace />;
  }

  return children;
}