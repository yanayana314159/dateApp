"use client";
import React, { useState } from "react";

export default function SearchStores() {
  const radioclass: string =
    "inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer white:hover:text-gray-300 white:border-gray-700 white:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 white:text-gray-400 white:bg-gray-800 white:hover:bg-gray-700";
  const [kibun, setKibun] = useState("");
  const [located, setLocated] = useState("");

  const search = () => {
    if (kibun === "" || located === "") {
      console.log("気分と場所を選択してください");
    } else {
      console.log(`${kibun}で${located}`);
    }
  };
  const handleKibunChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setKibun(event.target.value);
  };
  const hadleLocatedChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setLocated(event.target.value);
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 m-10 border border-black-400">
      <div>
        <h2>気分から予定を作成する</h2>
        <br />
        <a className="text-xl">どんな気分ですか？</a>
        <ul className="grid w-full gap-6 md:grid-cols-4 mt-5 mb-5">
          <li>
            <input
              type="radio"
              id="kibun-funny"
              name="kibun"
              value="1"
              className="hidden peer"
              checked={kibun === "1"}
              onChange={handleKibunChange}
              required
            />
            <label htmlFor="kibun-funny" className={radioclass}>
              <div className="block">
                <div className="w-full text-lg font-semibold">ワイワイ</div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="kibun-calm"
              name="kibun"
              value="2"
              checked={kibun === "2"}
              onChange={handleKibunChange}
              className="hidden peer"
            />
            <label htmlFor="kibun-calm" className={radioclass}>
              <div className="block">
                <div className="w-full text-lg font-semibold">ゆっくり</div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="kibun-gorgeous"
              name="kibun"
              value="3"
              checked={kibun === "3"}
              onChange={handleKibunChange}
              className="hidden peer"
            />
            <label htmlFor="kibun-gorgeous" className={radioclass}>
              <div className="block">
                <div className="w-full text-lg font-semibold">ゴージャス</div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="kibun-romantic"
              name="kibun"
              value="4"
              checked={kibun === "4"}
              onChange={handleKibunChange}
              className="hidden peer"
            />
            <label htmlFor="kibun-romantic" className={radioclass}>
              <div className="block">
                <div className="w-full text-lg font-semibold">ロマンチック</div>
              </div>
            </label>
          </li>
        </ul>
        <a className="text-xl">場所を選択してください</a>
        <ul className="grid w-full gap-6 md:grid-cols-4 mt-5">
          <li>
            <input
              type="radio"
              id="located-sibuya"
              name="located"
              value="渋谷"
              checked={located === "渋谷"}
              className="hidden peer"
              onChange={hadleLocatedChange}
              required
            />
            <label htmlFor="located-sibuya" className={radioclass}>
              <div className="block">
                <div className="w-full text-lg font-semibold">渋谷</div>
              </div>
            </label>
          </li>
          <li>
            <input
              type="radio"
              id="located-ueno"
              name="located"
              value="上野"
              checked={located === "上野"}
              className="hidden peer"
              onChange={hadleLocatedChange}
            />
            <label htmlFor="located-ueno" className={radioclass}>
              <div className="block">
                <div className="w-full text-lg font-semibold">上野</div>
              </div>
            </label>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center">
        <button
          onClick={search}
          className="bg-white  justify-center mt-8 hover:bg-gray-100 text-gray-800 font-semibold py-2 px-10 border border-gray-400 rounded shadow"
        >
          検索
        </button>
      </div>
    </div>
  );
}
