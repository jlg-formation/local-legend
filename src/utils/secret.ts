(async () => {
  const base64ToUint8 = (str: string) =>
    Uint8Array.from(atob(str), (c) => c.charCodeAt(0));

  const uint8ToBase64 = (arr: Uint8Array): string =>
    btoa(
      Array(arr.length)
        .fill("")
        .map((_, i) => String.fromCharCode(arr[i]))
        .join("")
    );

  const ivBase64 = "JLBKavdwQ/88O/qKeN1lyA==";
  const iv = base64ToUint8(ivBase64);
  console.log("iv: ", iv);

  const clearClientSecret = new TextEncoder().encode(
    "6e91c19ab727fa6fedc51d1c39860dd68ddb718c"
  );

  const key = await window.crypto.subtle.generateKey(
    {
      name: "AES-CBC",
      length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  );
  console.log("key: ", key);
  const keyAB = await window.crypto.subtle.exportKey("raw", key);
  const keyStr = uint8ToBase64(new Uint8Array(keyAB));
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

  const cryptedClientSecret = await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv,
    },
    key,
    clearClientSecret
  );
  console.log("cryptedClientSecret: ", cryptedClientSecret);
  const cryptedClientSecretStr = uint8ToBase64(
    new Uint8Array(cryptedClientSecret)
  );
  console.log("cryptedClientSecretStr: ", cryptedClientSecretStr);

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
})();

export const getClientSecret = async () => {
  //   const result = await window.crypto.subtle.decrypt({
  //     name: "AES-CTR",
  //   });
  return "6e91c19ab727fa6fedc51d1c39860dd68ddb718c";
};
