import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function BackButton({ label = "Back" }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => {
        if (window.history.length > 1) navigate(-1);
        else navigate("/");
      }}
      className="flex items-center gap-2 text-sm sm:text-base px-3 py-1.5 rounded-md 
                 bg-white/5 hover:bg-white/10 
                 text-gray-400 hover:text-white 
                 transition-all duration-200 
                 hover:translate-x-1 active:scale-95"
    >
      <ArrowLeft size={18} />
      {label}
    </button>
  );
}