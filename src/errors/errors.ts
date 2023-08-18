export class AuthenticationError extends Error {
  constructor(message?: string) {
    super("Authentication error" + (message ? `: ${message}` : ""));
  }
}
