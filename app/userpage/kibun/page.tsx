import checkSession from "../../components/checkSession";
import Link from "next/link";
import SearchStores from "../../components/searchStores";

export default async function LoverPage() {
  const {
    data: { session },
  } = await checkSession("/userpage/auth");
  const user_id: string = session.user.id;

  return (
    <>
      <SearchStores />
      <br />

      <br />
      <br />
    </>
  );
}

/*
          <a>あなたのid:{user_id}</a>
          <br />
          <a>恋人として登録されている方の恋人のid:{lovers_lover_id}</a>
        <a>{JSON.stringify(loverProfile)} </a>
        
        */
