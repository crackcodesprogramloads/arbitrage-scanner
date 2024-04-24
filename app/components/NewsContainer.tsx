export default function NewsContainer() {
  const tempNews = [
    { title: "1", description: "news 1" },
    { title: "2", description: "news 2" },
    { title: "3", description: "news 3" },
    { title: "4", description: "news 4" },
    { title: "5", description: "news 5" },
    { title: "6", description: "news 6" },
  ];

  const currentNews = tempNews.map((article) => {
    return (
      <div key={article.title} className="w-[22rem] h-[22rem] px-4 py-2 border rounded-xl border-gray-700 shadow-lg shadow-gray-700">
        <p>{article.title}</p>
        <p>{article.description}</p>
      </div>
    );
  });

  return <div className="w-full h-full grid grid-rows-2 grid-flow-col items-center justify-around gap-5">{currentNews}</div>;
}
