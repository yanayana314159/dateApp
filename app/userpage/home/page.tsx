import React, { useEffect } from "react";
import Link from "next/link";
import { SupabaseClient, createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import SignOutBtn from "../../components/signOutBtn";

export default function Home() {
  /*
  const supabase: SupabaseClient = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON!
  );

  const router = useRouter();
 
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: session } = await supabase.auth.getSession();
        if (!session) {
          // ログインされていない場合、ログインページにリダイレクト
          await router.push("/auth");
        }
      } catch (error) {
        console.error("Error checking session:", error);
      }
    };

    checkSession();
  }, [supabase, router]);
*/
  return (
    <>
      <header>dateApp</header>

      <div>
        <SignOutBtn />
        <p>デートアプリのログイン後のホーム画面です</p>
      </div>
    </>
  );
}
