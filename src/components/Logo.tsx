type LogoProps = {
  variant?: "light" | "dark";
  showWordmark?: boolean;
  className?: string;
};

export function Logo({
  variant = "light",
  showWordmark = true,
  className,
}: LogoProps) {
  const color = variant === "light" ? "white" : "#1a2744";

  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 56 56"
        aria-hidden="true"
        className="h-9 w-9 flex-none"
        fill="none"
      >
        <circle cx="28" cy="28" r="25" stroke={color} strokeWidth="2.5" />
        <path
          d="M16 42 L28 14 L40 42"
          stroke={color}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <line
          x1="20" y1="33"
          x2="36" y2="33"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      </svg>

      {showWordmark && (
        <span className="flex flex-col leading-none select-none gap-0.5">
          <span
            className="text-[1.1rem] font-black tracking-[0.18em] uppercase"
            style={{ color }}
          >
            ATHENA
          </span>
          <span
            className="text-[0.72rem] font-medium tracking-[0.32em] uppercase"
            style={{ color, opacity: 0.85 }}
          >
            DATA
          </span>
        </span>
      )}
    </span>
  );
}
