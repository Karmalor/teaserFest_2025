"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { openSignIn, openSignUp } = useClerk();
  const { user, isLoaded } = useUser(); // `isLoaded` ensures `user` has loaded

  useEffect(() => {
    // Ensure this only runs on the client side, and only if the user data is loaded
    if (typeof window !== "undefined" && isLoaded && !user) {
      // Store the current path in sessionStorage for redirection after sign-in
      sessionStorage.setItem("previousUrl", window.location.pathname);

      // Open the sign-in modal with redirect to previous page after successful sign-in
      openSignUp({
        redirectUrl: sessionStorage.getItem("previousUrl") || "/dashboard",
      });
    }
  }, [isLoaded, user, openSignIn]);

  return (
    <div>
      {user ? (
        children // Display children if user is signed in
      ) : (
        // Placeholder content while checking user state or during redirection
        <h1 className="text-xl m-8">Loading...</h1>
      )}
    </div>
  );
};

export default Layout;
