import { redirect, useRouter } from "next/navigation";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function checkSession(URL: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) {
    //セッションがない場合にはauthに飛びます.展望：このセッションを切り出して使えるようにする．
    redirect(URL);
  } else {
    return { data: { session } };
  }
}
