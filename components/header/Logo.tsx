import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <Image 
        src="/logo.png"
        alt="Alteen Logo"
        width={48}
        height={48}
        className="text-primary"
      />
      <span className="ml-3 text-2xl font-bold">Alteen</span>
    </Link>
  );
}