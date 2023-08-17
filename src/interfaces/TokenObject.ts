import { Athlete } from "./Athlete";
import { seconds, timestamp } from "./types";

export interface TokenObject {
  access_token: string;
  athlete: Athlete;
  expires_at: timestamp;
  expires_in: seconds;
  refresh_token: string;
  token_type: string;
}
