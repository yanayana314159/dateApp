"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

const AuthButton: React.FC = () => {
  const supabase = createClientComponentClient();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/api/callback",
      },
    });
  };

  return (
    <>
      <button onClick={handleSignIn}>Login</button>
    </>
  );
};

export default AuthButton;
