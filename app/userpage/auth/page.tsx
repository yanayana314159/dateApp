import { cookies } from "next/headers";
import AuthButtonServer from "../../components/authButtonServer";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { Database } from "../../../lib/database.types";

export default async function Google() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    //セッションがあればhomeに飛びます
    redirect("/userpage/home");
  }

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-10 border border-black-400">
        <h2>ログインページです</h2>
        <a>googleアカウントでログインを行なってください</a>
      </div>
    </>
  );
}
