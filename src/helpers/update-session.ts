import { PROTECTED_PATHS, ROUTING_PATHS } from "@/constants/paths";
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  // This `try/catch` block is only here for the interactive tutorial.
  // Feel free to remove once you have Supabase connected.
  try {
    // Create an unmodified response
    let response = NextResponse.next({
      request: {
        headers: request.headers,
      },
    });

    const supabase = createServerClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value)
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            );
          },
        },
      }
    );

    // This will refresh session if expired - required for Server Components
    // https://supabase.com/docs/guides/auth/server-side/nextjs
    const user = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // 未認証の場合はログインページへリダイレクト
    if (
      (pathname === "/" ||
        PROTECTED_PATHS.some((path) => pathname.startsWith(path))) &&
      user.error
    ) {
      return NextResponse.redirect(
        new URL(ROUTING_PATHS.auth.signin, request.url)
      );
    }

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.next({
      request: {
        headers: request.headers,
      },
    });
  }
};
