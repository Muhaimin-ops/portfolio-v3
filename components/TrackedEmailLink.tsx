"use client";

import { trackEvent } from "./Analytics";

export default function TrackedEmailLink({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  return (
    <a
      href={`mailto:${email}`}
      className={className}
      onClick={() => trackEvent("Email Link Clicked")}
    >
      {email}
    </a>
  );
}
