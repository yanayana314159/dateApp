import checkSession from "../../components/checkSession";
import Link from "next/link";
import ScheduleAdjustment from "../../components/scheduleAdjustment";

const getProfiles = async (id: string) => {
  const res = await fetch(`http://localhost:3000/api/lover/${id}`);
  if (!res.ok) {
    throw new Error("API request failed");
  }
  const data = await res.json();
  const userProfile = data.profile;
  const loverProfile = data.lover_profile;
  return { userProfile, loverProfile };
};

export default async function LoverPage() {
  const {
    data: { session },
  } = await checkSession("/userpage/auth");
  const user_id: string = session.user.id;
  const { userProfile, loverProfile } = await getProfiles(user_id);

  const user_schedule = userProfile.schedule;
  const lover_schedule = loverProfile.schedule;

  const lover_email = loverProfile?.email.replace(/"/g, "");
  const lovers_lover_id = loverProfile?.lover_id;

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-10 border border-black-400">
        <div>
          <h2>3.予定の作成</h2>
          <br />
        </div>
        {lovers_lover_id === user_id ? (
          <>
            <a>2人が恋人同士であることは認証されています。</a>
            <br />
            <ScheduleAdjustment
              user_schedule={user_schedule}
              lover_schedule={lover_schedule}
            />
            <br />
          </>
        ) : (
          <>
            <a>恋人同士である認証が取れていません。</a> <br />
            <ul className="list-disc m-8">
              <a>解決策</a>
              <br />
              <li>
                恋人として設定しているメールアドレス 「{lover_email}」
                は正しいですか？
              </li>
              <li>お互いのメールアドレスは一致していますか？</li>
              <li>恋人が設定しているメールアドレスはあなたのものですか？</li>
            </ul>
            <br />
            <br />
          </>
        )}
        <br />
        <Link href="/userpage/home">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            ホームに戻る
          </button>
        </Link>
        <Link href="/userpage/lover">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            2.恋人の設定に戻る
          </button>
        </Link>

        <br />
        <br />
      </div>
    </>
  );
}

/*
          <a>あなたのid:{user_id}</a>
          <br />
          <a>恋人として登録されている方の恋人のid:{lovers_lover_id}</a>
        <a>{JSON.stringify(loverProfile)} </a>
          */
