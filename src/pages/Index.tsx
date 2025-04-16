
import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { ChatWindow } from "@/components/ChatWindow";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <Footer />
      <ChatWindow />
    </div>
  );
};

export default Index;
