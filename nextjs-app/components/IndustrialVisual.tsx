const DOTS = [
  { cx: 90, cy: 170, r: 14 }, { cx: 130, cy: 190, r: 10 }, { cx: 60, cy: 200, r: 9 },
  { cx: 160, cy: 160, r: 7 }, { cx: 35, cy: 165, r: 7 },
];

export function IndustrialVisual({
  accent = "#105191",
  variant = "card",
  className = "",
  label = "Industrial compound visual placeholder",
}: {
  accent?: string;
  variant?: "card" | "panel" | "hero";
  className?: string;
  label?: string;
}) {
  const dims = variant === "hero" ? { w: 640, h: 480 } : variant === "panel" ? { w: 560, h: 420 } : { w: 400, h: 260 };
  const gridId = `g-${accent.replace("#", "")}-${variant}`;

  return (
    <svg viewBox={`0 0 ${dims.w} ${dims.h}`} role="img" aria-label={label} className={className}>
      <defs>
        <linearGradient id={gridId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0f2a45" />
          <stop offset="1" stopColor="#081b30" />
        </linearGradient>
      </defs>
      <rect width={dims.w} height={dims.h} fill={`url(#${gridId})`} />
      <g stroke="#274d70" strokeWidth="1" opacity="0.7">
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={`h${f}`} x1="0" y1={dims.h * f} x2={dims.w} y2={dims.h * f} />
        ))}
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={`v${f}`} x1={dims.w * f} y1="0" x2={dims.w * f} y2={dims.h} />
        ))}
      </g>
      <g fill={accent}>
        {DOTS.map((d, i) => (
          <circle key={i} cx={(d.cx / 200) * dims.w * 0.55} cy={dims.h - (d.cy / 220) * dims.h * 0.55} r={(d.r / 200) * dims.w} />
        ))}
      </g>
      <g stroke="#e9eef3" strokeWidth="2.2" fill="none" opacity="0.85">
        <path d={`M${dims.w * 0.55} ${dims.h * 0.35}h${dims.w * 0.35}M${dims.w * 0.55} ${dims.h * 0.35}v${dims.h * 0.35}M${dims.w * 0.9} ${dims.h * 0.35}v${dims.h * 0.35}M${dims.w * 0.55} ${dims.h * 0.7}h${dims.w * 0.35}`} />
        <circle cx={dims.w * 0.55} cy={dims.h * 0.35} r="6" fill="#e9eef3" />
        <circle cx={dims.w * 0.9} cy={dims.h * 0.7} r="6" fill={accent} />
      </g>
    </svg>
  );
}
