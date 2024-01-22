import React from "react";
import Link from "next/link";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <header>dateApp</header>
      <div>
        <article className="prose-gray">
          <p>デートアプリのホーム画面です</p>
          <br />
          <Link className="text-sm hover:text-gray-600" href="/userpage/auth">
            <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
              ログインはこちら
            </button>
          </Link>{" "}
          <br />
          <a>Googleアカウントでのログインになります。</a>
          <h2>なぜこれを作ったか</h2>
          <p>
            デートを日程調整から、店の場所まで全てを完結できたら嬉しいという声を聞いたのでポートフォリオとして作りました。
          </p>
          <a href="https://github.com/yanayana314159/dateApp" target="_blank">
            Github
          </a>
        </article>
        <br />
      </div>
    </>
  );
};

export default Home;
