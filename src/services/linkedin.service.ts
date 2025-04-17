import { getApiUrl, getBackendUrl } from '@/lib/api';

export interface LinkedInEducation {
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface LinkedInExperience {
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  skills?: string[];
}

export interface LinkedInSkill {
  name: string;
  endorsements?: number;
  category?: string;
}

export interface LinkedInCompany {
  name: string;
  title: string;
  duration: string;
  description: string;
  employmentType: string;
  location: string;
}

export interface LinkedInExperienceData {
  companies: LinkedInCompany[];
}

export interface LinkedInEducationData {
  schoolName: string;
  degreeName: string;
  fieldOfStudy: string;
  dateRange: string;
  description?: string;
  logoUrl?: string;
  startDate?: { month: number; year: number };
  endDate?: { month: number; year: number };
}

export interface LinkedInProfileData {
  name: string;
  headline: string;
  location: string;
  industry?: string;
  summary: string;
  picture?: string;
  publicIdentifier?: string;
  address?: string;
}

export interface LinkedInCategorizedSkills {
  technical: string[];
  data: string[];
  soft: string[];
  other: string[];
  [key: string]: string[];
}

export interface LinkedInProfile {
  name: string;
  headline: string;
  location: string;
  summary: string;
  pictureUrl?: string;
  experiences?: LinkedInExperience[];
  education?: LinkedInEducation[];
  skills?: string[];
  languages?: { name: string; proficiency?: string }[];
  certifications?: { name: string; authority: string; date?: string }[];

  // New data structure
  profile?: LinkedInProfileData;
  experience?: LinkedInExperienceData;
  education?: LinkedInEducationData[];
  categorizedSkills?: LinkedInCategorizedSkills;
}

class LinkedInService {
  async getProfileData(): Promise<LinkedInProfile> {
    try {
      // For debugging - log the backend URL and API URL
      const backendUrl = getBackendUrl();
      console.log('Backend URL:', backendUrl);

      const apiUrl = getApiUrl('linkedin/data');
      console.log('Fetching LinkedIn data from:', apiUrl);

      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch LinkedIn data: ${response.status}`);
      }

      // For debugging - log the raw response
      const rawData = await response.text();
      console.log('Raw LinkedIn API response:', rawData);

      // Parse the JSON data
      let data;
      try {
        data = JSON.parse(rawData);
      } catch (parseError) {
        console.error('Error parsing LinkedIn data:', parseError);
        throw new Error('Invalid JSON response from LinkedIn API');
      }

      console.log('Parsed LinkedIn data:', data);

      // Check if we have a valid data structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid data structure from LinkedIn API');
      }

      // Process the data based on the structure
      // If we have the new structure with profile, experience, etc.
      if (data?.profile) {
        console.log('Using new LinkedIn data structure');
        return {
          // Use profile data for basic info
          name: data?.profile?.name || 'Diwas Kunwar',
          headline: data?.profile?.headline || 'AI Engineer & Backend Developer',
          location: data?.profile?.location || 'Kathmandu, Nepal',
          summary: data?.profile?.summary || 'Experienced developer specializing in AI and backend technologies.',
          pictureUrl: data?.profile?.picture,

          // Include the full data structure
          profile: data.profile,
          experience: data.experience,
          education: Array.isArray(data?.education) ? data.education : [],
          skills: Array.isArray(data?.skills) ? data.skills : [],
          categorizedSkills: data.categorizedSkills || {}
        };
      }

      // Fall back to the old structure
      return {
        name: data?.name || 'Diwas Kunwar',
        headline: data?.headline || 'AI Engineer & Backend Developer',
        location: data?.location || 'Kathmandu, Nepal',
        summary: data?.summary || 'Experienced developer specializing in AI and backend technologies.',
        experiences: Array.isArray(data?.experiences) ? data.experiences : [],
        education: Array.isArray(data?.education) ? data.education : [],
        skills: Array.isArray(data?.skills) ? data.skills : []
      };
    } catch (error) {
      console.error('Error fetching LinkedIn profile data:', error);
      // Return default data on error
      return {
        name: 'Diwas Kunwar',
        headline: 'AI Engineer & Backend Developer',
        location: 'Kathmandu, Nepal',
        summary: 'Experienced developer specializing in AI and backend technologies.',
        experiences: [],
        education: [],
        skills: []
      };
    }
  }
}

export const linkedInService = new LinkedInService();
