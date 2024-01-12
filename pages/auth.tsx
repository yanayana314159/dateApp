import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import { supabase } from "../utils/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Google() {
  const router = useRouter();

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

  return (
    <>
      <header>dateApp</header>
      <div>
        <a>google認証を推奨します</a>
      </div>
      <div>
        <main>
          <div>
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
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
}
