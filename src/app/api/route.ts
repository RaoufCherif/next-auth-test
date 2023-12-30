import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from './auth/[...nextauth]/route'
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const session = await getServerSession(authOptions);
    if (!session){
        return new NextResponse(JSON.stringify({error: "UNAUTHORIZED ! "}),
       { status: 401}
        )
    }
    console.log('GET API', session)
  return NextResponse.json({authentificated: !!session})
}

