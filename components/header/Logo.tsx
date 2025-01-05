import { Plane } from "lucide-react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Plane className="h-8 w-8 text-primary" />
      <span className="ml-2 text-xl font-bold">TravelPro</span>
    </Link>
  );
}