import { User, createPagesServerClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";

export default function ProtectedPage({
  user,
  allRepos,
}: {
  user: User;
  allRepos: any;
}) {
  return (
    <>
      <div>Protected content for {user.email}</div>
      <p>Data fetched with provider token:</p>
      <pre>{JSON.stringify(allRepos, null, 2)}</pre>
      <p>user:</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // Create authenticated Supabase Client
  const supabase = createPagesServerClient(ctx);
  // Check if we have a session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };

  // Retrieve provider_token & logged in user's third-party id from metadata
  const { provider_token, user } = session;
  const userId = user.user_metadata.user_name;

  const allRepos = await (
    await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/primary/events`,
      {
        method: "GET",
        headers: {
          Authorization: `token ${provider_token}`,
        },
      }
    )
  ).json();

  return { props: { user, allRepos } };
};

/*import { getServerSession } from "next-auth/next";
import { options } from "../../options";
import { google, calendar_v3 } from "googleapis";
import Calendar = calendar_v3.Calendar;

export default async function Page() {
  // サーバ・コンポーネントでセッションを取得する。
  const session = await getServerSession(options);
  const user = session?.user;

  // Google OAuthへの接続
  const oauth2Client = new google.auth.OAuth2({
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    // GCPコンソールで設定したredirect URI
    redirectUri: "http://localhost:3000/googlecalendar",
  });

  const accessToken = user?.accessToken; // Googleが払い出したアクセストークン
  if (!accessToken) {
    return <div>accessToken is null</div>;
  }

  // トークンを設定。refresh_tokenも渡せます。
  oauth2Client.setCredentials({ access_token: accessToken });

  // カレンダーオブジェクト作成
  const calendar: Calendar = google.calendar({
    version: "v3",
    auth: oauth2Client,
  });

  // カレンダー一覧を取得
  const calendarResponse = await calendar.calendarList.list();

  console.log(calendarResponse.data);

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <div>
        <div>よしなにレンダリング。calendarResponse.data</div>
      </div>
    </main>
  );
}


*/
