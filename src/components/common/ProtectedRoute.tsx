"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  roleRequired?: "employee" | "employer" | null; // null means any authenticated user
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  roleRequired = null 
}) => {
  const { isAuthenticated, isLoading, user, checkAuth } = useAuth();
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const verifyAuth = async () => {
      setIsChecking(true);
      const isAuth = await checkAuth();
      
      if (!isAuth) {
        router.push("/login?mode=login");
      } else if (roleRequired && user?.role !== roleRequired) {
        // Redirect based on role if user doesn't have required role
        if (user?.role === "employee") {
          router.push("/employeeDashboard");
        } else {
          router.push("/employerDashboard");
        }
      }
      
      setIsChecking(false);
    };

    verifyAuth();
  }, [checkAuth, isAuthenticated, router, roleRequired, user]);

  // Show loading state while checking authentication
  if (isLoading || isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0B0D15] text-white">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#93c5fd] border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
        <p className="ml-4 text-gray-400">Loading...</p>
      </div>
    );
  }

  // If not authenticated, the effect will handle redirect
  if (!isAuthenticated) {
    return null;
  }

  // If role required and user doesn't have the role, effect will handle redirect
  if (roleRequired && user?.role !== roleRequired) {
    return null;
  }

  // Otherwise, render the protected content
  return <>{children}</>;
};

export default ProtectedRoute;