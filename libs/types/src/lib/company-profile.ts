export type CompanyProfile = {
  id: string;
  name: string;
  about: string;
  companyPhoto: { url: string } | null;
  backgroundPhoto: { url: string } | null;
  areaOfExpertise: string;
  whatIsTheCompanyLookingFor: string[];
  userId: string;
};

export type CreateCompanyProfile = {
  name: string;
  about: string;
  companyPhoto?: File | Express.Multer.File[];
  areaOfExpertise: string;
  whatIsTheCompanyLookingFor: string[];
};

export type CreateCompanyProfileResponse = {
  id: string;
  name: string;
  about: string;
  companyPhoto: { url: string } | null;
  backgroundPhoto: { url: string } | null;
  areaOfExpertise: string;
  whatIsTheCompanyLookingFor: string[];
  userId: string;
};

export type UpdateCompanyProfile = {
  name?: string;
  about?: string;
  companyPhoto?: File | Express.Multer.File[];
  backgroundPhoto?: File | Express.Multer.File[];
  areaOfExpertise?: string;
  whatIsTheCompanyLookingFor?: string[];
};

export type UpdateCompanyProfileResponse = {
  id: string;
  name: string;
  about: string;
  companyPhoto: { url: string } | null;
  backgroundPhoto: { url: string } | null;
  areaOfExpertise: string;
  whatIsTheCompanyLookingFor: string[];
  userId: string;
};

export type FindOneCompanyProfileResponse = {
  id: string;
  name: string;
  about: string;
  companyPhoto: { url: string } | null;
  backgroundPhoto: { url: string } | null;
  areaOfExpertise: string;
  whatIsTheCompanyLookingFor: string[];
  userId: string;
};
