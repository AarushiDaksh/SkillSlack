// src/middleware.ts
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const middleware = clerkMiddleware((auth, req) => {

  return NextResponse.next();
});

export const config = {
  publicRoutes: ["/", "/sign-in", "/sign-up", "/splash"],
  matcher: [
    "/((?!_next|.*\\..*).*)", // Match except static files
  ],
};
