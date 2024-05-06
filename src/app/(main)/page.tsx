import FriendsNav from "./friendsNav";
import ChatSection from "./chat-section";

export default function Home() {
  return (
    <main className="grow padding-x grid gap-6 grid-cols-[20rem,1fr]">
      <FriendsNav />
      <ChatSection />
    </main>
  );
}
