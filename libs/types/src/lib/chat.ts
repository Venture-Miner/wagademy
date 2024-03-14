export type JobInterviewChat = {
  id: string;
  history: OpenAIChatModel[];
  jobApplicationId: string;
};

export type OpenAIChatModel = {
  role: string;
  content: string;
};

export type CreateInterviewChat = {
  jobApplicationId: string;
};

export type CreateChatCompletion = {
  message: string;
};
