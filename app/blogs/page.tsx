import { BlogList } from "@/components/blog-list";

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <div className="container mx-auto py-8">
        <BlogList />
      </div>
    </div>
  );
}
