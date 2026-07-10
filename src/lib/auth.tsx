import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type Profile = {
  id: string;
  user_id: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  region: string | null;
  trust_score: number;
  verified: boolean;
};

type AuthState = {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const Ctx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const qc = useQueryClient();

  async function loadProfile(uid: string) {
    const { data } = await supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle();
    setProfile((data as Profile) ?? null);
  }

  async function tryAttachReferral() {
    try {
      if (typeof window === "undefined") return;
      const urlCode = new URL(window.location.href).searchParams.get("ref");
      if (urlCode) localStorage.setItem("atlas.ref", urlCode.toUpperCase());
      const code = localStorage.getItem("atlas.ref");
      if (!code) return;
      const { attachReferralCode } = await import("@/lib/referrals.functions");
      const res = await attachReferralCode({ data: { code } });
      if (res.ok || res.reason === "self_referral") {
        localStorage.removeItem("atlas.ref");
      }
    } catch { /* non-fatal */ }
  }

  useEffect(() => {
    // Capture ?ref= from initial URL even before sign-in
    if (typeof window !== "undefined") {
      const urlCode = new URL(window.location.href).searchParams.get("ref");
      if (urlCode) localStorage.setItem("atlas.ref", urlCode.toUpperCase());
    }

    // Sync listener first
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        // defer to avoid deadlocks
        setTimeout(() => {
          loadProfile(sess.user.id);
          tryAttachReferral();
        }, 0);
      } else {
        setProfile(null);
      }
      router.invalidate();
      qc.invalidateQueries();
    });

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        loadProfile(data.session.user.id);
        tryAttachReferral();
      }
      setLoading(false);
    });

    return () => sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Ctx.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        },
        refreshProfile: async () => {
          if (user) await loadProfile(user.id);
        },
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
