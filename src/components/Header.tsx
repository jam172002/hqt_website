"use client";

import Link from "next/link";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/teachers", label: "Teachers" },
  { href: "/pricing", label: "Pricing" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-primary-100/60 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo-emblem.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg"
          />
          <span className="font-heading text-lg font-semibold text-primary-600">
            Hafiz Quran Tutor
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-charcoal-light transition-colors hover:text-primary-500"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Link
            href="/trial"
            className="rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-primary-600"
          >
            Book Free Trial
          </Link>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-charcoal lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth={1.8} stroke="currentColor" className="h-6 w-6">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-primary-100/60 bg-background lg:hidden">
          <nav className="flex flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-2.5 text-sm font-medium text-charcoal-light hover:bg-primary-50 hover:text-primary-600"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/trial"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-primary-500 px-4 py-2.5 text-center text-sm font-semibold text-white"
            >
              Book Free Trial
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
