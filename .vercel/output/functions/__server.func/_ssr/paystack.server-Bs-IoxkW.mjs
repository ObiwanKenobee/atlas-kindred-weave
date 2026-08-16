const API = "https://api.paystack.co";
const BILLING_CURRENCY = "KES";
const PAYSTACK_PLAN_CODES = {
  launch: "PLN_uyp6ozxms5p8arf",
  growth: "PLN_8wbpj7a1hbt2zqz",
  scale: "PLN_uvbpj21sxef67dv"
};
const PLAN_AMOUNT_MINOR = {
  free: 0,
  launch: 65e3,
  growth: 195e3,
  scale: 63e4,
  enterprise: 0
};
function secret() {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not configured");
  return key;
}
async function paystack(path, init) {
  const res = await fetch(`${API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${secret()}`,
      "Content-Type": "application/json"
    },
    body: init?.body ? JSON.stringify(init.body) : void 0
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Paystack returned a non-JSON response [${res.status}]: ${text.slice(0, 300)}`);
  }
  if (!res.ok || json?.status === false) {
    throw new Error(`Paystack request failed [${res.status}]: ${json?.message ?? text.slice(0, 300)}`);
  }
  return json;
}
async function verifyPaystackSignature(rawBody, signature) {
  if (!signature) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const expected = Array.from(new Uint8Array(mac)).map((b) => b.toString(16).padStart(2, "0")).join("");
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}
export {
  BILLING_CURRENCY as B,
  PAYSTACK_PLAN_CODES as P,
  PLAN_AMOUNT_MINOR as a,
  paystack as p,
  verifyPaystackSignature as v
};
