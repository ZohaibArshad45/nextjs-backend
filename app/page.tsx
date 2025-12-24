import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>2:18</p>
      <Link href="/home" className="text-blue-600 hover:underline">
        Home
      </Link>
    </div>
  );
}
