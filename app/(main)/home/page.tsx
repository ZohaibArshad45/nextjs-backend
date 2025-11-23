import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="p-6 space-y-4 flex flex-col">
      <Link href="/create-model" className="text-blue-600 hover:underline">
        How we create a model
      </Link>

      <Link href="/connect-db" className="text-blue-600 hover:underline">
        How we connect MongoDB
      </Link>

      <Link href="/create-post-api" className="text-blue-600 hover:underline">
        How we create POST API for signup
      </Link>
    </div>
  );
};

export default Home;
