interface QuickActionProps {
  label: string;
  href: string;
}

export default function QuickAction({ label, href }: QuickActionProps) {
  return (
    <a 
      href={href}
      className="bg-gray-200 rounded-xl p-6 flex items-center justify-center min-h-[100px] hover:bg-gray-300 transition-colors"
    >
      <p className="text-black font-semibold text-center">{label}</p>
    </a>
  );
}
