import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Check if the PIN matches (Hardcoded to 4321)
    if (body.pin === "4321") {
      const response = NextResponse.json({ success: true });
      
      // THIS IS THE KEY PART: Set the cookie so the browser remembers you
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