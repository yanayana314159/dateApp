import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const projectBaseUrl = request.url.split("/api")[0];
  const code = requestUrl.searchParams.get("code");
  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(`${projectBaseUrl}/userpage/home`);
  }
  return NextResponse.redirect(`${projectBaseUrl}`);
}
