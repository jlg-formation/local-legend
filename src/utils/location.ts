import * as L from "leaflet";

const paris: L.LatLngExpression = [48.8567432973677, 2.3393482074403384];

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
    return paris;
  }
};
