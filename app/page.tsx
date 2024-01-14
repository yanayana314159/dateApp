import React from "react";
import Link from "next/link";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <header>dateApp</header>
      <div>
        <p>デートアプリのホーム画面です</p>
        <br />
        <Link href="/userpage/auth">ログインはこちらから</Link> <br />
        <a>Googleアカウントでのログインになります。</a>
        <h2>なぜこれを作ったか</h2>
        <p>
          デートを日程調整から、店の場所まで全てを完結できたら嬉しいという声を聞いたのでポートフォリオとして作りました。
        </p>
        <a href="https://github.com/yanayana314159/dateApp" target="_blank">
          Github
        </a>
        <br />
      </div>
    </>
  );
};

export default Home;
