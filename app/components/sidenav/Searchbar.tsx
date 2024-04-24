export default function Searchbar() {
  return (
    <div className="px-4 py-2 flex flex-row items-center justify-center gap-4 border rounded-xl border-gray-700 shadow-lg shadow-gray-700">
      <input className="bg-transparent" type="text" placeholder="Search coin..." />
      <p className="text-2xl text-yellow-500">*</p>
    </div>
  );
}
