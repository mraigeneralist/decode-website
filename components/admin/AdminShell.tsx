"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const NAV = [
  { href: "/admin",                label: "Overview" },
  { href: "/admin/appointments",   label: "Appointments" },
  { href: "/admin/services",       label: "Services" },
  { href: "/admin/availability",   label: "Availability" },
  { href: "/admin/settings",       label: "Settings" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [email, setEmail] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!supabase) {
      setChecked(true);
      return;
    }
    supabase.auth.getSession().then(({ data }) => {
      const user = data.session?.user;
      if (!user) {
        router.replace("/login");
        return;
      }
      setEmail(user.email ?? null);
      setChecked(true);
    });
  }, [router]);

  async function logout() {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.replace("/login");
  }

  if (!checked) {
    return <div className="p-10 text-[var(--muted)]">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-[var(--border)] bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <Image src="/logo.jpg" alt="Decode" width={120} height={32} className="h-7 w-auto" />
            <span className="text-xs uppercase tracking-[0.3em] text-[var(--muted)] hidden sm:inline">
              Admin
            </span>
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[var(--muted)] hidden sm:inline">{email}</span>
            <button onClick={logout} className="hover:text-[var(--accent)]">Logout</button>
          </div>
        </div>
        <nav className="max-w-7xl mx-auto px-5 sm:px-8 flex gap-1 overflow-x-auto">
          {NAV.map((n) => {
            const active =
              n.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(n.href);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={`px-4 py-3 text-sm whitespace-nowrap border-b-2 ${
                  active
                    ? "border-[var(--accent)] text-[var(--accent)]"
                    : "border-transparent text-[var(--foreground)]/70 hover:text-[var(--foreground)]"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1 max-w-7xl w-full mx-auto px-5 sm:px-8 py-8">{children}</main>
    </div>
  );
}
