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
  degree: string;
  description: string | null;
  stillStudying: boolean;
  startDate: Date;
  endDate: Date | null;
  userProfileId: string | null;
};

export type ProfessionalExperience = {
  id: string;
  company: string;
  jobTitle: string;
  description?: string;
  userProfileId?: string;
};

export type CreateProfile = {
  name: string;
  email: string;
  dateOfBirth: Date;
  contactNumber: string;
  country: string;
  state: string;
  about: string;
  profilePhoto: File | Express.Multer.File[];
  education: CreateEducation[];
  professionalExperience: CreateProfessionalExperience[];
  areasOfExpertise: string[];
  skillsAndCompetencies: string[];
};

export type CreateEducation = {
  institution: string;
  course: string;
  degree: string;
  description?: string;
  stillStudying: boolean;
  startDate: Date;
  endDate?: Date;
};

export type CreateProfessionalExperience = {
  company: string;
  jobTitle: string;
  description?: string;
  currentlyWorkingHere: boolean;
  startDate: Date;
  endDate?: Date;
};

export type UpdateProfile = {
  name?: string;
  email?: string;
  dateOfBirth?: Date;
  contactNumber?: string;
  country?: string;
  state?: string;
  about?: string;
  userId?: string;
  education?: Education[];
  professionalExperience?: ProfessionalExperience[];
  areasOfExpertise?: string[];
  skillsAndCompetencies?: string[];
  profilePhoto?: File | Express.Multer.File[];
};
