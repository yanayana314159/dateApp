import Head from "next/head";
import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";

export default function Google() {
  const supabase = createClient(
    "https://scvsimrzjioiydddawjt.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNjdnNpbXJ6amlvaXlkZGRhd2p0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDM4MzIyMDIsImV4cCI6MjAxOTQwODIwMn0.l5o-pXxG9Q_DDpfOaUwpe8AFQQ6BCzPnWcCzd5Jnisg"
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
            <Auth supabaseClient={supabase} providers={["google"]} />
          </div>
        </main>
        <footer></footer>
      </div>
    </>
  );
}
