type Post = {
  id: number;
  title: string;
  content: string;
  user?: { id: number; name: string };
};

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="w=[300px] flex flex-col gap-2 rounded-md bg-neutral-800 p-2">
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p>{post.content}</p>
      <p className="text-sm text-neutral-400">By {post?.user?.name}</p>
      <div className="flex flex-row gap-2">
        <button type="button">Read More</button>
        <button type="button">Comments</button>
      </div>
    </div>
  );
}
