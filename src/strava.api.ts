import { LatLngBounds } from "leaflet";
import { AuthenticationError } from "./errors/errors";
import { DetailedSegment } from "./interfaces/DetailedSegment";
import { ExplorerSegment } from "./interfaces/ExplorerSegment";
import { TokenObject } from "./interfaces/TokenObject";
import { getStravaBoundsFromLeafletBounds } from "./utils/bounds";

const url = "https://www.strava.com/api/v3";

class StravaApi {
  tokenObject: TokenObject | undefined;

  async fetch(path: string, options?: RequestInit) {
    if (!this.tokenObject) {
      throw new AuthenticationError();
    }
    const response = await fetch(url + path, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.tokenObject.access_token}`,
      },
    });
    return response;
  }

  async getSegments(bounds: LatLngBounds): Promise<DetailedSegment[]> {
    // first get the segments not detailed.
    const qs = new URLSearchParams({
      bounds: getStravaBoundsFromLeafletBounds(bounds),
      activity_type: "running",
    });
    const response = await this.fetch(`/segments/explore?${qs}"`);
    const segments: ExplorerSegment[] = await response.json();
    console.log("segments: ", segments);

    return [];
  }

  async getTokenObject(authorizationCode: string): Promise<TokenObject> {
    const response = await fetch(`/oauth/token`, {
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
