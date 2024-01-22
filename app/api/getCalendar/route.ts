import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Google APIを呼び出すコードを追加する
  const supabase = createServerComponentClient({ cookies });
  const session = await supabase.auth.getSession();

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events"
  );
  const data = await response.json();

  return NextResponse.json({ message: "Success", data }, { status: 200 });
}
