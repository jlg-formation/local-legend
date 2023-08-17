import * as L from "leaflet";

export const getCurrentPosition = (
  options?: PositionOptions
): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
};

export const getInitialLocation = async (): Promise<L.LatLngExpression> => {
  try {
    const pos = await getCurrentPosition();
    console.log("pos: ", pos);
    return [pos.coords.latitude, pos.coords.longitude];
  } catch (err) {
    console.log("err: ", err);
    return [45, 0];
  }
};
