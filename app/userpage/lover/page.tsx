import checkSession from "../../components/checkSession";
import { redirect, useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Link from "next/link";

const getProfiles = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/lover/${id}`);
  if (!res.ok) {
    throw new Error("API request failed");
  }
  const data = await res.json();
  const userProfile = data.profile;
  const Lover = data.lover;
  return { userProfile, Lover };
};

export default async function LoverPage() {
  const {
    data: { session },
  } = await checkSession("/userpage/auth");
  const user_id: string = session.user.id;
  const { userProfile, Lover } = await getProfiles(user_id);

  const { uuid, name, email, lover_id, schedule } = userProfile;

  return (
    <>
      <div>恋人の情報を入力してください</div>
      <a>{Lover ? `${Lover}さん` : "恋人情報を記載してください"}</a>
      <br />
      <br />

      <Link href="/userpage/home">
        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
          ホームに戻る
        </button>
      </Link>
    </>
  );
}
/*
      <a>{JSON.stringify(userProfile)}</a>
      */
