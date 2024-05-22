"use client";
import { formatDate } from "@/lib/format";
import { useOptimistic } from "react";
import Image from "next/image";

import LikeButton from "./like-icon";
import { togglePostLikeStatus } from "@/actions/posts";

function Post({ post, action }) {
  // Otimizing dynamic images.
  const imageLoader = (config) => {
    const startUrl = config.src.split("upload/")[0];
    const endUrl = config.src.split("upload/")[1];
    const trasformation = `w_200,q_${config.quality}`;
    return `${startUrl}upload/${trasformation}/${endUrl}`;
  };

  return (
    <article className="post">
      <div className="post-image">
        <Image
          loader={imageLoader}
          src={post.image}
          alt={post.title}
          // fill
          // sizes=""
          width={200}
          height={120} // Height and width not much important becouse we already mention it on dynamic url.
          quality={50}
        />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts,
    (prevPosts, updatedPostId) => {
      const updatedPostIndex = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndex === -1) {
        return prevPosts;
      }
      const updatedPost = { ...prevPosts[updatedPostIndex] };
      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPostArray = [...prevPosts];
      newPostArray[updatedPostIndex] = updatedPost;
      return newPostArray;
    }
  );

  if (!optimisticPosts || posts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function updategPost(postId) {
    updateOptimisticPosts(postId);
    await togglePostLikeStatus(postId);
  }

  return (
    <ul className="posts">
      {optimisticPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updategPost} />
        </li>
      ))}
    </ul>
  );
}
