import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../../components/authButtonServer";
import { string } from "zod";
import { Database } from "../../../lib/database.types";
import Link from "next/link";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    //セッションがない場合にはauthに飛びます.展望：このセッションを切り出して使えるようにする．
    redirect("/userpage/auth");
  }

  return (
    <>
      <header>dateApp</header>

      <div>
        <h2>認証済みのログインページです</h2>
        <AuthButtonServer />
        <p>デートアプリのログイン後のホーム画面です</p>
        <Link href="/userpage/googlecalendar">カレンダーページはこちら</Link>
      </div>
    </>
  );
}
