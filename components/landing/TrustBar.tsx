const ITEMS = [
  { value: "9H",        label: "Ceramic Grade" },
  { value: "TPU",       label: "PPF Material" },
  { value: "1-on-1",    label: "Per Appointment" },
  { value: "Pro-Grade", label: "Products Only" },
  { value: "10–8",      label: "Mon–Sun Hours" },
];

export default function TrustBar() {
  return (
    <div className="bg-[var(--bg-card)] border-t border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-[1240px] mx-auto flex items-stretch flex-wrap">
        {ITEMS.map((item, i) => (
          <div
            key={item.label}
            className={`flex-1 min-w-0 flex flex-col items-center justify-center py-6 px-4 gap-1 text-center border-r border-[var(--border)] last:border-r-0
              max-[900px]:flex-[0_0_33.333%] max-[900px]:border-b
              max-[900px]:[&:nth-child(3)]:border-r-0
              max-[900px]:[&:nth-child(4)]:flex-[0_0_50%] max-[900px]:[&:nth-child(4)]:border-b-0
              max-[900px]:[&:nth-child(5)]:flex-[0_0_50%] max-[900px]:[&:nth-child(5)]:border-r-0 max-[900px]:[&:nth-child(5)]:border-b-0
              max-[640px]:py-4 max-[640px]:px-2`}
          >
            <div
              className="display text-[1.6rem] leading-none max-[640px]:text-[1.25rem]"
              style={{ color: i % 2 === 0 ? "var(--accent-bright)" : "var(--foreground)" }}
            >
              {item.value}
            </div>
            <div className="text-[0.6rem] font-semibold tracking-[0.18em] uppercase text-[var(--muted)] max-[640px]:text-[0.55rem]">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
