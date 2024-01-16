import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database, Json } from "../../../lib/database.types";
import GoogleCalenderform from "../../components/getCalendarForm";
import Link from "next/link";
import AuthButtonServer from "../../components/authButtonServer";

export default async function Page() {
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
        <h2>カレンダーページです</h2>
        <a>
          何も表示されていない場合にはお手数ですが，再度ログインをお願いします．
        </a>
        <br />
        <AuthButtonServer />

        <GoogleCalenderform />
      </div>
    </>
  );
}
