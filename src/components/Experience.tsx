import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Calendar, ChevronRight, Code } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { profileService, ProfileExperience } from "@/services/profile.service";

interface ExperienceWithExtras {
  company: string;
  position: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  skills: { name: string; color: string }[];
}

export const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Fetch profile data
  const { data: profileData } = useQuery({
    queryKey: ['profile-data'],
    queryFn: () => profileService.getProfileData(),
  });

  // Process experience data
  const getExperiences = (): ExperienceWithExtras[] => {
    // Default experiences to use if no data is available
    const defaultExperiences: ExperienceWithExtras[] = [
      {
        company: "NextAI",
        location: "Kathmandu",
        position: "AI Engineer",
        period: "06/2024 - Present",
        description: "Architected and deployed sophisticated conversational AI systems with advanced NLP capabilities.",
        achievements: [
          "Developed a state-of-the-art RAG-based chatbot system with 92% accuracy in domain-specific knowledge retrieval",
          "Engineered real-time analytics dashboard with MongoDB aggregation pipelines",
          "Optimized backend services with FastAPI, achieving 3x performance improvement"
        ],
        skills: [
          { name: "LangChain", color: "bg-blue-500" },
          { name: "MongoDB", color: "bg-green-500" },
          { name: "FastAPI", color: "bg-teal-500" },
          { name: "Vector Databases", color: "bg-purple-500" }
        ]
      },
      {
        company: "Inspiring Lab",
        location: "Lalitpur",
        position: "ML & Data Engineering Specialist",
        period: "11/2023 - 02/2024",
        description: "Led the development of intelligent data extraction systems utilizing advanced web scraping techniques.",
        achievements: [
          "Created an automated data extraction framework that processed 10,000+ pages daily with 99.7% accuracy",
          "Implemented OAuth2 authentication system with JWT, enhancing security while maintaining performance"
        ],
        skills: [
          { name: "Beautiful Soup", color: "bg-blue-500" },
          { name: "Selenium", color: "bg-yellow-500" },
          { name: "JWT", color: "bg-red-500" },
          { name: "PostgreSQL", color: "bg-blue-600" }
        ]
      }
    ];

    // If no profile data or no companies, return default experiences
    if (!profileData?.experience?.companies || profileData.experience.companies.length === 0) {
      return defaultExperiences;
    }

    // Map API experiences to our format
    return profileData.experience.companies.map((exp: ProfileExperience) => {
      // Generate skills based on the global skills list
      const expSkills = profileData.skills?.slice(0, 6) || [];

      // Generate skill colors based on skill name
      const skillsWithColors = expSkills.map(skill => {
        // Generate a consistent color based on the skill name
        const colors = [
          "bg-blue-500", "bg-green-500", "bg-teal-500", "bg-red-500",
          "bg-purple-500", "bg-indigo-500", "bg-yellow-500", "bg-pink-500"
        ];
        const colorIndex = skill.length % colors.length;
        return { name: skill, color: colors[colorIndex] };
      });

      // Generate achievements based on title and company
      const achievements = [
        `Led key initiatives as ${exp.title} at ${exp.name}`,
        `Collaborated with cross-functional teams to deliver high-quality solutions`,
        `Implemented best practices and improved workflow efficiency`
      ];

      return {
        company: exp.name,
        location: exp.location || 'Remote',
        position: exp.title,
        period: exp.duration,
        description: exp.description || `Worked as ${exp.title} at ${exp.name}, focusing on delivering high-quality solutions.`,
        achievements: achievements,
        skills: skillsWithColors
      };
    });
  };

  const experiences = getExperiences();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300" id="experience">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Professional Journey
        </motion.h2>

        <motion.p
          className="text-gray-600 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          A track record of transforming complex technical challenges into elegant, efficient solutions
        </motion.p>

        <motion.div
          className="space-y-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className={`relative border-l-2 pl-8 ml-4 ${index === hoveredIndex ? 'border-purple-500' : 'border-blue-500'} transition-colors duration-300`}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 shadow-md shadow-blue-200 dark:shadow-blue-900/30" />

              <motion.div
                className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
              >
                <div className="flex flex-wrap justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{exp.position}</h3>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium mt-1">
                      <Briefcase className="h-4 w-4 mr-1" />
                      {exp.company}
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-1" />
                      {exp.location}
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                    <Calendar className="h-3 w-3 mr-1" />
                    {exp.period}
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{exp.description}</p>

                <div className="mb-6">
                  {exp.achievements.map((achievement, i) => (
                    <div key={i} className="flex items-start mb-2">
                      <ChevronRight className="h-5 w-5 text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-600 dark:text-gray-400 text-sm ml-1">{achievement}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  <TooltipProvider delayDuration={0}>
                    {exp.skills.map((skill, i) => (
                      <Tooltip key={i}>
                        <TooltipTrigger asChild>
                          <div className={`${skill.color} text-white text-xs px-2 py-1 rounded-full flex items-center cursor-pointer hover:opacity-90 transition-opacity`}>
                            <Code className="h-3 w-3 mr-1" />
                            {skill.name}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="bg-gray-900 text-white text-xs p-2">
                          <p>Expert in {skill.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </TooltipProvider>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
