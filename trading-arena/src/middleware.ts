import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const allowedAdminEmail = process.env.ADMIN_EMAIL?.toLowerCase();

  if (!supabaseUrl?.startsWith('http') || !supabaseAnonKey || supabaseAnonKey === 'your_anon_key') {
    return supabaseResponse;
  }

  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        },
      },
    }
  );
  const { data: { user } } = await supabase.auth.getUser();
  
  // Public routes keep the no-login competition discovery and join flow open.
  const protectedPaths = ['/dashboard', '/profile'];
  const isProtected = protectedPaths.some(p => request.nextUrl.pathname.startsWith(p));
  if (!user && isProtected) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Protect Wilson surfaces with both a private route and one allowed email.
  const isWilsonRoute = request.nextUrl.pathname.startsWith('/wilson');
  const isWilsonApiRoute = request.nextUrl.pathname.startsWith('/api/wilson');

  if (isWilsonRoute || isWilsonApiRoute) {
    if (!user) {
      if (isWilsonApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      return NextResponse.redirect(new URL('/login', request.url));
    }

    const emailAllowed = !!allowedAdminEmail && user.email?.toLowerCase() === allowedAdminEmail;
    const { data: profile } = await supabase.from('profiles').select('is_admin').eq('id', user.id).single();

    if (!emailAllowed || !profile?.is_admin) {
      if (isWilsonApiRoute) {
        return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
      }

      return NextResponse.redirect(new URL('/join', request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/webhooks|$).*)'],
};
