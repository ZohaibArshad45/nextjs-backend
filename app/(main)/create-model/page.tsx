import React from "react";

const ModelPage = () => {
  const explanation = `
This file defines the User model for MongoDB using mongoose.

We start with a TypeScript interface so the fields stay typed in the project.
The schema tells MongoDB what each field should look like.
timestamps adds createdAt and updatedAt automatically.
The model export checks if a model already exists, which avoids
errors when Next.js reloads during development.
`;

  const code = `import mongoose from "mongoose";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  image: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String }
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);
export default UserModel;`;

  return (
    <div className="p-6 space-y-4">
      <div className="bg-gray-100 text-gray-800 p-4 rounded-lg whitespace-pre-wrap text-sm leading-relaxed">
        {explanation}
      </div>

      <div className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto">
        <pre className="text-sm font-mono">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default ModelPage;
