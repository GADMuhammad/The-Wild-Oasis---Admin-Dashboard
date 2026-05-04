import PostCard from "./PostCard";

export default function App() {
  return (
    <div>
      <PostCard
        post={{
          id: 1,
          title: "Hello, World!",
          content: "This is the first post on our new blog",
          user: { id: 1, name: "Gad" },
        }}
      >
        <PostCard.Title />
        <PostCard.Content />
        <PostCard.UserName />
        <PostCard.Buttons />
      </PostCard>
    </div>
  );
}
