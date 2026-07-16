import {
  publishBlogPost,
  updateBlogPost,
} from "@/src/actions/content";

export default function ContentPage() {
  const publish = publishBlogPost.bind(null, "draft-post");
  const update = updateBlogPost.bind(null, "draft-post");

  return (
    <main>
      <h1>Content</h1>
      <form action={publish}>
        <button type="submit">Publish</button>
      </form>
      <form action={update}>
        <textarea name="body" />
        <button type="submit">Update draft</button>
      </form>
    </main>
  );
}
