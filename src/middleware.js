import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;

  // public path = /signup, /login
  const isPublicPath = path === "/signup" || path === "/login";

  const token = req.cookies.get("token")?.value || "";

  // if we are login (means we have token) and also trying to visit public path, then we should redirect to / or /profile page
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  // if we are not login (means we have not token also) and trying to vist paths which required authentication or not public path then we should redirect to "/login"

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/", "/signup", "/login", "/profile", "/profile/:id*"],
};
