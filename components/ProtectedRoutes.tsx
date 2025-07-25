import { useAuth } from "@/context/AuthContext";
import AuthForms from "./AuthForms";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode; // Define children prop as ReactNode type
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForms />;
  }

  return children;
};

export default ProtectedRoute;
