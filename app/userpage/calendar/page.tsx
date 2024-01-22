import React, { useEffect, useState } from "react";
import GetCalendarForm from "../../components/getCalendarForm";
import Link from "next/link";
import checkSession from "../../components/checkSession";

export default async function Page() {
  const {
    data: { session },
  } = await checkSession("/userpage/auth"); //sessionの確認
  const user_id: string = session.user.id;
  return (
    <>
      <header>dateApp</header>

      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-10 border border-black-400">
        <h2>1.カレンダーの登録</h2>
        <a>
          カレンダー情報がページに記載されている場合には「次へ」を押してください
        </a>
        <br />
        <Link href="/userpage/lover">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            次へ
          </button>
        </Link>
        <br />
        <GetCalendarForm user_id={user_id} />

        <br />
        <Link href="/userpage/home">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            ホームに戻る
          </button>
        </Link>
      </div>
    </>
  );
}
