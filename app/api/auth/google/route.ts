import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }

    // Verify the token with Google
    const googleResponse = await fetch(
      "https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=" + token,
      {
        method: "GET",
      }
    );

    if (!googleResponse.ok) {
      return NextResponse.json(
        { message: "Invalid Google token" },
        { status: 401 }
      );
    }

    const googleData = await googleResponse.json();

    // Create or update user in backend
    const backendResponse = await fetch("http://localhost:5000/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: googleData.email,
        name: googleData.name,
        googleId: googleData.sub,
      }),
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      return NextResponse.json(errorData, { status: backendResponse.status });
    }

    const userData = await backendResponse.json();

    // Set httpOnly cookie
    const response = NextResponse.json(userData, { status: 200 });
    const setCookieHeader = backendResponse.headers.get("set-cookie");
    if (setCookieHeader) {
      response.headers.set("set-cookie", setCookieHeader);
    }

    return response;
  } catch (error) {
    console.error("Google auth error:", error);
    return NextResponse.json(
      { message: "Authentication failed" },
      { status: 500 }
    );
  }
}
