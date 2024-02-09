import React from "react";
import Link from "next/link";
import { NextPage } from "next";
import Image from "next/image";

const Home: NextPage = () => {
  return (
    <>
      <body className="bg-green-100">
        <header className="text-gray-600 body-font bg-green-200">
          <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
            <Image
              src="/logo.jpg"
              alt="Sample Image"
              width={30}
              height={60}
              className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
            />
            <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400	flex flex-wrap items-center text-base justify-center">
              <a className="mr-5 hover:text-gray-900">Kibun</a>
            </nav>
          </div>
        </header>

        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-10 border border-black-400">
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
            <br />
            <br />
            <h2>なぜこれを作ったか</h2>
            <br />
            <p>
              デートを日程調整から、店の場所まで全てを完結できたら嬉しいという声を聞いたのでポートフォリオとして作りました。
            </p>
            <br />
            <a
              className="text-blue-500"
              href="https://github.com/yanayana314159/dateApp"
              target="_blank"
            >
              Github
            </a>
          </article>
          <br />
        </div>
      </body>
    </>
  );
};

export default Home;
