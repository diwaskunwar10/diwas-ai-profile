import { HttpBase } from '@/lib/httpbase';
import { getBackendUrl } from '@/lib/api';

interface Repository {
  name: string;
  stars: number;
  description: string;
}

export class GithubService extends HttpBase {
  constructor() {
    // Use the backend URL from environment variables
    super(`${getBackendUrl()}/github`);
  }

  async getRepositories(): Promise<Repository[]> {
    return this.get<Repository[]>('/repos');
  }

  async getTopRepositories(limit: number): Promise<Repository[]> {
    return this.get<Repository[]>(`/top-repos?limit=${limit}`);
  }

  async getRepositoryDetails(repoName: string): Promise<Repository> {
    return this.get<Repository>(`/repos/${repoName}`);
  }
}

export const githubService = new GithubService();