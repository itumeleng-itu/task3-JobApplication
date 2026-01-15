import { HugeiconsIcon } from "@hugeicons/react";

interface StatCardProps {
  label: string;
  value?: number;
  icon: any;
}

export default function StatCard({ label, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[120px]">
      <HugeiconsIcon icon={icon} size={32} className="mb-2 text-black" />
      {value !== undefined && (
        <p className="text-4xl font-black text-black mb-1">{value}</p>
      )}
      <p className="text-black font-semibold text-center">{label}</p>
    </div>
  );
}
