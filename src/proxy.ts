import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request: NextRequest) {
    const session = await auth.api.getSession({
        headers: request.headers,
    });

    if (session) {
        return NextResponse.next();
    }

    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("reason", "protected");
    return NextResponse.redirect(signInUrl);
}

export const config = {
    matcher: ["/profile/:path*"],
};
