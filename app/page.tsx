import Image from "next/image";
import Link from "next/link";
import { BlogList } from "@/components/blog-list";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <div className="flex min-h-screen items-center justify-center">
        <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
              Research Center
            </h1>
            <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              Welcome to the Research Center. Explore our blog posts powered by
              GraphQL.
            </p>
            <Link
              href="/blogs"
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              View All Blogs
            </Link>
          </div>
        </main>
      </div>

      {/* Blog Section */}
      <div className="container mx-auto py-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Latest Blogs from GraphQL</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Blogs fetched from GraphQL API
          </p>
        </div>
        <BlogList />
      </div>
    </div>
  );
}
