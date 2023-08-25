import { base64ToUint8 } from "./convert";

export const getClientSecret = async () => {
  const ivBase64 = "JLBKavdwQ/88O/qKeN1lyA==";
  const iv = base64ToUint8(ivBase64);
  console.log("iv: ", iv);

  const keyStr = "dtvgcQqZYfNwlU/LDX25bLfb/aW/q494AYR3hZNhraE=";
  console.log("keyStr: ", keyStr);

  const retrievedKey = await window.crypto.subtle.importKey(
    "raw",
    base64ToUint8(keyStr).buffer,
    {
      name: "AES-CBC",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  console.log("retrievedKey: ", retrievedKey);

  const cryptedClientSecretStr =
    "9226PdGb3DX5c83on13t+yxo0gFk1TqrgXgW265Lxl4st31G4yHYpim2dwhbapMe";
  console.log("cryptedClientSecretStr: ", cryptedClientSecretStr);

  const cryptedClientSecret = base64ToUint8(cryptedClientSecretStr).buffer;

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: "AES-CBC",
      iv,
    },
    retrievedKey,
    cryptedClientSecret
  );
  console.log("decrypted: ", decrypted);
  const decryptedStr = new TextDecoder().decode(decrypted);
  console.log("decryptedStr: ", decryptedStr);
  return "6e91c19ab727fa6fedc51d1c39860dd68ddb718c";
};
