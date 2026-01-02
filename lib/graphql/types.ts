// Type definitions for GraphQL queries and mutations

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

export interface GetHelloQuery {
  hello: string;
}

export interface GetUsersQuery {
  users: User[];
}

export interface GetBlogsQuery {
  blogs: Blog[];
}

export interface GetBlogQuery {
  blog: Blog | null;
}

export interface CreateUserMutation {
  createUser: User;
}

export interface CreateUserMutationVariables {
  name: string;
  email: string;
}

export interface CreateBlogMutation {
  createBlog: Blog;
}

export interface CreateBlogMutationVariables {
  title: string;
  content: string;
  author: string;
}

export interface UpdateBlogMutation {
  updateBlog: Blog;
}

export interface UpdateBlogMutationVariables {
  id: string;
  title?: string;
  content?: string;
}

export interface DeleteBlogMutation {
  deleteBlog: boolean;
}

export interface DeleteBlogMutationVariables {
  id: string;
}
