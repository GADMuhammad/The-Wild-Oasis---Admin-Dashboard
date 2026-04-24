import { createContext, PropsWithChildren, useContext } from "react";
type Post = {
  id?: number;
  title?: string;
  content?: string;
  user?: { id: number; name: string };
};
type PostCardProps = PropsWithChildren & { post: Post };

const PostCardContext = createContext<{ post: Post } | undefined>(undefined);
export function usePostCardContext() {
  const context = useContext(PostCardContext);
  if (!context) throw new Error("Context must be used within a PostCard.");
  return context;
}

export default function PostCard({ children, post }: PostCardProps) {
  return (
    <PostCardContext.Provider value={{ post }}>
      <div className="w=[300px] flex flex-col gap-2 rounded-md bg-neutral-800 p-2">
        {children}
      </div>
    </PostCardContext.Provider>
  );
}

PostCard.Title = function PostCardTitle() {
  const { post } = usePostCardContext();
  return <h2 className="text-lg font-semibold">{post.title}</h2>;
};

PostCard.UserName = function PostCardUserName() {
  const { post } = usePostCardContext();
  return <p className="text-sm text-neutral-400">By {post.user?.name}</p>;
};

PostCard.Content = function PostCardContent() {
  const { post } = usePostCardContext();
  return <p>{post.content}</p>;
};

PostCard.Buttons = function PostCardButtons() {
  return (
    <div className="flex flex-row gap-2">
      <button type="button">Read More</button>
      <button type="button">Comments</button>
    </div>
  );
};
