"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { set } from "zod";
import { json } from "stream/consumers";

type Props = {
  email: string;
  lover_email: string;
  user_id: string;
};
//フォーム送信用のデータ型
type FormData = {
  lover_email: string;
};

export default function FormComponent(props: Props) {
  const router = useRouter();
  const email = props.email;
  const [lover_email, setLover_email] = useState(props.lover_email);
  const user_id = props.user_id;
  const [sendBtn, setSendBtn] = useState(lover_email ? "変更" : "登録");
  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    router.refresh();
  }, [lover_email]);

  const postLoverID = async (data: FormData) => {
    const res = await fetch(`http://localhost:3000/api/lover/${user_id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
  };
  const deleteLoverID = async () => {
    const res = await fetch(`http://localhost:3000/api/lover/${user_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await res.json();
    console.log(result);
  };

  //恋人のemailをDBに送信する処理
  const onSubmit = async (data: FormData) => {
    if (data.lover_email == email.replace(/[\"]/g, "")) {
      alert("自分のメールアドレスは登録できません");
    } else if (data.lover_email == lover_email) {
      alert("現在登録中のメールアドレスです");
    } else {
      toast.loading("投稿中です", { id: "1" });
      await postLoverID(data);
      setLover_email(data.lover_email);
      toast.success("投稿に成功しました", { id: "1" });
      router.refresh();
    }
  };
  //恋人のemailをDBで削除する処理
  const handleDelete = async () => {
    toast.loading("削除中です", { id: "1" });
    await deleteLoverID();
    toast.success("削除に成功しました", { id: "1" });
    setLover_email("");
    resetField("lover_email");
    router.refresh();
  };

  return (
    <div className="w-full max-w-xl der m-8">
      <Toaster />

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8  border border-black-400"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">
          恋人のメールアドレス
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 m-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          defaultValue={lover_email}
          {...register("lover_email", {
            required: true,
            pattern: /\S+@\S+\.\S+/,
          })}
        />
        {/* errors will return when field validation fails  */}
        {errors.lover_email && (
          <>
            <br />
            <span>メールアドレスを入力してください</span>
          </>
        )}
        <br />
        <input
          className="text-blue-700 m-2 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
          type="submit"
          value={sendBtn}
        />
      </form>
      <br />
      {lover_email != null && lover_email != "" && (
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8  border border-black-400"
          onSubmit={handleSubmit(handleDelete)}
        >
          <a>恋人のメールアドレスを削除しますか？</a>
          <br />
          <input
            className="text-red-700 m-2 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-500 dark:focus:ring-red-800"
            type="submit"
            value="削除"
          />
        </form>
      )}
    </div>
  );
}
