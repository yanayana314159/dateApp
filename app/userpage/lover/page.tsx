import checkSession from "../../components/checkSession";
import Link from "next/link";
import FormComponent from "../../components/inputForm";

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

  const { uuid, name, email, lover_id, schedule } = userProfile;
  const lover_email = loverProfile?.email.replace(/"/g, "");

  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-10 border border-black-400">
        <div>
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
        <br />
        <br />
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
      </div>
    </>
  );
}
/*
      <a>{JSON.stringify(userProfile)}</a>
      */
