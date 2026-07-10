import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { UserProfile } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Account settings",
  description: "Manage your AervonX profile, security and connected accounts.",
};

export default async function AccountSettingsPage() {
  await auth.protect();
  const user = await currentUser();

  return (
    <>
      <section className="border-b border-line bg-canvas-muted">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-ink">
            Account settings
          </h1>
          <p className="mt-2 text-sm text-muted">
            Signed in as{" "}
            <span className="font-semibold text-ink">
              {user?.primaryEmailAddress?.emailAddress ?? user?.fullName ?? "your account"}
            </span>
          </p>
        </div>
      </section>

      <section className="mx-auto flex max-w-7xl justify-center px-4 py-12 sm:px-6 lg:px-8">
        <UserProfile
          appearance={{
            elements: {
              rootBox: "w-full",
              cardBox: "w-full shadow-card border border-line rounded-2xl",
            },
          }}
        />
      </section>
    </>
  );
}
