import Image from "next/image";
import { notFound } from "next/navigation";

const getData = async () => {
  const res = await fetch(`${process.env.API_URL}/photos`, {
    cache: "no-store",
  });
  if (!res.ok) return notFound();
  const data = await res.json();
  return data;
};

export default async function Home() {
  const data = await getData();

  return (
    <main className="overflow-x-hidden flex flex-col items-center justify-center min-h-screen py-20">
      <h1 className="text-white text-5xl">NextJs + Docker</h1>
      <div className="grid grid-cols-4 gap-4 mt-10 overflow-x-hidden">
        {data &&
          data.splice(0, 50).map((item: any) => (
            <div
              key={item.id}
              className="flex flex-col items-center justify-center p-4 bg-gray-800 rounded-lg max-w-[350px]"
            >
              <Image
                src={item.url}
                alt={item.title}
                width={200}
                height={200}
                className="rounded-lg"
              />
              <h3 className="text-white text-center">{item.title}</h3>
            </div>
          ))}
      </div>
    </main>
  );
}
