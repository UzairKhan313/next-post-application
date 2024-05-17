"use server";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export async function createPost(prevState, formData) {
  const title = formData.get("title");
  const image = formData.get("image");
  const content = formData.get("content");

  let errors = [];

  if (!title || title.trim() === 0) {
    errors.push("Title should not be empty");
  }
  if (!content || content.trim() === 0) {
    errors.push("Content should not be empty");
  }
  if (!image) {
    errors.push("Image should not be empty");
  }

  if (errors.length > 0) {
    return { errors };
  }

  await storePost({
    imageUrl: "",
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}
