import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.pin === "4321") {
      const response = NextResponse.json({ success: true });
      
      // Set the cookie
      response.cookies.set("admin_session", "true", {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
      });
      
      return response;
    }

    return NextResponse.json({ error: "Incorrect PIN" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}