// Server-only Paystack helpers. Never import from client code.
import type { PlanId } from "@/lib/entitlements";

const API = "https://api.paystack.co";

/** Charge currency supported by the connected Paystack integration. */
export const BILLING_CURRENCY = "KES";

/** USD -> KES reference rate used to convert catalogue prices. */
export const USD_TO_BILLING_RATE = 130;

/** Live Paystack plan codes (monthly, KES). */
export const PAYSTACK_PLAN_CODES: Partial<Record<PlanId, string>> = {
  launch: "PLN_uyp6ozxms5p8arf",
  growth: "PLN_8wbpj7a1hbt2zqz",
  scale: "PLN_uvbpj21sxef67dv",
};

/** Amount charged per plan, in the smallest unit of BILLING_CURRENCY. */
export const PLAN_AMOUNT_MINOR: Record<string, number> = {
  free: 0,
  launch: 65000,
  growth: 195000,
  scale: 630000,
  enterprise: 0,
};

function secret(): string {
  const key = process.env.PAYSTACK_SECRET_KEY;
  if (!key) throw new Error("PAYSTACK_SECRET_KEY is not configured");
  return key;
}

export async function paystack<T = any>(
  path: string,
  init?: { method?: string; body?: unknown },
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${secret()}`,
      "Content-Type": "application/json",
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });
  const text = await res.text();
  let json: any;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Paystack returned a non-JSON response [${res.status}]: ${text.slice(0, 300)}`);
  }
  if (!res.ok || json?.status === false) {
    throw new Error(`Paystack request failed [${res.status}]: ${json?.message ?? text.slice(0, 300)}`);
  }
  return json as T;
}

/** Verify a Paystack webhook signature (HMAC SHA512 of the raw body, keyed by the secret key). */
export async function verifyPaystackSignature(rawBody: string, signature: string | null): Promise<boolean> {
  if (!signature) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret()),
    { name: "HMAC", hash: "SHA-512" },
    false,
    ["sign"],
  );
  const mac = await crypto.subtle.sign("HMAC", key, enc.encode(rawBody));
  const expected = Array.from(new Uint8Array(mac))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  if (expected.length !== signature.length) return false;
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
  return diff === 0;
}
