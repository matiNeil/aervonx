import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";
import { Logo } from "@/components/layout/Logo";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your AervonX account to save trips and manage bookings.",
};

export default function SignUpPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center bg-canvas-muted px-4 py-16">
      <Logo className="mb-8" />
      <SignUp
        appearance={{
          elements: {
            card: "shadow-card border border-line rounded-2xl",
          },
        }}
      />
    </section>
  );
}
