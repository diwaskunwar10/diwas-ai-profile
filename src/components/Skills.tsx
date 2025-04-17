import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Code, Database, Server, Globe, Lock, Cpu, Layers } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { profileService, CategorizedSkills } from "@/services/profile.service";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  name: string;
  icon: JSX.Element;
  color: string;
  darkColor: string;
  skills: Skill[];
}

export const Skills = () => {
  // Fetch profile data
  const { data: profileData } = useQuery({
    queryKey: ['profile-data'],
    queryFn: () => profileService.getProfileData(),
  });

  // Process skills data
  const getSkillCategories = (): SkillCategory[] => {
    // Default skill categories
    const defaultSkillCategories: SkillCategory[] = [
      {
        name: "Technical",
        icon: <Code className="h-5 w-5" />,
        color: "from-purple-500 to-purple-700",
        darkColor: "dark:from-purple-600 dark:to-purple-800",
        skills: [
          { name: "Python (Programming Language)", level: 93 },
          { name: "Docker", level: 92 },
          { name: "AWS Lambda", level: 89 },
          { name: "API Development", level: 88 },
          { name: "Flask", level: 85 },
          { name: "FastAPI", level: 80 },
          { name: "OAuth", level: 77 },
          { name: "JSON Web Token (JWT)", level: 75 },
          { name: "Git", level: 73 },
          { name: "Java", level: 75 }
        ]
      },
      {
        name: "Data",
        icon: <Database className="h-5 w-5" />,
        color: "from-green-500 to-green-700",
        darkColor: "dark:from-green-600 dark:to-green-800",
        skills: [
          { name: "MongoDB", level: 93 },
          { name: "Databases", level: 92 },
          { name: "Pandas", level: 89 },
          { name: "PostgreSQL", level: 86 }
        ]
      },
      {
        name: "Soft",
        icon: <Brain className="h-5 w-5" />,
        color: "from-blue-500 to-blue-700",
        darkColor: "dark:from-blue-600 dark:to-blue-800",
        skills: [
          { name: "Jira", level: 95 }
        ]
      },
      {
        name: "Other",
        icon: <Server className="h-5 w-5" />,
        color: "from-red-500 to-red-700",
        darkColor: "dark:from-red-600 dark:to-red-800",
        skills: [
          { name: "Large Language Models (LLM)", level: 93 },
          { name: "Pandas", level: 92 },
          { name: "Selenium", level: 89 },
          { name: "Software Development", level: 86 },
          { name: "Network Security", level: 83 }
        ]
      }
    ];

    // If no categorized skills, return default
    if (!profileData?.categorizedSkills || Object.keys(profileData.categorizedSkills).length === 0) {
      return defaultSkillCategories;
    }

    // Process categorized skills from API
    const categorizedSkills: CategorizedSkills = profileData.categorizedSkills;
    const processedCategories: SkillCategory[] = [];

    // Map category names to icons and colors
    const categoryIcons: Record<string, JSX.Element> = {
      "technical": <Code className="h-5 w-5" />,
      "data": <Database className="h-5 w-5" />,
      "soft": <Brain className="h-5 w-5" />,
      "other": <Server className="h-5 w-5" />
    };

    const categoryColors: Record<string, { color: string; darkColor: string }> = {
      "technical": { color: "from-purple-500 to-purple-700", darkColor: "dark:from-purple-600 dark:to-purple-800" },
      "data": { color: "from-green-500 to-green-700", darkColor: "dark:from-green-600 dark:to-green-800" },
      "soft": { color: "from-blue-500 to-blue-700", darkColor: "dark:from-blue-600 dark:to-blue-800" },
      "other": { color: "from-red-500 to-red-700", darkColor: "dark:from-red-600 dark:to-red-800" }
    };

    // Process each category
    Object.entries(categorizedSkills).forEach(([category, skills]) => {
      if (!skills || skills.length === 0) return;

      const icon = categoryIcons[category] || <Code className="h-6 w-6" />;
      const { color, darkColor } = categoryColors[category] || {
        color: "from-indigo-500 to-indigo-700",
        darkColor: "dark:from-indigo-600 dark:to-indigo-800"
      };

      // Format category name
      const formattedCategory = category.charAt(0).toUpperCase() + category.slice(1);

      // Create skills with levels
      const skillsWithLevels = skills.map((skill, index) => {
        // Generate a level based on the position in the array
        const baseLevel = 95 - (index * 3);
        const level = Math.max(75, baseLevel);

        return { name: skill, level };
      });

      processedCategories.push({
        name: formattedCategory,
        icon,
        color,
        darkColor,
        skills: skillsWithLevels
      });
    });

    // Sort categories to ensure Technical is first and Data is second
    const sortedCategories = processedCategories.sort((a, b) => {
      if (a.name === "Technical") return -1;
      if (b.name === "Technical") return 1;
      if (a.name === "Data") return -1;
      if (b.name === "Data") return 1;
      return 0;
    });

    return sortedCategories.length > 0 ? sortedCategories : defaultSkillCategories;
  };

  const skillCategories = getSkillCategories();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-16 bg-black dark:bg-slate-900 transition-colors duration-300" id="skills">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-400 dark:to-purple-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Technical Expertise
        </motion.h2>

        <motion.p
          className="text-gray-300 dark:text-gray-300 text-center mb-10 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          A diverse skill set honed through years of practical experience and continuous learning
        </motion.p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              className="bg-black/90 dark:bg-slate-800 rounded-xl shadow-md p-4 border border-gray-800 dark:border-gray-700"
              variants={itemVariants}
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center mb-4">
                <div className={`p-2 rounded-md bg-gradient-to-r ${category.color} ${category.darkColor} text-white mr-2`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold text-white dark:text-gray-100">{category.name}</h3>
              </div>

              <div className="space-y-3">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="mb-3">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="cursor-pointer">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-300 dark:text-gray-300">{skill.name}</span>
                              <span className="text-xs font-medium text-gray-400 dark:text-gray-400">{skill.level}%</span>
                            </div>
                            <div className="w-full bg-gray-800 dark:bg-gray-700 rounded-full h-2">
                              <motion.div
                                className={`h-2 rounded-full bg-gradient-to-r ${category.color} ${category.darkColor}`}
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                viewport={{ once: true }}
                                transition={{
                                  duration: 1.5,
                                  ease: "easeOut",
                                  times: [0, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                                  easings: ["easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut"],
                                }}
                                animate={{
                                  width: [`${skill.level * 0.9}%`, `${skill.level}%`, `${skill.level * 0.97}%`, `${skill.level}%`],
                                  transition: {
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    duration: 2,
                                    ease: "easeInOut"
                                  }
                                }}
                              />
                            </div>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="bg-gray-900 text-white text-xs p-2 shadow-lg rounded-md border border-gray-700">
                          <div className="text-sm">
                            <p className="font-semibold">{skill.name}</p>
                            <p className="text-xs text-gray-300">Proficiency: {skill.level}%</p>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
