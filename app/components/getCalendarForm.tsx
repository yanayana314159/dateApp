export default async function getCalenderBtn() {
  const postBlog = async (
    title: string | undefined,
    description: string | undefined
  ) => {
    const res = await fetch("http://localhost:3000/api/getCalender", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, description }),
    });

    return res.json;
  };
}
