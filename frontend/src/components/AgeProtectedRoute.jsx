// import { Navigate, useLocation } from "react-router-dom";

// export default function AgeProtectedRoute({ children }) {
//   const isVerified = localStorage.getItem("ageVerified");
//   const location = useLocation();

//   // ❌ Prevent redirect loop
//   if (!isVerified && location.pathname !== "/age") {
//     return <Navigate to="/age" />;
//   }

//   return children;
// }