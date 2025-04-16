
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
          Diwas Kunwar
        </h1>
        <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
          AI Engineer & Backend Developer
        </h2>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed">
          As an AI enthusiast with a strong backend development foundation, I have hands-on experience with Large Language Models
          (LLMs), Retrieval-Augmented Generation (RAG) models, LangChain, and vector databases.
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="https://www.linkedin.com/in/diwas-kunwar/" target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="mailto:diwas.kuwar@gmail.com">
              <Mail className="mr-2 h-5 w-5" />
              Email
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
