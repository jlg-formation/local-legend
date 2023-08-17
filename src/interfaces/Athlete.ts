import { url } from "./types";

export interface Athlete {
  id: number;
  username: string;
  firstname: string;
  lastname: string;
  profile_medium: url;
  profile: url;
}
