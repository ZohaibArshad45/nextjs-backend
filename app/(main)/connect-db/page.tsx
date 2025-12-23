import React from "react";

const ConnectPage = () => {
  const typeExplanation = `
This file extends the global namespace so TypeScript knows
that global.mongoose exists. We store the active connection
and the connection promise here. It prevents TS errors and
lets us reuse the same connection during development.
`;

  const typeCode = `//type.ts
  import { Connection } from "mongoose";

declare global {
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {};`;

  const connectExplanation = `
This function connects our app to MongoDB. In dev mode,
Next.js hot reload can run database code multiple times.
To avoid opening new connections every refresh, we keep
a cached connection on global.mongoose. If a connection
already exists, we reuse it. If not, we create one and store it.
`;

  const connectCode = `import mongoose from "mongoose";
  
  const MONGO_URL = process.env.MONGO_URL;
  
  if (!MONGO_URL) {
    throw new Error("MongoDB URL not found");
  }
  
  // global cache to avoid multiple connections in dev
  let cached = global.mongoose;
  
  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
  
  const dbConnect = async () => {
    if (cached.conn) {
      // console.log("Cashed db connected")
      return cached.conn;
    }
  
    if (!cached.promise) {
      cached.promise = mongoose.connect(MONGO_URL).then((m) => m.connection);
    }
  
    try {
      cached.conn = await cached.promise;
      // console.log("DB connected")
    } catch (error) {
      cached.promise = null;
      throw error;
    }
  
    return cached.conn;
  };
  
  export default dbConnect;
  `;

  return (
    <div className="p-6 space-y-10">
      {/* Type File */}
      <section>
        <h1 className="text-xl font-semibold mb-3">Global Type Setup</h1>

        <div className="bg-gray-100 text-gray-800 p-4 rounded-lg whitespace-pre-wrap text-sm leading-relaxed mb-4">
          {typeExplanation}
        </div>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            <code>{typeCode}</code>
          </pre>
        </div>
      </section>

      {/* Connection File */}
      <section>
        <h1 className="text-xl font-semibold mb-3">MongoDB Connection Logic</h1>

        <div className="bg-gray-100 text-gray-800 p-4 rounded-lg whitespace-pre-wrap text-sm leading-relaxed mb-4">
          {connectExplanation}
        </div>

        <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
          <pre className="text-sm font-mono">
            <code>{connectCode}</code>
          </pre>
        </div>
      </section>
    </div>
  );
};

export default ConnectPage;
