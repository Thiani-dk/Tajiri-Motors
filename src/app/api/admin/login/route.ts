import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

// Create a server-side supabase client for this route
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  try {
    const { pin } = await request.json();

    // 1. Fetch the real PIN from the database
    const { data } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'admin_pin')
      .single();

    const correctPin = data?.value || '4321'; // Fallback to 4321 if missing

    // 2. Check if the PIN matches
    if (pin !== correctPin) {
      return NextResponse.json({ success: false, message: 'Invalid PIN' }, { status: 401 });
    }

    // 3. Set a secure "HttpOnly" cookie (This is the "Session Pass")
    // This cookie cannot be edited by browser JavaScript, making it very secure.
    const cookieStore = await cookies();
    cookieStore.set('admin_session', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24, // Login lasts 24 hours
      path: '/',
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ success: false, message: 'Server Error' }, { status: 500 });
  }
}