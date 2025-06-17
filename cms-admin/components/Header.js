// cms-admin/components/Header.js
import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-black text-white h-16 flex items-center justify-between px-6 shadow-md z-10 relative">
      {/* Logo */}
      <Link href="/dashboard" className="flex items-center space-x-2">
        <Image src="/fricklogo.svg" alt="FRICK Logo" width={60} height={20} className="h-5 w-auto" />
      </Link>
    </header>
  );
}