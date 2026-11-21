/**
 * "Add as a preferred source on Google" button. It is only a link to Google's
 * Preferred sources page for this domain; nothing is installed or tracked.
 */
export const PREFERRED_SOURCE_URL = "https://www.google.com/preferences/source?q=milliondollarfunnels.us";

export function GoogleG({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.6 5.4 2.6 13.3l7.9 6.1C12.4 13.7 17.7 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.9-2.2 5.3-4.6 7l7.2 5.6c4.2-3.9 7.1-9.6 7.1-17.1z" />
      <path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-3-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C.9 16.6 0 20.2 0 24s.9 7.4 2.6 10.7l7.9-6.1z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.2-5.6c-2 1.4-4.8 2.4-8.7 2.4-6.3 0-11.6-4.2-13.5-10l-7.9 6.1C6.6 42.6 14.6 48 24 48z" />
    </svg>
  );
}

export default function PreferredSourceButton({
  label = "Add Million Dollar Funnels as a preferred source on Google",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={PREFERRED_SOURCE_URL}
      target="_blank"
      rel="noopener"
      className={`inline-flex items-center gap-2.5 rounded-lg bg-[#1a73e8] py-2 pl-2 pr-4 font-sans text-[13.5px] font-semibold leading-tight text-white shadow-[0_6px_18px_rgba(26,115,232,0.35)] transition-colors duration-200 hover:bg-[#1765cc] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
    >
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white">
        <GoogleG className="h-[18px] w-[18px]" />
      </span>
      <span>{label}</span>
    </a>
  );
}
