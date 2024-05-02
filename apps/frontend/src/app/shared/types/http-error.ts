export type HttpError = {
  statusCode: number;
  message: string;
  error?: string;
  existingTemplateId?: string;
};
