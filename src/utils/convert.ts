export const uint8ToBase64 = (arr: Uint8Array): string =>
  btoa(
    Array(arr.length)
      .fill("")
      .map((_, i) => String.fromCharCode(arr[i]))
      .join("")
  );

export const base64ToUint8 = (str: string) =>
  Uint8Array.from(atob(str), (c) => c.charCodeAt(0));
