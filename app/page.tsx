import Link from "next/link";
import type { Metadata } from "next";

// Replaces upstream's public marketing landing page. This instance is a private
// tool, not a product being sold, so the front door is a short branded card
// rather than a sales pitch for the open-source project it is built on.
export const metadata: Metadata = {
  title: "PitzChat",
  description: "Instagram comment-to-DM automation.",
  robots: { index: false, follow: false },
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <main className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            PitzChat
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Instagram comment-to-DM automation. When someone comments your
            keyword on a post or reel, they get your reply in the DMs — sent
            through the official Meta API.
          </p>
        </div>

        <div className="panel rounded p-8 text-center">
          <Link
            href="/login"
            className="inline-flex w-full items-center justify-center rounded bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Sign in
          </Link>
          <p className="mt-4 text-xs text-muted">
            Access is limited to approved accounts.
          </p>
        </div>
      </main>

      <footer className="mt-10 flex items-center gap-5 text-xs text-muted">
        <Link href="/privacy" className="transition hover:text-foreground">
          Privacy
        </Link>
        <Link href="/terms" className="transition hover:text-foreground">
          Terms
        </Link>
        <Link href="/data-deletion" className="transition hover:text-foreground">
          Data deletion
        </Link>
      </footer>
    </div>
  );
}
