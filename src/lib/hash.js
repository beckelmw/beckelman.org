export default async (str) => {
  const myText = new TextEncoder().encode(str);
  const hashBuffer = await crypto.subtle.digest("MD5", myText);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return hashHex;
};
