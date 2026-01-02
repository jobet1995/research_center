import { gql } from "@apollo/client";

// Example mutations - replace with your actual mutations
export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

export const CREATE_BLOG = gql`
  mutation CreateBlog($title: String!, $content: String!, $author: String!) {
    createBlog(title: $title, content: $content, author: $author) {
      id
      title
      content
      author
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($id: ID!, $title: String, $content: String) {
    updateBlog(id: $id, title: $title, content: $content) {
      id
      title
      content
      author
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_BLOG = gql`
  mutation DeleteBlog($id: ID!) {
    deleteBlog(id: $id)
  }
`;
