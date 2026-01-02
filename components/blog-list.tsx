"use client";

import { useQuery, useMutation } from "@apollo/client/react";
import { GET_BLOGS } from "@/lib/graphql/queries";
import { DELETE_BLOG, CREATE_BLOG } from "@/lib/graphql/mutations";
import type {
  GetBlogsQuery,
  CreateBlogMutationVariables,
  DeleteBlogMutationVariables,
} from "@/lib/graphql/types";
import { useState } from "react";

export function BlogList() {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const { data, loading, error, refetch } = useQuery<GetBlogsQuery>(GET_BLOGS);

  const [createBlog, { loading: createLoading }] = useMutation(CREATE_BLOG, {
    onCompleted: () => {
      refetch();
      setTitle("");
      setContent("");
      setAuthor("");
      setShowForm(false);
    },
  });

  const [deleteBlog] = useMutation(DELETE_BLOG, {
    onCompleted: () => {
      refetch();
    },
  });

  const handleCreateBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    await createBlog({
      variables: { title, content, author } as CreateBlogMutationVariables,
    });
  };

  const handleDeleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteBlog({
        variables: { id } as DeleteBlogMutationVariables,
      });
    }
  };

  if (loading) return <div className="p-6">Loading blogs...</div>;
  if (error)
    return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {showForm ? "Cancel" : "Create New Blog"}
        </button>
      </div>

      {showForm && (
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Create New Blog</h3>
          <form onSubmit={handleCreateBlog} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border rounded min-h-[100px]"
              required
            />
            <input
              type="text"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              disabled={createLoading}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
            >
              {createLoading ? "Creating..." : "Create Blog"}
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {data?.blogs?.map((blog) => (
          <div
            key={blog.id}
            className="p-4 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                <p className="text-sm text-gray-500 mb-2">
                  By {blog.author} •{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
              <button
                onClick={() => handleDeleteBlog(blog.id)}
                className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap">{blog.content}</p>
            <p className="text-xs text-gray-400 mt-2">
              Updated: {new Date(blog.updatedAt).toLocaleString()}
            </p>
          </div>
        ))}
        {data?.blogs?.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No blogs yet. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}
