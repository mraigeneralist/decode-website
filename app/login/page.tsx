"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) {
      setError("Supabase not configured");
      return;
    }
    setSubmitting(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-32 pb-16 px-5 sm:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] mb-3">
            <span className="inline-block w-8 h-px bg-[var(--accent)] mr-3 align-middle" />
            Admin
          </div>
          <h1 className="display text-5xl mb-8">Sign in.</h1>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
            {error && (
              <div className="p-4 rounded-lg border border-[var(--destructive)] text-[var(--destructive)] text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="btn-accent w-full px-6 py-3 rounded-full text-sm font-semibold disabled:opacity-50"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
