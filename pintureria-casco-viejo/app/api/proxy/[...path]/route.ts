import { auth0 } from '../../../../lib/auth0';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

async function proxy(request: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const pathString = path.join('/');
  
  // Construct the backend URL
  // Assuming backend runs on localhost:8080/api
  let backendUrl = `http://localhost:8080/api/${pathString}`;
  
  // Append query parameters if any
  const searchParams = request.nextUrl.search;
  if (searchParams) {
    backendUrl += searchParams;
  }
  
  const headers = new Headers(request.headers);
  // Remove host header to avoid issues with backend
  headers.delete('host');
  headers.delete('connection');
  
  try {
    const tokenResponse = await auth0.getAccessToken();
    if (tokenResponse?.token) {
      headers.set('Authorization', `Bearer ${tokenResponse.token}`);
    }
  } catch (error) {
    // Ignore error if no session (public routes might still work)
    // console.log('No access token available:', error);
  }

  try {
    const body = request.body; // Pass the stream directly
    
    // Check if body is used (GET/HEAD requests shouldn't have body)
    const options: RequestInit = {
        method: request.method,
        headers: headers,
        // @ts-ignore
        duplex: 'half', // Required for streaming bodies in some Next.js versions/Node
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
        options.body = body;
    }

    const response = await fetch(backendUrl, options);

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Proxy error' }, { status: 500 });
  }
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as DELETE, proxy as PATCH };
