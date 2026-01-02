import { gql } from "@apollo/client";

// Example queries - replace with your actual queries
export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export const GET_HELLO = gql`
  query GetHello {
    hello
  }
`;

export const GET_BLOGS = gql`
  query GetBlogs {
    blogs {
      id
      title
      content
      author
      createdAt
      updatedAt
    }
  }
`;

export const GET_BLOG = gql`
  query GetBlog($id: ID!) {
    blog(id: $id) {
      id
      title
      content
      author
      createdAt
      updatedAt
    }
  }
`;
