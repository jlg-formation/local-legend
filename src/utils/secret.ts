import { base64ToUint8, uint8ToBase64 } from "./convert";

const base64InitializationVector = "JLBKavdwQ/88O/qKeN1lyA==";
const base64AESSecretKey = "dtvgcQqZYfNwlU/LDX25bLfb/aW/q494AYR3hZNhraE=";
const base64EncryptedOAuth2ClientSecret =
  "fgNYYGfgKbHo6OmQykBl9+se6YG1FyNH/dz4H/Nw7O6gbRLr9N8OOZnOI1RUYyT4";

export const getEncryptedOAuth2ClientSecret = async (
  clientSecretStr: string
) => {
  const iv = base64ToUint8(base64InitializationVector);
  const key = await window.crypto.subtle.importKey(
    "raw",
    base64ToUint8(base64AESSecretKey).buffer,
    {
      name: "AES-CBC",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  const encryptedOAuth2ClientSecret = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv,
    },
    key,
    new TextEncoder().encode(clientSecretStr)
  );

  return uint8ToBase64(new Uint8Array(encryptedOAuth2ClientSecret));
};

(async () => {
  const encryptedStr = await getEncryptedOAuth2ClientSecret("xxx");
  console.log("encryptedStr: ", encryptedStr);
})();

export const getClientSecret = async () => {
  const iv = base64ToUint8(base64InitializationVector);
  const key = await window.crypto.subtle.importKey(
    "raw",
    base64ToUint8(base64AESSecretKey).buffer,
    {
      name: "AES-CBC",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );

  const encryptedOAuth2ClientSecret = base64ToUint8(
    base64EncryptedOAuth2ClientSecret
  ).buffer;

  const oAuth2ClientSecret = await window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    key,
    encryptedOAuth2ClientSecret
  );

  const oAuth2ClientSecretStr = new TextDecoder().decode(oAuth2ClientSecret);
  console.log("oAuth2ClientSecretStr: ", oAuth2ClientSecretStr);
  return oAuth2ClientSecretStr;
};
