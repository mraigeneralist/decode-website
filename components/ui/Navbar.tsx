"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery",  label: "Gallery" },
  { href: "/about",    label: "About" },
  { href: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-[1000] h-[var(--nav-h)] border-b transition-all duration-400 ${
          scrolled
            ? "bg-[rgba(6,6,6,0.92)] backdrop-blur-[16px] border-[var(--border)]"
            : "bg-[linear-gradient(to_bottom,rgba(6,6,6,0.7)_0%,rgba(6,6,6,0)_100%)] border-transparent"
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-8 max-[640px]:px-5 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Decode Detailing — Home">
            <Image
              src="/logo.jpg"
              alt="Decode Detailing"
              width={240}
              height={60}
              priority
              className="h-10 w-auto max-[640px]:h-9"
            />
          </Link>

          <ul className="hidden md:flex items-center gap-9">
            {NAV_LINKS.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-[rgba(245,245,245,0.85)] hover:text-[var(--accent-bright)] transition-colors duration-200"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex flex-col gap-[5px] p-2"
          >
            <span className={`block w-[22px] h-[1.5px] bg-[var(--foreground)] transition-transform duration-300 ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
            <span className={`block w-[22px] h-[1.5px] bg-[var(--foreground)] transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-[22px] h-[1.5px] bg-[var(--foreground)] transition-transform duration-300 ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-[var(--nav-h)] inset-x-0 z-[999] bg-[rgba(6,6,6,0.97)] backdrop-blur-[16px] border-b border-[var(--border)] px-8 max-[640px]:px-5 py-6 flex-col gap-5 transition-all duration-300 ${
          open ? "flex opacity-100 translate-y-0" : "hidden opacity-0 -translate-y-2"
        }`}
      >
        {NAV_LINKS.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={() => setOpen(false)}
            className="text-[0.85rem] font-semibold tracking-[0.18em] uppercase text-[var(--foreground)] hover:text-[var(--accent-bright)] transition-colors"
          >
            {n.label}
          </Link>
        ))}
      </div>
    </>
  );
}
