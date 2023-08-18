import { DetailedSegment } from "../interfaces/DetailedSegment";

export const remainingEffort = (s: DetailedSegment): number => {
  return Math.floor(
    s.distance *
      (2 * (+s.local_legend?.effort_count ? +s.local_legend?.effort_count : 1) +
        1)
  );
};
