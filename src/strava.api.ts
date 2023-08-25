import { LatLngBounds } from "leaflet";
import { useRouter } from "vue-router";
import { AuthenticationError, QuotaError } from "./errors/errors";
import { DetailedSegment } from "./interfaces/DetailedSegment";
import { ExplorerSegment } from "./interfaces/ExplorerSegment";
import { TokenObject } from "./interfaces/TokenObject";
import { useApiStore } from "./stores/api.store";
import { useQuotaStore } from "./stores/quota.store";
import { useUserStore } from "./stores/user.store";
import { getStravaBoundsFromLeafletBounds } from "./utils/bounds";
import { appCache } from "./utils/cache";
import { SEGMENT_PREFIX, addSegmentToCache } from "./utils/segments";
import { SIGNIN_NAMEROUTE } from "./components/routes/config";

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
    if (response.status === 429) {
      const quotaStore = useQuotaStore();
      quotaStore.isExeeded = true;
      throw new QuotaError();
    }
    if (response.status === 401) {
      const userStore = useUserStore();
      userStore.signout();
      const router = useRouter();
      router.replace({ name: SIGNIN_NAMEROUTE });
      throw new AuthenticationError();
    }

    return response;
  }

  async getDetailedSegment(id: number): Promise<DetailedSegment> {
    console.log("STRAVA CALL: get detailed segment ", id);

    const response = await this.fetch(`/segments/${id}`);
    const ds: DetailedSegment = await response.json();
    return ds;
  }

  async getSegments(bounds: LatLngBounds): Promise<DetailedSegment[]> {
    // first get the segments not detailed.
    const qs = `activity_type=running&bounds=${getStravaBoundsFromLeafletBounds(
      bounds
    )}`;
    console.log("qs: ", qs);
    const response = await this.fetch(`/segments/explore?${qs}"`);
    const json: { segments: ExplorerSegment[] } = await response.json();
    const { segments } = json;
    console.log("segments: ", segments);
    const detailedSegments: DetailedSegment[] = [];
    for (const s of segments) {
      let ds = await appCache.get<DetailedSegment>(SEGMENT_PREFIX + s.id);
      if (ds === undefined) {
        ds = await this.getDetailedSegment(s.id);
        addSegmentToCache(ds);
      }
      detailedSegments.push(ds);
    }
    return detailedSegments;
  }

  async getTokenObject(authorizationCode: string): Promise<TokenObject> {
    const apiStore = useApiStore();
    const clientId = apiStore.getClientId();
    const clientSecret = await apiStore.getClientSecret();
    const response = await fetch(url + `/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code: authorizationCode,
        grant_type: "authorization_code",
      }),
    });
    if (response.status === 401) {
      throw new AuthenticationError("bad secret");
    }
    const json = await response.json();
    return json;
  }
}

export const stravaApi = new StravaApi();
