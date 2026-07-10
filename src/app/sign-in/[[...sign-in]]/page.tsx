import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your AervonX account.",
};

export default function SignInPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-canvas-muted px-4 py-16">
      <Logo className="mb-8" />
      <SignIn
        appearance={{
          elements: {
            card: "shadow-card border border-line rounded-2xl",
          },
        }}
      />
    </section>
  );
}
