import { Plane } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function SidebarHeader() {
  return (
    <div className="p-6 border-b">
      <div className="flex items-center justify-center gap-2">
        <Link href="/admin" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Alteen" width={75} height={75} />
          <span className="text-xl font-bold">Alteen</span>
        </Link>
      </div>
    </div>
  );
}