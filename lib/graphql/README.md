# GraphQL Setup

This project uses Apollo Client for GraphQL queries and mutations.

## Structure

- `lib/apollo-client.ts` - Apollo Client configuration for client-side
- `lib/apollo-provider.tsx` - Apollo Provider component for React
- `lib/graphql/queries.ts` - GraphQL queries
- `lib/graphql/mutations.ts` - GraphQL mutations
- `app/api/graphql/route.ts` - GraphQL API endpoint (Apollo Server)

## Usage

### Client Components

```tsx
"use client";

import { useQuery } from "@apollo/client";
import { GET_USERS } from "@/lib/graphql/queries";

export function MyComponent() {
  const { data, loading, error } = useQuery(GET_USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return <div>{/* render data */}</div>;
}
```

### Server Components

For server components, you can use the GraphQL API route directly or fetch from your external GraphQL endpoint.

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_GRAPHQL_URL=/api/graphql
```

Or point to an external GraphQL endpoint:

```env
NEXT_PUBLIC_GRAPHQL_URL=https://your-graphql-api.com/graphql
```

## Customizing

1. **Update Schema**: Edit `app/api/graphql/route.ts` to define your GraphQL schema
2. **Add Queries**: Add new queries to `lib/graphql/queries.ts`
3. **Add Mutations**: Add new mutations to `lib/graphql/mutations.ts`
4. **Update Resolvers**: Modify resolvers in `app/api/graphql/route.ts`

## Example Component

See `components/graphql-example.tsx` for a complete example of using queries and mutations.
