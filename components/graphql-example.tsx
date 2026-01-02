"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { GET_USERS, GET_HELLO } from "@/lib/graphql/queries";
import { CREATE_USER } from "@/lib/graphql/mutations";
import { useState } from "react";
import type {
  GetHelloQuery,
  GetUsersQuery,
  CreateUserMutationVariables,
} from "@/lib/graphql/types";

export function GraphQLExample() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Example query
  const { data: helloData, loading: helloLoading } =
    useQuery<GetHelloQuery>(GET_HELLO);
  const {
    data: usersData,
    loading: usersLoading,
    refetch,
  } = useQuery<GetUsersQuery>(GET_USERS);

  // Example mutation
  const [createUser, { loading: createLoading }] = useMutation(CREATE_USER, {
    onCompleted: () => {
      refetch();
      setName("");
      setEmail("");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUser({
      variables: { name, email } as CreateUserMutationVariables,
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">GraphQL Example</h2>

        {/* Hello Query */}
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold mb-2">Hello Query:</h3>
          {helloLoading ? <p>Loading...</p> : <p>{helloData?.hello}</p>}
        </div>

        {/* Users Query */}
        <div className="mb-4 p-4 border rounded">
          <h3 className="font-semibold mb-2">Users:</h3>
          {usersLoading ? (
            <p>Loading...</p>
          ) : (
            <ul className="list-disc list-inside">
              {usersData?.users?.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Create User Mutation */}
        <div className="p-4 border rounded">
          <h3 className="font-semibold mb-2">Create User:</h3>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={createLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {createLoading ? "Creating..." : "Create User"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
