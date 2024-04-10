export type JobInterviewChat = {
  id: string;
  history: OpenAIChatModel[];
  jobApplicationId: string;
  maxPrompts: number;
};

export type OpenAIChatModel = {
  role: string;
  content: string;
};

export type CreateInterviewChatResponse = {
  id: string;
  history: OpenAIChatModel[] | any;
  jobApplicationId: string;
  maxPrompts: number;
};

export type CreateInterviewChat = {
  jobApplicationId: string;
};

export type CreateChatCompletion = {
  message: string;
};

export interface ChatCompletionMessage {
  content: string | null;
  role: 'assistant';
  function_call?: FunctionCall;
  tool_calls?: Array<ChatCompletionMessageToolCall>;
}

export interface FunctionCall {
  arguments: string;
  name: string;
}

export interface ChatCompletionMessageToolCall {
  id: string;
  function: FunctionCall;
  type: 'function';
}

export type ChatCompletionRole =
  | 'system'
  | 'user'
  | 'assistant'
  | 'tool'
  | 'function';
