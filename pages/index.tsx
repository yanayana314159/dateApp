import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Google() {
  const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON
  );

  return (
    <>
      <div>
        <Head>
          <title>Google認証画面</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <div>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={["google"]}
            />
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
}
