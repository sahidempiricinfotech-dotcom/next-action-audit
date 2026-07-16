"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import { contentRepo } from "@/src/lib/repositories";

const publishingRoles = new Set(["editor", "admin"]);

export async function publishBlogPost(postId: string) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  if (!publishingRoles.has(session.user.role)) return null;

  const post = await contentRepo.getPost(postId);
  if (!post || post.authorId !== session.user.id) return null;

  return contentRepo.publish(postId);
}

export async function updateBlogPost(
  postId: string,
  input: string | FormData,
) {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  if (!publishingRoles.has(session.user.role)) return null;

  const body =
    typeof input === "string" ? input : String(input.get("body") ?? "");
  return contentRepo.update(postId, body);
}
