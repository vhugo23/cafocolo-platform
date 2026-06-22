import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    path: string[];
  }>;
};

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL;

function getBackendApiBaseUrl() {
  if (!BACKEND_API_BASE_URL) {
    throw new Error("BACKEND_API_BASE_URL is not configured");
  }

  return BACKEND_API_BASE_URL;
}

async function proxyRequest(request: NextRequest, context: RouteContext) {
  const { path } = await context.params;

  const targetUrl = new URL(
    `/${path.join("/")}${request.nextUrl.search}`,
    getBackendApiBaseUrl()
  );

  const requestHeaders = new Headers(request.headers);

  /*
   * These headers belong to the frontend request and should not be forwarded
   * to the backend service.
   */
  requestHeaders.delete("host");
  requestHeaders.delete("connection");
  requestHeaders.delete("content-length");
  requestHeaders.delete("accept-encoding");

  const hasBody = request.method !== "GET" && request.method !== "HEAD";

  const backendResponse = await fetch(targetUrl, {
    method: request.method,
    headers: requestHeaders,
    body: hasBody ? await request.arrayBuffer() : undefined,
    redirect: "manual",
    cache: "no-store",
  });

  const responseHeaders = new Headers();

  backendResponse.headers.forEach((value, key) => {
    const lowerKey = key.toLowerCase();

    if (
      lowerKey === "content-length" ||
      lowerKey === "content-encoding" ||
      lowerKey === "transfer-encoding" ||
      lowerKey === "connection"
    ) {
      return;
    }

    responseHeaders.set(key, value);
  });

  /*
   * Local development runs on http://localhost:3000.
   * Production runs on HTTPS.
   *
   * Render currently returns Secure cookies for production.
   * Browsers will not keep Secure cookies from a plain HTTP localhost response,
   * so in development only, remove Secure and make SameSite local-friendly.
   */
  const setCookieHeader = backendResponse.headers.get("set-cookie");

  if (setCookieHeader && process.env.NODE_ENV !== "production") {
    const localCookie = setCookieHeader
      .replace(/;\s*Secure/gi, "")
      .replace(/SameSite=None/gi, "SameSite=Lax");

    responseHeaders.set("set-cookie", localCookie);
  }

  return new NextResponse(backendResponse.body, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: responseHeaders,
  });
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function OPTIONS(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}