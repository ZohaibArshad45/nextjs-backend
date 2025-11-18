import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div className="p-6 space-y-4">
      <Link href="/create-model" className="text-blue-600 hover:underline">
        How we create a model
      </Link>

      <Link href="/connect-db" className="text-blue-600 hover:underline block">
        How we connect MongoDB
      </Link>
    </div>
  );
};

export default Home;
