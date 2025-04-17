import { Hero } from "@/components/Hero";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { GitHubActivity } from "@/components/GitHubActivity";
import { ChatWindow } from "@/components/ChatWindow";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Hero />
      <Experience />
      <Skills />
      <Projects />
      <GitHubActivity />
      <Footer />
      <ChatWindow />
    </div>
  );
};

export default Index;
