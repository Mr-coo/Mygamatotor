import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute() {
  if (localStorage.getItem("access_token_mygamatoto") == null) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export function GuestRoute() {
  if (localStorage.getItem("access_token_mygamatoto") != null) {
    return <Navigate to="/game-menu" replace />;
  }

  return <Outlet />;
}