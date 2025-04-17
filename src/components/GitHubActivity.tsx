import { motion } from "framer-motion";
import { ContributionsChart } from "./ContributionsChart";
import { Github } from "lucide-react";
import { Button } from "./ui/button";

export const GitHubActivity = () => {
  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300" id="github-activity">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            GitHub Activity
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            A visual representation of my open source contributions and coding activity
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <ContributionsChart />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-8 text-center"
        >
          <Button 
            variant="default" 
            size="lg" 
            asChild
            className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-700 dark:to-gray-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5" />
              View GitHub Profile
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
