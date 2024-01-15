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
      <header>dateApp</header>
      <div>
        <h2>ログインページです</h2>
        <a>googleアカウントでログインを行なってください</a>
      </div>
      <div>
        <main>
          <div>
            <AuthButtonServer />
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
}

/*
まずはgoogle認証のみで作成してみる
今後の展望としてメールでのログイン機能を追加したい
useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_IN" && session) {
          router.push("/userpage/home");
        }
      }
    );

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, [router, supabase]);

<Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
              redirectTo="http://localhost:3000/userpage/home"
              //後で変更
              localization={{
                variables: {
                  sign_in: {
                    email_label: "メールアドレス",
                    password_label: "パスワード",
                    button_label: "ログイン",
                    link_text: "アカウントをすでにお持ちの方はこちら",
                  },
                  forgotten_password: {
                    email_label: "メールアドレス",
                    link_text: "パスワードを忘れた方はこちら",
                    button_label: "パスワードをリセットする",
                  },
                  sign_up: {
                    email_label: "メールアドレス",
                    password_label: "パスワード",
                    confirmation_text:
                      "メールが送信されました．メール内のリンクをクリックしてください．",
                    button_label: "サインアップ",
                    link_text: "アカウントをお持ちでない方はこちら",
                  },
                },
              }}
            />
*/
