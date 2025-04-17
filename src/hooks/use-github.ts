import { useCallback, useState } from 'react';
import { githubService } from '@/services/github.service';
import { useToast } from '@/hooks/use-toast';

export const useGithub = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchRepositories = useCallback(async () => {
    try {
      setLoading(true);
      const repos = await githubService.getRepositories();
      return repos;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch repositories",
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const fetchTopRepositories = useCallback(async (limit: number) => {
    try {
      setLoading(true);
      const repos = await githubService.getTopRepositories(limit);
      return repos;
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch top repositories",
        variant: "destructive"
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    loading,
    fetchRepositories,
    fetchTopRepositories
  };
};