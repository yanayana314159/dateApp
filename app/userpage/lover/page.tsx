import checkSession from "../../components/checkSession";
import Link from "next/link";
import FormComponent from "../../components/inputForm";

const getProfiles = async (id: string) => {
  const projectBaseUrl = process.env.NEXT_PUBLIC_PROJECT_BASE_URL;
  const res = await fetch(`${projectBaseUrl}/api/lover/${id}`);
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

  const { uuid, name, email, lover_id, schedule } = userProfile;
  const lover_email = loverProfile?.email.replace(/"/g, "");

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-10 border border-black-400">
        <div>
          <h2>2.恋人の情報の登録</h2>
          <a>恋人の情報を登録したら「次へ」を押してください</a> <br />
          <a>既に登録されている場合にはそのまま「次へ」を押してください</a>
          <br />
          <Link className="" href="/userpage/makeplans">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              次へ
            </button>
          </Link>
          <br />
          <br />
          <a>
            {lover_email == null
              ? "恋人のメールアドレス情報を登録してください"
              : "恋人のメールアドレス情報を変更できます"}
          </a>
          {lover_id == null ? (
            ""
          ) : (
            <>
              <br />
              あなたの恋人として設定されているメールアドレス：{lover_email}
            </>
          )}
          <a></a>
        </div>
        <FormComponent
          email={email}
          lover_email={lover_email}
          user_id={user_id}
        />

        <Link href="/userpage/home">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            ホームに戻る
          </button>
        </Link>
        <Link href="/userpage/calendar">
          <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
            1.カレンダーに戻る
          </button>
        </Link>
      </div>
    </>
  );
}
/*
      <a>{JSON.stringify(userProfile)}</a>
      */
