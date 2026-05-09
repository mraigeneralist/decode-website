"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const NAV = [
  { href: "/services", label: "Services" },
  { href: "/packages", label: "Packages" },
  { href: "/gallery",  label: "Gallery" },
  { href: "/about",    label: "About" },
  { href: "/contact",  label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-[var(--background)]/85 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-5 sm:px-8 h-[var(--nav-h)] flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Decode Detailing home">
          <Image
            src="/logo.jpg"
            alt="Decode Detailing"
            width={180}
            height={48}
            className="h-9 w-auto"
            priority
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="text-[var(--foreground)]/85 hover:text-[var(--accent)] transition-colors"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            href="/book"
            className="btn-accent px-5 py-2.5 rounded-full text-sm font-semibold tracking-wide"
          >
            Book Now
          </Link>
        </div>

        <button
          aria-label="Menu"
          className="md:hidden p-2"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-0.5 bg-[var(--foreground)] mb-1.5" />
          <span className="block w-6 h-0.5 bg-[var(--foreground)] mb-1.5" />
          <span className="block w-6 h-0.5 bg-[var(--foreground)]" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[var(--border)]">
          <ul className="px-5 py-4 flex flex-col gap-3">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 text-[var(--foreground)]/85 hover:text-[var(--accent)]"
                >
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/book"
                onClick={() => setOpen(false)}
                className="btn-accent inline-block px-5 py-2.5 rounded-full text-sm font-semibold mt-2"
              >
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
