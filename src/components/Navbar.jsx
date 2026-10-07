import { Link, useNavigate } from "react-router-dom";
import { HeartPulse, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-gray-200 bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold text-gray-900"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
            <HeartPulse className="h-5 w-5" aria-hidden="true" />
          </span>
          Swasth<span className="text-teal-500">ID</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="hidden px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 sm:inline"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="hidden px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600 sm:inline"
              >
                My Profile
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="btn-secondary !px-4 !py-2"
              >
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-3 py-2 text-sm font-semibold text-gray-700 hover:text-blue-600"
              >
                Login
              </Link>
              <Link to="/register" className="btn-primary !px-4 !py-2">
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
