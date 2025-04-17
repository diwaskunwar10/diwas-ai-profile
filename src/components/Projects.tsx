import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Star, GitFork, RefreshCw, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

// Define the GitHub repository interface
interface Repository {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
  topics: string[];
  is_fork: boolean;
}

export const Projects = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [showAllRepos, setShowAllRepos] = useState(false);

  // Import the API utility
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

  // Query for featured repos (limited)
  const { data: featuredProjects, isLoading: isFeaturedLoading, error: featuredError, refetch: refetchFeatured } = useQuery<Repository[]>({
    queryKey: ['featured-projects'],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/github/top-repos?limit=6`);
      if (!response.ok) {
        throw new Error('Failed to fetch featured projects');
      }
      return response.json();
    },
    enabled: true
  });

  // Query for all repos
  const { data: allProjects, isLoading: isAllLoading, error: allError, refetch: refetchAll } = useQuery<Repository[]>({
    queryKey: ['all-projects'],
    queryFn: async () => {
      const response = await fetch(`${backendUrl}/github/repos`);
      if (!response.ok) {
        throw new Error('Failed to fetch all projects');
      }
      return response.json();
    },
    enabled: showAllRepos // Only fetch when showAllRepos is true
  });

  // Determine which projects to display
  const projects = showAllRepos ? allProjects : featuredProjects;
  const isLoading = showAllRepos ? isAllLoading : isFeaturedLoading;
  const error = showAllRepos ? allError : featuredError;
  const refetch = showAllRepos ? refetchAll : refetchFeatured;

  // Function to toggle between featured and all repositories
  const toggleShowAllRepos = () => {
    setVisibleCards([]); // Reset visible cards for animation
    setShowAllRepos(prev => !prev);
  };

  // Staggered animation effect for cards
  useEffect(() => {
    if (!isLoading && projects) {
      const timer = setTimeout(() => {
        const indices: number[] = [];
        for (let i = 0; i < projects.length; i++) {
          setTimeout(() => {
            setVisibleCards(prev => [...prev, i]);
          }, i * 150); // 150ms stagger between each card
          indices.push(i);
        }
      }, 100);
      return () => clearTimeout(timer);
    }
    // Reset visible cards when loading changes
    return () => setVisibleCards([]);
  }, [isLoading, projects]);

  // Loading skeleton
  if (isLoading) {
    return (
      <section className="py-12 px-4 bg-gray-50" id="projects">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{showAllRepos ? 'All Projects' : 'Featured Projects'}</h2>
            <Button
              onClick={toggleShowAllRepos}
              variant="outline"
              className="flex items-center gap-2 transition-all duration-300"
              disabled={isLoading}
            >
              {showAllRepos ? (
                <>
                  <ChevronUp size={16} />
                  Show Featured
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  View All
                </>
              )}
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                  <Skeleton className="h-4 w-full mt-2" />
                  <Skeleton className="h-4 w-4/5 mt-1" />
                </CardHeader>
                <CardContent>
                  <div className="flex gap-2 mb-4">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-16 rounded-full" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <section className="py-12 px-4 bg-gray-50" id="projects">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">{showAllRepos ? 'All Projects' : 'Featured Projects'}</h2>
            <Button
              onClick={toggleShowAllRepos}
              variant="outline"
              className="flex items-center gap-2 transition-all duration-300"
            >
              {showAllRepos ? (
                <>
                  <ChevronUp size={16} />
                  Show Featured
                </>
              ) : (
                <>
                  <ChevronDown size={16} />
                  View All
                </>
              )}
            </Button>
          </div>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto text-center">
            <p className="text-red-500 mb-4">Failed to load projects</p>
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} />
              Try Again
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 px-4 bg-gray-50 dark:bg-slate-900 transition-colors duration-300" id="projects">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            {showAllRepos ? 'All Projects' : 'Featured Projects'}
          </h2>
          <Button
            onClick={toggleShowAllRepos}
            variant="outline"
            className="flex items-center gap-2 transition-all duration-300"
          >
            {showAllRepos ? (
              <>
                <ChevronUp size={16} />
                Show Featured
              </>
            ) : (
              <>
                <ChevronDown size={16} />
                View All
              </>
            )}
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects?.map((project, index) => (
            <Card
              key={project.name}
              className={`overflow-hidden hover:shadow-lg transition-all duration-300 ${visibleCards.includes(index) ? 'animate-fade-in opacity-100' : 'opacity-0'}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="truncate">{project.name}</span>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label={`Visit ${project.name} repository`}
                  >
                    <ExternalLink size={20} />
                  </a>
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {project.description || "No description available"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.topics?.slice(0, 4).map((topic) => (
                    <Badge key={topic} variant="secondary" className="animate-in fade-in duration-300">
                      {topic}
                    </Badge>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    {project.language && (
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded-full bg-primary"></span>
                        {project.language}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star size={16} className="text-yellow-500" />
                      {project.stars.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-sm text-muted-foreground">
                      <GitFork size={16} />
                      {project.forks.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};