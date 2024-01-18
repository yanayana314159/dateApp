import React, { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "../../components/authButtonServer";
import { string } from "zod";
import { Database } from "../../../lib/database.types";
import Link from "next/link";
import checkSession from "../../components/checkSession";

export default async function Home() {
  const {
    data: { session },
  } = await checkSession("/userpage/auth");
  const name = JSON.stringify(session.user.user_metadata.full_name);
  return (
    <>
      <header>dateApp</header>

      <div>
        <h2>認証済みのログインページです</h2>
        <a>ようこそ{name}さん</a>
        <br />

        <p>デートアプリのログイン後のホーム画面です</p>
        <Link href="/userpage/calendar">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            カレンダーページはこちら
          </button>
        </Link>
        <br />
        <Link href="/userpage/lover">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            恋人の情報はこちら
          </button>
        </Link>
        <br />
        <AuthButtonServer />
      </div>
    </>
  );
}
