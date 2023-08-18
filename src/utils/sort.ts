import { DetailedSegment } from "../interfaces/DetailedSegment";
import { remainingEffort } from "./efforts";

export const byRemainingEffort = (a: DetailedSegment, b: DetailedSegment) =>
  remainingEffort(a) <= remainingEffort(b) ? -1 : 1;
