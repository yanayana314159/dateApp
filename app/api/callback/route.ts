import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const projectBaseUrl = process.env.NEXT_PUBLIC_PROJECT_BASE_URL;
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
  }
  alert(projectBaseUrl)
  return NextResponse.redirect(`https://date-app-opal.vercel.app/userpage/home`);
}
