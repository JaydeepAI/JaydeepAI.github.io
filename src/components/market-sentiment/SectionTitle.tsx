import { LucideIcon } from "lucide-react";

interface SectionTitleProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: string;
}

export function SectionTitle({ icon: Icon, title, subtitle }: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-center gap-3">
      {Icon && (
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 border border-white/10">
          <Icon size={16} className="text-[#3B82F6]" />
        </div>
      )}
      <div>
        <h2 className="text-lg font-semibold tracking-tight text-white">{title}</h2>
        {subtitle && <p className="text-xs text-[#94A3B8]">{subtitle}</p>}
      </div>
    </div>
  );
}
