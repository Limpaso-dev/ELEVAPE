import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BackButton from "../components/BackButton";

export default function MainLayout() {
  const location = useLocation();

  // 🔥 Pages where back button makes sense
  const showBackButton = [
    "/cart",
    "/products",
    "/checkout",
    "/orders",
    "/login",
    "/register",
    "/forgot-password",
  ].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-24 sm:pt-28">

        {/* GLOBAL CONTAINER */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 w-full">

          {/* 🔙 BACK BUTTON (CONDITIONAL) */}
          {showBackButton && (
            <div className="mb-4">
              <BackButton />
            </div>
          )}

          <Outlet />
        </div>

      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}