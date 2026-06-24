import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ChatInterface } from "@/components/chat/ChatInterface";

const Chat = () => {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <h1 className="mb-6 text-3xl font-bold">Chat</h1>
          <ChatInterface />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Chat;
