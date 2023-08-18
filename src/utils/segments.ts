import { DetailedSegment } from "../interfaces/DetailedSegment";
import { appCache } from "./cache";

export const SEGMENT_LIST = "SEGMENT_LIST";
export const SEGMENT_PREFIX = "segment_";

export const addSegmentToCache = (ds: DetailedSegment) => {
  appCache.set(SEGMENT_PREFIX + ds.id, ds);
  const ids = new Set(appCache.get<number[]>(SEGMENT_LIST) || []);
  ids.add(ds.id);
  appCache.set(SEGMENT_LIST, [...ids]);
};

export const getAllSegmentFromCache = (): DetailedSegment[] => {
  const ids = appCache.get<number[]>(SEGMENT_LIST) || [];
  const result: DetailedSegment[] = [];
  for (const id of ids) {
    const ds = appCache.get<DetailedSegment>(SEGMENT_PREFIX + id);
    if (ds) {
      result.push(ds);
    }
  }

  return result;
};
