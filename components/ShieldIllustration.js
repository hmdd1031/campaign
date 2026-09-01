export default function ShieldIllustration() {
  return (
    <svg viewBox="0 0 320 320" className="w-full h-full max-w-[320px] max-h-[320px]">
      <circle cx="160" cy="160" r="150" fill="#FAFAF8" stroke="#E5E5E0" strokeWidth="1" />
      <path
        d="M160 66 L228 92 V158 C228 206 200 240 160 254 C120 240 92 206 92 158 V92 Z"
        fill="#1E40AF"
      />
      <path
        d="M160 90 L206 108 V158 C206 194 186 218 160 228 C134 218 114 194 114 158 V108 Z"
        fill="#FAFAF8"
      />
      <circle cx="160" cy="150" r="20" fill="#1E40AF" />
      <rect x="150" y="150" width="20" height="34" rx="4" fill="#1E40AF" />
      <path
        d="M148 150 V138 a12 12 0 0 1 24 0 V150"
        fill="none"
        stroke="#1E40AF"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <g opacity="0.5">
        <line x1="60" y1="60" x2="80" y2="60" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" />
        <line x1="70" y1="50" x2="70" y2="70" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" />
        <line x1="250" y1="230" x2="270" y2="230" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" />
        <line x1="260" y1="220" x2="260" y2="240" stroke="#1E40AF" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
}
