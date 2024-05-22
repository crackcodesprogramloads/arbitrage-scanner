import AuthButton from "./AuthButton";

export default function Navbar() {
  return (
    <div className="h-16 flex flex-row items-center justify-around border-b border-gray-700 shadow-lg shadow-gray-800">
      <header className="text-4xl">COIN NEWS AGGREGATOR</header>
      <AuthButton />
    </div>
  );
}
