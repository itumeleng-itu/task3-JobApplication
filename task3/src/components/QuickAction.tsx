import { HugeiconsIcon } from "@hugeicons/react";

interface QuickActionProps {
  label: string;
  href: string;
  icon: any;
}

export default function QuickAction({ label, href, icon }: QuickActionProps) {
  return (
    <a 
      href={href}
      className="bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center min-h-[100px] hover:bg-gray-300 transition-colors gap-2"
    >
      <HugeiconsIcon icon={icon} size={28} className="text-black" />
      <p className="text-black font-semibold text-center">{label}</p>
    </a>
  );
}
