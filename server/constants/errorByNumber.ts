export interface ErrorDetail {
  status: number;
  message: string;
}

export const ErrorByNumber: Record<number, ErrorDetail> = {
  400: { status: 400, message: "Bad Request" },
  401: { status: 401, message: "Unauthorized" },
  403: { status: 403, message: "Forbidden" },
  404: { status: 404, message: "Not Found" },
  409: { status: 409, message: "Conflict" },
  500: { status: 500, message: "Internal Server Error" },
  502: { status: 502, message: "Bad Gateway" },
};
