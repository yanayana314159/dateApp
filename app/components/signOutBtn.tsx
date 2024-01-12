"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { NextPage } from "next";
import { useRouter } from "next/navigation";

const SignOutBtn: NextPage = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <>
      <button onClick={handleSignOut}>ログアウト</button>
    </>
  );
};

export default SignOutBtn;
