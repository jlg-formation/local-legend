import { DetailedSegment } from "../interfaces/DetailedSegment";
import { appCache } from "./cache";

export const SEGMENT_LIST = "SEGMENT_LIST";
export const SEGMENT_PREFIX = "segment_";

export const addSegmentToCache = async (ds: DetailedSegment) => {
  await appCache.set(SEGMENT_PREFIX + ds.id, ds);
  const ids = new Set((await appCache.get<number[]>(SEGMENT_LIST)) || []);
  ids.add(ds.id);
  await appCache.set(SEGMENT_LIST, [...ids]);
};

export const getAllSegmentFromCache = async (): Promise<DetailedSegment[]> => {
  const ids = (await appCache.get<number[]>(SEGMENT_LIST)) || [];
  const result: DetailedSegment[] = [];
  for (const id of ids) {
    const ds = await appCache.get<DetailedSegment>(SEGMENT_PREFIX + id);
    if (ds) {
      result.push(ds);
    }
  }

  return result;
};
