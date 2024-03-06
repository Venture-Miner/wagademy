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
  profilePhoto: { url: string } | null;
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
  description: string | null;
  userProfileId: string | null;
  currentlyWorkingHere: boolean;
  startDate: Date;
  endDate: Date | null;
};

export type CreateProfile = {
  name: string;
  email: string;
  dateOfBirth: Date;
  contactNumber: string;
  country: string;
  state: string;
  about: string;
  profilePhoto?: File | Express.Multer.File[];
  education: CreateEducation[];
  professionalExperience: CreateProfessionalExperience[];
  areasOfExpertise: string[];
  skillsAndCompetencies: string[];
};

export type CreateProfileResponse = {
  name: string;
  email: string;
  dateOfBirth: Date;
  contactNumber: string;
  country: string;
  state: string;
  about: string;
  education: Education[];
  professionalExperience: ProfessionalExperience[];
  areasOfExpertise: string[];
  skillsAndCompetencies: string[];
  profilePhoto: { url: string } | null;
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

export type UpdateEducation = {
  id?: string;
  institution?: string;
  course?: string;
  degree?: string;
  description?: string;
  stillStudying?: boolean;
  startDate?: Date;
  endDate?: Date;
};

export type UpdateProfessionalExperience = {
  id?: string;
  company?: string;
  jobTitle?: string;
  description?: string;
  currentlyWorkingHere?: boolean;
  startDate?: Date;
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
  education?: UpdateEducation[];
  professionalExperience?: UpdateProfessionalExperience[];
  areasOfExpertise?: string[];
  skillsAndCompetencies?: string[];
  profilePhoto?: File | Express.Multer.File[];
};

export type UpdateProfileResponse = {
  name: string;
  email: string;
  dateOfBirth: Date;
  contactNumber: string;
  country: string;
  state: string;
  about: string;
  education: Education[];
  professionalExperience: ProfessionalExperience[];
  areasOfExpertise: string[];
  skillsAndCompetencies: string[];
  profilePhoto: { url: string } | null;
};
