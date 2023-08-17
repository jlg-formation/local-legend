import { AuthenticationError } from "./errors/errors";
import { TokenObject } from "./interfaces/TokenObject";

const url = "https://www.strava.com/api/v3";

class StravaApi {
  tokenObject: TokenObject | undefined;

  async fetch(url: string, options?: RequestInit) {
    if (!this.tokenObject) {
      throw new AuthenticationError();
    }
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.tokenObject.access_token}`,
      },
    });
    return response;
  }

  async getTokenObject(authorizationCode: string): Promise<TokenObject> {
    const response = await fetch(url + `/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: 97719,
        client_secret: "6e91c19ab727fa6f" + "edc51d1c39860dd68ddb718c",
        code: authorizationCode,
        grant_type: "authorization_code",
      }),
    });
    const json = await response.json();
    return json;
  }
}

export const stravaApi = new StravaApi();
