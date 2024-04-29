import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateChatBotCompletion,
  CreateChatCompletionResponse,
  CreateFineTuningJobResponse,
  FilterChatbots,
  FilterCompanyChatbots,
  FindManyChatBotsResponse,
  FindManyTrainingDataResponse,
  GetChatBotHistoryResponse,
  GetTrainingDataContentResponse,
  InitChatBotResponse,
  Pagination,
  TrainingData,
  UploadTrainingDataResponse,
} from '@wagademy/types';
import { ObjToFormData } from '../../shared/utils/utils/obj-to-formdata';

type UploadTrainingData = {
  title: string;
  trainingData: File;
};

export type CreateFineTuningJob = {
  title: string;
  description: string;
  trainingDataId: string;
  thumbnail: File;
};

@Injectable({
  providedIn: 'root',
})
export class ChatBotService extends BaseHttpService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  findManyChatBots(
    filterChatbots: FilterChatbots,
    pagination: Pagination
  ): Observable<FindManyChatBotsResponse> {
    return this.http.get<FindManyChatBotsResponse>(`${this.URL}/chat-bot`, {
      params: { ...filterChatbots, ...pagination },
    });
  }

  getTrainingDataDropdownOptions(): Observable<
    Pick<TrainingData, 'id' | 'title'>[]
  > {
    return this.http.get<Pick<TrainingData, 'id' | 'title'>[]>(
      `${this.URL}/chat-bot/training-data-dropdown-options`
    );
  }

  findManyCompanyChatBots(
    filterChatbots: FilterCompanyChatbots,
    pagination: Pagination
  ): Observable<FindManyChatBotsResponse> {
    return this.http.get<FindManyChatBotsResponse>(
      `${this.URL}/chat-bot/company`,
      {
        params: { ...filterChatbots, ...pagination },
      }
    );
  }

  deleteChatBot(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/chat-bot/${id}`);
  }

  deleteTrainingData(id: string): Observable<void> {
    return this.http.delete<void>(`${this.URL}/chat-bot/training-data/${id}`);
  }

  initChat(id: string): Observable<InitChatBotResponse> {
    return this.http.post<InitChatBotResponse>(
      `${this.URL}/chat-bot/init-chat-bot/${id}`,
      {}
    );
  }

  findManyTrainingData(
    pagination: Pagination
  ): Observable<FindManyTrainingDataResponse> {
    return this.http.get<FindManyTrainingDataResponse>(
      `${this.URL}/chat-bot/training-data`,
      {
        params: pagination,
      }
    );
  }

  getTrainingDataContent(
    id: string
  ): Observable<GetTrainingDataContentResponse> {
    return this.http.get<GetTrainingDataContentResponse>(
      `${this.URL}/chat-bot/training-data/${id}`,
      { responseType: 'text' as 'json' }
    );
  }

  uploadTrainingData(
    uploadTrainingData: UploadTrainingData
  ): Observable<UploadTrainingDataResponse> {
    return this.http.post<UploadTrainingDataResponse>(
      `${this.URL}/chat-bot/training-data`,
      ObjToFormData(uploadTrainingData)
    );
  }

  createFineTuningJob(
    createFineTuningJob: CreateFineTuningJob
  ): Observable<CreateFineTuningJobResponse> {
    return this.http.post<CreateFineTuningJobResponse>(
      `${this.URL}/chat-bot`,
      ObjToFormData(createFineTuningJob)
    );
  }

  getChatHistory(id: string): Observable<GetChatBotHistoryResponse> {
    return this.http.get<GetChatBotHistoryResponse>(
      `${this.URL}/chat-bot/history/${id}`
    );
  }

  createChatCompletion(
    createChatBotCompletion: CreateChatBotCompletion
  ): Observable<CreateChatCompletionResponse> {
    return this.http.post<CreateChatCompletionResponse>(
      `${this.URL}/chat-bot/chat-completion`,
      createChatBotCompletion
    );
  }
}
