import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";

/*
export async function GET(request: NextRequest) {
  console.log("GETメソッド開始です");
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  console.log(`codeは${code}です`);
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  console.log("GETメソッド終了です");
  return NextResponse.redirect("http://localhost:3000/userpage/home");
}
*/

export async function GET(request: NextRequest) {
  console.log("GETメソッド開始です");
  alert("GETが叩かれたよ");
}
