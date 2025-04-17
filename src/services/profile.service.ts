import { getApiUrl } from '@/lib/api';

/**
 * Profile data interfaces
 */

export interface ProfileEducation {
  schoolName: string;
  degreeName: string;
  fieldOfStudy: string;
  dateRange: string;
  description?: string;
  logoUrl?: string;
  startDate?: { month: number; year: number };
  endDate?: { month: number; year: number };
}

export interface ProfileExperience {
  name: string;
  title: string;
  duration: string;
  description: string;
  employmentType: string;
  location: string;
}

export interface ProfileData {
  name: string;
  headline: string;
  location: string;
  industry?: string;
  summary: string;
  picture?: string;
  publicIdentifier?: string;
  address?: string;
}

export interface ProfileCertification {
  name: string;
  authority: string;
  url?: string;
  credentialId?: string;
  issueDate?: number;
  issueYear?: number;
  formattedDate?: string;
}

export interface CategorizedSkills {
  technical: string[];
  data: string[];
  soft: string[];
  other: string[];
  [key: string]: string[];
}

export interface ProfileResponse {
  skills: string[];
  profile: ProfileData;
  experience: {
    companies: ProfileExperience[];
  };
  education: ProfileEducation[];
  certifications: ProfileCertification[];
  categorizedSkills: CategorizedSkills;
}

/**
 * Default profile data to use when API fails
 */
const DEFAULT_PROFILE: ProfileResponse = {
  skills: [
    "Python", "JavaScript", "TypeScript", "React", "Node.js", 
    "MongoDB", "PostgreSQL", "FastAPI", "Docker", "AWS",
    "Machine Learning", "Data Analysis", "LLMs", "Vector Databases"
  ],
  profile: {
    name: "Diwas Kunwar",
    headline: "ML Engineer & Backend Developer",
    location: "Kathmandu, Nepal",
    summary: "Experienced developer specializing in AI and backend technologies with a focus on creating practical solutions to complex problems.",
    industry: "Computer Software"
  },
  experience: {
    companies: [
      {
        name: "NextAI",
        title: "ML Engineer",
        duration: "06/2024 - Present",
        description: "Developing AI solutions and implementing machine learning models.",
        employmentType: "Full-time",
        location: "Kathmandu, Nepal"
      },
      {
        name: "Inspiring Lab",
        title: "Python Intern",
        duration: "11/2023 - 03/2024",
        description: "Worked on data extraction and API development projects.",
        employmentType: "Internship",
        location: "Lalitpur, Nepal"
      }
    ]
  },
  education: [
    {
      schoolName: "Kathmandu College of Technology",
      degreeName: "Bachelor's degree",
      fieldOfStudy: "Computer Science",
      dateRange: "10/2019 - 10/2024"
    }
  ],
  certifications: [
    {
      name: "AI For Everyone",
      authority: "DeepLearning.AI",
      issueYear: 2024,
      formattedDate: "Issued 2024"
    }
  ],
  categorizedSkills: {
    technical: ["Python", "JavaScript", "TypeScript", "React", "Node.js", "FastAPI", "Docker"],
    data: ["MongoDB", "PostgreSQL", "Data Analysis"],
    soft: ["Communication", "Problem Solving"],
    other: ["Machine Learning", "LLMs", "Vector Databases"]
  }
};

/**
 * Service for fetching profile data
 */
class ProfileService {
  /**
   * Fetch profile data from the API
   * @returns Profile data
   */
  async getProfileData(): Promise<ProfileResponse> {
    try {
      console.log('Fetching profile data from API...');
      const response = await fetch(getApiUrl('linkedin/data'));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch profile data: ${response.status}`);
      }
      
      // Parse the response
      const data = await response.json();
      console.log('Profile data fetched successfully:', data);
      
      // Return the data with fallbacks for missing fields
      return {
        skills: data.skills || DEFAULT_PROFILE.skills,
        profile: data.profile || DEFAULT_PROFILE.profile,
        experience: {
          companies: data.experience?.companies || DEFAULT_PROFILE.experience.companies
        },
        education: data.education || DEFAULT_PROFILE.education,
        certifications: data.certifications || DEFAULT_PROFILE.certifications,
        categorizedSkills: data.categorizedSkills || DEFAULT_PROFILE.categorizedSkills
      };
    } catch (error) {
      console.error('Error fetching profile data:', error);
      // Return default data on error
      return DEFAULT_PROFILE;
    }
  }
  
  /**
   * Fetch GitHub contributions data
   * @returns GitHub contributions data
   */
  async getGitHubContributions() {
    try {
      const response = await fetch(getApiUrl('github/contributions'));
      
      if (!response.ok) {
        throw new Error(`Failed to fetch GitHub contributions: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching GitHub contributions:', error);
      return null;
    }
  }
}

export const profileService = new ProfileService();
