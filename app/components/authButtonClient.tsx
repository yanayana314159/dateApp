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
  const projectBaseUrl = process.env.NEXT_PUBLIC_PROJECT_BASE_URL;

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "https://www.googleapis.com/auth/calendar.readonly",
        redirectTo: `${projectBaseUrl}/api/callback`,
      },
    });
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return session ? (
    <>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleSignOut}
      >
        ログアウト
      </button>
    </>
  ) : (
    <>
      <button
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        onClick={handleSignIn}
      >
        ログイン
      </button>
    </>
  );
};

export default AuthButtonClient;
