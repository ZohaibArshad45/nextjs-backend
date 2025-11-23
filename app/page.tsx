import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link href="/home" className="text-blue-600 hover:underline">
        Home
      </Link>
    </div>
  );
}
