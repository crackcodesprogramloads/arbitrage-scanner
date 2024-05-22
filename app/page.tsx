import SignUpButton from "./components/SignUpButton";

export default function Home() {
  return (
    <main className="w-screen h-screen pr-10 pb-10 pl-10 flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="py-1 text-[40px] sm:text-[45px] md:text-[52px] lg:text-[72px] text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-stone-100 to-stone-900">
          Crypto news in one place
        </h1>
        <h1 className="py-1 text-[40px] sm:text-[35px] md:text-[42px] lg:text-[52px] text-transparent bg-clip-text bg-gradient-to-b from-stone-100 via-stone-100 to-stone-900">
          Add coins to your watchlist
        </h1>
      </div>
      <SignUpButton />
    </main>
  );
}
