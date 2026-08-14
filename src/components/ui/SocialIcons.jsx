// Lucide dropped brand/social marks, so these are small inline glyphs instead.
export function InstagramIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

export function FacebookIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M15 8.5h2V5h-2c-2.2 0-4 1.8-4 4v2H9v3.5h2V21h3.5v-6.5H17l.5-3.5h-3V9c0-.6.4-.5 1-.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 16, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <path
        fill="currentColor"
        d="M16.01 3C9.38 3 4 8.38 4 15.01c0 2.25.62 4.36 1.7 6.17L3 29l8-2.62a12.9 12.9 0 0 0 5 1.01h.01c6.63 0 12.01-5.38 12.01-12.01C28.02 8.38 22.64 3 16.01 3Zm0 21.98h-.01a10 10 0 0 1-5.1-1.4l-.37-.22-3.75 1.23 1.25-3.66-.24-.38a9.9 9.9 0 0 1-1.53-5.55C6.26 9.5 10.6 5.16 16 5.16c5.36 0 9.86 4.5 9.86 9.85 0 5.42-4.5 9.97-9.85 9.97Zm5.42-7.4c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.24-.46-2.36-1.46-.87-.78-1.46-1.74-1.63-2.04-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.01-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.62.71.23 1.35.2 1.86.12.57-.08 1.75-.71 2-1.4.25-.68.25-1.27.17-1.4-.07-.12-.27-.2-.57-.35Z"
      />
    </svg>
  );
}
