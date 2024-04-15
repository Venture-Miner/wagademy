export type FilterChatbots = {
  invited?: boolean;
  featured?: boolean;
  mostRecent?: boolean;
};

export type CreateFineTuningJob = {
  title: string;
  description: string;
  trainingDataId: string;
};

export type UploadTrainingData = {
  trainingData: Express.Multer.File;
};
