"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

const AuthButton: React.FC = () => {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.SUPABASE_URL,
    supabaseKey: process.env.SUPABASE_ANON,
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

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
      <button onClick={handleSignOut}>Logout</button>
    </>
  );
};

export default AuthButton;
