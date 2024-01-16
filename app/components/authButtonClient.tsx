"use client";

import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React from "react";
import { useRouter } from "next/navigation";

const AuthButtonClient = ({ session }: { session: Session | null }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar.readonly",
        redirectTo: "http://localhost:3000/api/callback",
      },
    });
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return session ? (
    <>
      <button onClick={handleSignOut}>Googleログアウト</button>
    </>
  ) : (
    <>
      <button onClick={handleSignIn}>Googleログイン</button>
    </>
  );
};

export default AuthButtonClient;
