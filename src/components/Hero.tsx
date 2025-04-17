import { Github, Linkedin, Mail, Code, Database, Brain, Cpu } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { profileService } from "@/services/profile.service";
import { useState, useEffect } from "react";

export const Hero = () => {
  // State for profile data
  const [name, setName] = useState("Diwas Kunwar");
  const [headline, setHeadline] = useState("ML Engineer & Backend Developer");
  const [summary, setSummary] = useState(
    "Experienced developer specializing in AI and backend technologies."
  );
  const [quote, setQuote] = useState(
    "I'm passionate about creating AI solutions that are not just technically impressive, but also ethically sound and genuinely useful."
  );
  const [email, setEmail] = useState("contact@example.com");
  const [linkedinUrl, setLinkedinUrl] = useState("https://www.linkedin.com/in/diwas-kunwar/");
  const [githubUrl, setGithubUrl] = useState("https://github.com");

  // Fetch profile data
  const { data: profileData } = useQuery({
    queryKey: ['profile-data'],
    queryFn: () => profileService.getProfileData(),
  });

  // Update profile data when it's available
  useEffect(() => {
    if (profileData?.profile) {
      setName(profileData.profile.name || name);
      setHeadline(profileData.profile.headline || headline);

      if (profileData.profile.summary) {
        // Extract first paragraph for summary
        const firstParagraph = profileData.profile.summary.split('\n')?.[0] || '';
        setSummary(firstParagraph);

        // Extract a quote-worthy sentence from the summary
        const sentences = profileData.profile.summary.match(/[^.!?]+[.!?]+/g) || [];
        const potentialQuotes = sentences.filter(s =>
          s?.includes("passion") ||
          s?.includes("believe") ||
          s?.includes("mission") ||
          s?.includes("goal") ||
          s?.includes("vision")
        );

        if (potentialQuotes?.length > 0) {
          setQuote(potentialQuotes[0]?.trim() || quote);
        }
      }
    }
  }, [profileData]);

  // Extract roles from headline
  const getRoles = () => {
    const defaultRoles = [
      { title: "AI Engineer", icon: <Cpu className="mr-1 h-3 w-3" />, color: "from-blue-500 to-blue-700" },
      { title: "ML Specialist", icon: <Brain className="mr-1 h-3 w-3" />, color: "from-purple-500 to-purple-700" },
      { title: "Backend Developer", icon: <Code className="mr-1 h-3 w-3" />, color: "from-indigo-500 to-indigo-700" },
      { title: "Data Engineer", icon: <Database className="mr-1 h-3 w-3" />, color: "from-teal-500 to-teal-700" }
    ];

    if (!profileData?.profile?.headline) return defaultRoles;

    // Try to extract roles from headline
    const headlineRoles = profileData.profile.headline
      .split(/[&,|]/)
      .map((role: string) => role.trim())
      .filter(Boolean);

    // If we have roles from headline, use those
    if (headlineRoles.length >= 2) {
      return headlineRoles.map((role: string, index: number) => {
        const icons = [<Cpu className="mr-1 h-3 w-3" />, <Brain className="mr-1 h-3 w-3" />, <Code className="mr-1 h-3 w-3" />, <Database className="mr-1 h-3 w-3" />];
        const colors = ["from-blue-500 to-blue-700", "from-purple-500 to-purple-700", "from-indigo-500 to-indigo-700", "from-teal-500 to-teal-700"];
        return {
          title: role || 'Developer',
          icon: icons[index % icons.length],
          color: colors[index % colors.length]
        };
      });
    }

    // Otherwise use default roles
    return defaultRoles;
  };

  const roles = getRoles();

  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center text-center px-4 bg-gradient-to-b from-blue-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400">
            {name}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-2 justify-center mb-6">
            {roles.map((role, index) => (
              <Badge
                key={index}
                className={`px-3 py-1 text-sm bg-gradient-to-r ${role.color} dark:${role.color.replace('from-', 'from-').replace('to-', 'to-')} text-white`}
              >
                {role.icon} {role.title}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 leading-relaxed max-w-3xl mx-auto">
            {summary}
          </p>

          <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg mb-8 max-w-2xl mx-auto border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300 italic">
              "{quote}"
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="flex flex-wrap gap-4 justify-center">
          <Button
            variant="default"
            size="lg"
            asChild
            className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              GitHub
            </a>
          </Button>
          <Button
            variant="default"
            size="lg"
            asChild
            className="bg-gradient-to-r from-purple-600 to-purple-800 dark:from-purple-500 dark:to-purple-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          <Button
            variant="default"
            size="lg"
            asChild
            className="bg-gradient-to-r from-teal-600 to-teal-800 dark:from-teal-500 dark:to-teal-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <a href={`mailto:${email}`}>
              <Mail className="mr-2 h-5 w-5" />
              Email
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
