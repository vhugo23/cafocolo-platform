import { NextRequest, NextResponse } from "next/server";

type ProxyContext = {
  params: Promise<{
    path: string[];
  }>;
};

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL;

function getBackendBaseUrl() {
  if (!BACKEND_API_BASE_URL) {
    throw new Error("BACKEND_API_BASE_URL is not configured");
  }

  return BACKEND_API_BASE_URL.replace(/\/$/, "");
}

function buildBackendUrl(path: string[], request: NextRequest) {
  const backendPath = path.join("/");
  const backendUrl = new URL(`${getBackendBaseUrl()}/${backendPath}`);
  backendUrl.search = request.nextUrl.search;
  return backendUrl;
}

function buildForwardHeaders(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.delete("host");
  headers.delete("origin");
  headers.delete("referer");
  headers.delete("connection");
  headers.delete("content-length");
  headers.delete("accept-encoding");

  return headers;
}

function buildResponseHeaders(backendResponse: Response) {
  const headers = new Headers();

  const contentType = backendResponse.headers.get("content-type");
  if (contentType) {
    headers.set("content-type", contentType);
  }

  const setCookie = backendResponse.headers.get("set-cookie");
  if (setCookie) {
    const cookie =
      process.env.NODE_ENV === "production"
        ? setCookie
        : setCookie
            .replace(/;\s*Secure/gi, "")
            .replace(/;\s*SameSite=None/gi, "; SameSite=Lax");

    headers.set("set-cookie", cookie);
  }

  return headers;
}

async function proxyRequest(request: NextRequest, context: ProxyContext) {
  const { path } = await context.params;
  const backendUrl = buildBackendUrl(path, request);

  const body =
    request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.arrayBuffer();

  const backendResponse = await fetch(backendUrl, {
    method: request.method,
    headers: buildForwardHeaders(request),
    body,
    redirect: "manual",
    cache: "no-store",
  });

  const responseBody = await backendResponse.arrayBuffer();

  return new NextResponse(responseBody, {
    status: backendResponse.status,
    statusText: backendResponse.statusText,
    headers: buildResponseHeaders(backendResponse),
  });
}

export async function GET(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function POST(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function PUT(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}

export async function OPTIONS(request: NextRequest, context: ProxyContext) {
  return proxyRequest(request, context);
}