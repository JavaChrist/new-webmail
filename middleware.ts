import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/config/firebaseAdmin";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value || null;

  if (!token) {
    // 🔥 Redirige vers `/login` si l'utilisateur n'est pas connecté
    if (req.nextUrl.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    await adminAuth.verifyIdToken(token);

    // 🔥 Si l'utilisateur est déjà connecté et qu'il va sur `/login`, on le redirige vers `/emails`
    if (req.nextUrl.pathname === "/login") {
      return NextResponse.redirect(new URL("/emails", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// ✅ Protéger aussi `/`
export const config = {
  matcher: ["/", "/emails", "/contacts", "/calendar"],
};
