export const getJobInterviewResultIncludes = {
  jobApplication: {
    select: {
      user: {
        select: {
          userProfile: {
            select: {
              id: true,
              name: true,
              email: true,
              profilePhoto: { select: { url: true } },
              contactNumber: true,
            },
          },
        },
      },
      job: {
        include: {
          _count: { select: { jobApplications: true } },
          company: {
            select: {
              companyProfile: {
                select: { companyPhoto: { select: { url: true } } },
              },
            },
          },
        },
      },
    },
  },
};
