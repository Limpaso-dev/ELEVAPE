import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-dark text-white">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-28 px-6 md:px-16 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}