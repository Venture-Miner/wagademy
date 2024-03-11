export const JobUserViewSelect = (userId: string) => {
  return {
    id: true,
    title: true,
    description: true,
    jobType: true,
    allocation: true,
    company: {
      select: {
        companyProfile: {
          select: {
            id: true,
            name: true,
            about: true,
            companyPhoto: { select: { url: true } },
          },
        },
      },
    },
    jobApplications: {
      where: { userId },
      select: {
        id: true,
        job: {
          select: {
            company: { select: { name: true } },
            title: true,
          },
        },
        applicationStatus: true,
        createdAt: true,
        updatedAt: true,
      },
    },
    jobStatus: true,
    createdAt: true,
    updatedAt: true,
  };
};
