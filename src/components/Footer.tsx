import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { motion } from "framer-motion";

export const Footer = () => {
  const socialLinks = [
    { icon: <Github className="h-5 w-5" />, url: "https://github.com", label: "GitHub" },
    { icon: <Linkedin className="h-5 w-5" />, url: "https://www.linkedin.com/in/diwas-kunwar/", label: "LinkedIn" },
    { icon: <Twitter className="h-5 w-5" />, url: "https://twitter.com", label: "Twitter" },
    { icon: <Mail className="h-5 w-5" />, url: "mailto:diwas.kuwar@gmail.com", label: "Email" }
  ];

  return (
    <footer className="py-12 bg-gray-50 dark:bg-slate-900 transition-colors duration-300 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 md:mb-0"
          >
            <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              Diwas Kunwar
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              AI Engineer & Backend Developer
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex space-x-4"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-white dark:bg-slate-800 rounded-full text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
                aria-label={link.label}
                whileHover={{ y: -3, scale: 1.1 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-gray-500 dark:text-gray-400 text-sm mb-4 md:mb-0"
          >
            © {new Date().getFullYear()} Diwas Kunwar. All rights reserved.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="flex space-x-6 text-sm text-gray-500 dark:text-gray-400"
          >
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Contact</a>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
