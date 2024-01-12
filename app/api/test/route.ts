import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  console.log("GETメソッド開始です");
  return NextResponse.json({ message: "This is a test endpoint" });
};
