export class AuthenticationError extends Error {
  constructor(message?: string) {
    super("Authentication error" + (message ? `: ${message}` : ""));
  }
}
export class QuotaError extends Error {
  constructor(message?: string) {
    super("Quota error" + (message ? `: ${message}` : ""));
  }
}
