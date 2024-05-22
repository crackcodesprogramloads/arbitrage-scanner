import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <div className="w-full h-16 flex flex-row items-center justify-around lg:justify-center text-gray-300 border-b border-gray-700 shadow-lg shadow-gray-800">
      <Link href="/">
        <header className="pl-8 sm:pl-0 text-lg sm:text-3xl md:text-4xl">COIN NEWS AGGREGATOR</header>
      </Link>
      <AuthButton />
    </div>
  );
}
