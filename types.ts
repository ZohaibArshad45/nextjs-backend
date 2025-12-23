//type.ts
import { Connection } from "mongoose";

declare global {
  // This tells TypeScript that global.mongoose exists
  // and what its shape looks like
  var mongoose: {
    conn: Connection | null;
    promise: Promise<Connection> | null;
  };
}

export {}