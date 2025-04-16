
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ExternalLink } from "lucide-react";

export const Projects = () => {
  const projects = [
    {
      title: "Disease Detection Application",
      date: "Nov 2023",
      description: "Mobile Application Using Java and Python",
      github: "https://github.com"
    },
    {
      title: "Stock Market Analysis",
      date: "Feb 2024",
      description: "Analyse using pandas & plot stock price using candlestick",
      github: "https://github.com"
    },
    {
      title: "Document Chatbot",
      date: "Mar 2024",
      description: "PDF Text Extraction and Processing for Text Chunking Vector Store and Embed & Conversational AI Integration",
      github: "https://github.com"
    },
    {
      title: "Document Search",
      date: "Apr 2024",
      description: "Document chunking algorithm and embedding, combined vector store and retrievers",
      github: "https://github.com"
    },
    {
      title: "Nepali Text OCR",
      date: "2024",
      description: "Using EasyOCR and OpenCV",
      github: "https://github.com"
    }
  ];

  return (
    <section className="py-20 bg-gray-50" id="projects">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 text-center">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex justify-between items-start">
                  <span>{project.title}</span>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                    <ExternalLink size={20} />
                  </a>
                </CardTitle>
                <CardDescription>{project.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{project.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
