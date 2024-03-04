export type UserProfile = {
  id: string;
  name: string;
  email: string;
  dateOfBirth: Date;
  contactNumber: string;
  country: string;
  state: string;
  about: string;
  userId: string;
  education: Education[];
  professionalExperience: ProfessionalExperience[];
  areasOfExpertise: string[];
  skillsAndCompetencies: string[];
  profilePhoto: { url: string };
};

export type Education = {
  id: string;
  institution: string;
  course: string;
  description?: string;
  userProfileId?: string;
};

export type ProfessionalExperience = {
  id: string;
  company: string;
  jobTitle: string;
  description?: string;
  userProfileId?: string;
};
