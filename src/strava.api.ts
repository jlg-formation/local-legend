import { AuthenticationError } from "./errors/errors";
import { Athlete } from "./interfaces/Athlete";

const url = "https://www.strava.com/api/v3";

class StravaApi {
  code = "xxx";

  async fetch(url: string, options?: RequestInit) {
    console.log("this.code: ", this.code);
    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.code}`,
      },
    });
    return response;
  }

  async getCurrentAthlete(): Promise<Athlete> {
    console.log("getCurrentAthlete this code = " + this.code);
    const response = await this.fetch(url + "/athlete");
    if (response.status === 401) {
      throw new AuthenticationError();
    }
    const json: Athlete = await response.json();
    return json;
  }

  async getTokenObject(authorizationCode: string) {
    console.log("getTokenObject with authorization code = ", authorizationCode);
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
    console.log("json: ", json);
    return json;
  }
}

export const stravaApi = new StravaApi();
