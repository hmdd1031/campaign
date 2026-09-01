import { Lock } from "lucide-react";

export default function TopBar() {
  return (
    <div className="flex items-center gap-2 px-6 py-4 border-b border-neutral-200">
      <div className="w-6 h-6 rounded bg-navy flex items-center justify-center">
        <Lock className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
      </div>
      <span className="font-semibold text-[15px] tracking-tight">
        BackDoor 개인정보 진단
      </span>
    </div>
  );
}
