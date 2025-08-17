import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(`${process.env.SERVER_URL}/user/getTop/tracks`, {
      method: 'GET',
      headers: {
        Cookie: cookies().toString(),
      },
    });
    const json = await res.json();
    return NextResponse.json(json, { status: json.status });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown Internal Error';
    return NextResponse.json(
      { success: false, message, status: 500, data: null },
      { status: 500 }
    );
  }
}
