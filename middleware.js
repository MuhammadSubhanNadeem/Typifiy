import { NextResponse } from "next/server";

export async function middleware(request) {
  const url = request.nextUrl;
  const error = url.searchParams.get("error");
  const mode = request.cookies.get("oauth_state")?.value;

  if (url.pathname === "/auth/callback") {
    if (mode === "signup") {
      if (error) {
        if (error === "User Already Exist! Please Login") {
          return NextResponse.redirect(
            new URL("/login?error=" + encodeURIComponent(error), request.url)
          );
        } else {
          return NextResponse.redirect(
            new URL("/signup?error=" + encodeURIComponent(error), request.url)
          );
        }
      } else {
        return NextResponse.redirect(
          new URL(
            "/?success=" + encodeURIComponent("Signup Successfully"),
            request.url
          )
        );
      }
    }

    if (mode === "login") {
      if (error) {
        if (error === "User Not Found! Please Signup") {
          return NextResponse.redirect(
            new URL("/signup?error=" + encodeURIComponent(error), request.url)
          );
        } else {
          return NextResponse.redirect(
            new URL("/login?error=" + encodeURIComponent(error), request.url)
          );
        }
      } else {
        return NextResponse.redirect(
          new URL(
            "/?success=" + encodeURIComponent("Login Successfully"),
            request.url
          )
        );
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/callback"],
};
