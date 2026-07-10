"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { buttonClass } from "@/components/ui/Button";
import { Logo } from "@/components/layout/Logo";
import {
  CloseIcon,
  HelpIcon,
  MenuIcon,
  SettingsIcon,
} from "@/components/icons";

function isActive(pathname: string, href: string): boolean {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-xl supports-[backdrop-filter]:bg-canvas/70">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                isActive(pathname, item.href)
                  ? "text-ink"
                  : "text-muted hover:text-ink",
              )}
            >
              {item.label}
              {isActive(pathname, item.href) ? (
                <span className="absolute inset-x-4 -bottom-[1px] h-px bg-accent-500" />
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/support"
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-ink hover:bg-canvas-muted lg:inline-flex"
          >
            <HelpIcon className="h-4 w-4" />
            Support
          </Link>

          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button type="button" className={buttonClass({ variant: "outline", size: "sm" })}>
                Sign in
              </button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Link
                  label="Account settings"
                  href="/account/settings"
                  labelIcon={<SettingsIcon className="h-4 w-4" />}
                />
              </UserButton.MenuItems>
            </UserButton>
          </Show>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-ink hover:bg-canvas-muted md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-line bg-canvas md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex flex-col rounded-xl px-3 py-3 transition-colors",
                  isActive(pathname, item.href)
                    ? "bg-canvas-muted text-ink"
                    : "text-muted hover:bg-canvas-muted hover:text-ink",
                )}
              >
                <span className="text-sm font-semibold">{item.label}</span>
                {item.description ? (
                  <span className="text-xs text-muted">{item.description}</span>
                ) : null}
              </Link>
            ))}
            <Link
              href="/support"
              onClick={() => setOpen(false)}
              className="mt-1 inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-canvas-muted"
            >
              <HelpIcon className="h-4 w-4" />
              Support
            </Link>
            <Show when="signed-in">
              <Link
                href="/account/settings"
                onClick={() => setOpen(false)}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-canvas-muted"
              >
                <SettingsIcon className="h-4 w-4" />
                Account settings
              </Link>
            </Show>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
