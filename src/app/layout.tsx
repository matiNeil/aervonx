import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import Script from "next/script";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

/** Theme Clerk's prebuilt UI (SignIn/SignUp/UserButton) to match AervonX. */
const clerkAppearance = {
  variables: {
    colorPrimary: "#b8903f",
    colorText: "#16151b",
    colorTextSecondary: "#6a6a72",
    colorBackground: "#ffffff",
    colorInputBackground: "#ffffff",
    colorInputText: "#16151b",
    colorNeutral: "#16151b",
    borderRadius: "0.75rem",
    fontFamily: "var(--font-geist-sans), ui-sans-serif, system-ui, sans-serif",
  },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "cheap flights",
    "flight comparison",
    "hotels",
    "holiday packages",
    "airport transfers",
    "car rentals",
    "AervonX",
  ],
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={clerkAppearance} afterSignOutUrl="/">
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col bg-canvas text-ink">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Script
            id="travelpayouts-drive"
            strategy="afterInteractive"
            data-noptimize="1"
            data-cfasync="false"
            data-wpfc-render="false"
            data-no-defer="1"
            {...{ nowprocket: "", "seraph-accel-crit": "1" }}
            dangerouslySetInnerHTML={{
              __html: `(function () {
                var script = document.createElement("script");
                script.async = 1;
                script.src = "https://tp-em.com/NTQ5MDYz.js?t=549063";
                document.head.appendChild(script);
              })();`,
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
