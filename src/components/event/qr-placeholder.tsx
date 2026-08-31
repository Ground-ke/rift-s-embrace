export function QRPlaceholder() {
  const cells = Array.from({ length: 121 }, (_, i) => (i * 7 + Math.floor(i / 11) * 3) % 5 < 2);
  return (
    <div
      className="relative grid aspect-square w-full max-w-44 grid-cols-11 gap-px bg-bone p-3"
      role="img"
      aria-label="QR code design placeholder, not valid for entry"
    >
      {cells.map((on, i) => (
        <span key={i} className={on ? "bg-background" : "bg-bone"} />
      ))}
      <span className="absolute inset-x-2 bottom-1 bg-bone text-center text-[8px] font-bold uppercase text-background">
        Design placeholder
      </span>
    </div>
  );
}
