import { webcrypto as nodeCrypto } from "crypto";

const cryptoObj: Crypto =
  (globalThis as any).crypto ?? (nodeCrypto as unknown as Crypto);

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export function generateInviteCode(length = 7): string {
  const bytes = new Uint8Array(length);
  cryptoObj.getRandomValues(bytes);
  let out = "";
  for (let i = 0; i < length; i++) out += ALPHABET[bytes[i] % ALPHABET.length];
  return out;
}
