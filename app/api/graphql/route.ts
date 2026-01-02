import { NextRequest, NextResponse } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { gql } from "graphql-tag";

// Example schema - replace with your actual schema
const typeDefs = gql`
  type Query {
    hello: String
    users: [User!]!
    blogs: [Blog!]!
    blog(id: ID!): Blog
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Blog {
    id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createUser(name: String!, email: String!): User!
    createBlog(title: String!, content: String!, author: String!): Blog!
    updateBlog(id: ID!, title: String, content: String): Blog!
    deleteBlog(id: ID!): Boolean!
  }
`;

// In-memory data store (replace with actual database)
let blogs = [
  {
    id: "1",
    title: "Getting Started with Next.js",
    content:
      "Next.js is a React framework that enables you to create full-stack web applications. In this blog post, we'll explore the basics of Next.js and how to get started with your first project.",
    author: "John Doe",
    createdAt: new Date("2024-01-15").toISOString(),
    updatedAt: new Date("2024-01-15").toISOString(),
  },
  {
    id: "2",
    title: "Understanding GraphQL",
    content:
      "GraphQL is a query language for APIs and a runtime for executing those queries. It provides a more efficient, powerful, and flexible alternative to REST APIs.",
    author: "Jane Smith",
    createdAt: new Date("2024-01-20").toISOString(),
    updatedAt: new Date("2024-01-20").toISOString(),
  },
  {
    id: "3",
    title: "TypeScript Best Practices",
    content:
      "TypeScript adds static type definitions to JavaScript. This guide covers best practices for writing maintainable and scalable TypeScript code.",
    author: "John Doe",
    createdAt: new Date("2024-01-25").toISOString(),
    updatedAt: new Date("2024-01-25").toISOString(),
  },
];

// Example resolvers - replace with your actual resolvers
const resolvers = {
  Query: {
    hello: () => "Hello from GraphQL!",
    users: () => [
      { id: "1", name: "John Doe", email: "john@example.com" },
      { id: "2", name: "Jane Smith", email: "jane@example.com" },
    ],
    blogs: () => blogs,
    blog: (_: unknown, { id }: { id: string }) => {
      return blogs.find((blog) => blog.id === id) || null;
    },
  },
  Mutation: {
    createUser: (
      _: unknown,
      { name, email }: { name: string; email: string },
    ) => {
      return { id: String(Date.now()), name, email };
    },
    createBlog: (
      _: unknown,
      {
        title,
        content,
        author,
      }: { title: string; content: string; author: string },
    ) => {
      const newBlog = {
        id: String(Date.now()),
        title,
        content,
        author,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      blogs.push(newBlog);
      return newBlog;
    },
    updateBlog: (
      _: unknown,
      { id, title, content }: { id: string; title?: string; content?: string },
    ) => {
      const blog = blogs.find((b) => b.id === id);
      if (!blog) {
        throw new Error("Blog not found");
      }
      if (title) blog.title = title;
      if (content) blog.content = content;
      blog.updatedAt = new Date().toISOString();
      return blog;
    },
    deleteBlog: (_: unknown, { id }: { id: string }) => {
      const index = blogs.findIndex((b) => b.id === id);
      if (index === -1) {
        return false;
      }
      blogs.splice(index, 1);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler<NextRequest>(server, {
  context: async (req) => ({ req }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
