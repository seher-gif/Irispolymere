"use client";

import { useState } from "react";

export function CounterField({
  name,
  defaultValue,
  maxLength,
  multiline,
}: {
  name: string;
  defaultValue: string;
  maxLength: number;
  multiline?: boolean;
}) {
  const [count, setCount] = useState(defaultValue.length);
  const className = "border border-line bg-white px-3 py-2 text-sm outline-none focus:border-brand";
  return (
    <div className="flex flex-col gap-1">
      {multiline ? (
        <textarea name={name} defaultValue={defaultValue} maxLength={maxLength} rows={2} className={className} onChange={(e) => setCount(e.target.value.length)} />
      ) : (
        <input name={name} defaultValue={defaultValue} maxLength={maxLength} className={className} onChange={(e) => setCount(e.target.value.length)} />
      )}
      <span className={`text-[11px] ${count > maxLength * 0.9 ? "text-amber-600" : "text-muted"}`}>{count}/{maxLength}</span>
    </div>
  );
}
