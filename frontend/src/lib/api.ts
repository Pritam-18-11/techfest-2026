const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export class ApiRequestError extends Error {
  status: number;
  details?: Array<{ field: string; message: string }>;

  constructor(message: string, status: number, details?: Array<{ field: string; message: string }>) {
    super(message);
    this.name = "ApiRequestError";
    this.status = status;
    this.details = details;
  }
}

type ApiEnvelope<T> = {
  success: boolean;
  message?: string;
  count?: number;
  data: T;
  details?: Array<{ field: string; message: string }>;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiEnvelope<T>> {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  let body: ApiEnvelope<T>;
  try {
    body = await res.json();
  } catch {
    throw new ApiRequestError("The server returned an unexpected response.", res.status);
  }

  if (!res.ok || !body.success) {
    throw new ApiRequestError(
      body.message || "Something went wrong. Please try again.",
      res.status,
      body.details
    );
  }

  return body;
}

export const api = {
  get: <T>(path: string) => request<T>(path, { method: "GET" }),
  post: <T>(path: string, data: unknown) =>
    request<T>(path, { method: "POST", body: JSON.stringify(data) }),
  patch: <T>(path: string, data: unknown) =>
    request<T>(path, { method: "PATCH", body: JSON.stringify(data) }),
  delete: <T>(path: string) => request<T>(path, { method: "DELETE" }),
};