import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";

// Working with dynamic metadata.
export async function generateMetadata(data) {
  const posts = await getPosts();
  const numberOfPost = posts.length;
  return {
    title: `Browse all our ${numberOfPost} Posts`,
    description: "Browse all our Posts",
  };
}

export default async function FeedPage() {
  const posts = await getPosts();
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
