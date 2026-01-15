interface StatCardProps {
  label: string;
  value?: number;
}

export default function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[120px]">
      {value !== undefined && (
        <p className="text-4xl font-black text-black mb-1">{value}</p>
      )}
      <p className="text-black font-semibold text-center">{label}</p>
    </div>
  );
}
