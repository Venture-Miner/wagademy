import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  CreateChatCompletion,
  CreateInterviewChat,
  CreateInterviewChatResponse,
  FindOneChatHistory,
  GetChatHistory,
} from '@wagademy/types';

@Injectable({
  providedIn: 'root',
})
export class ChatService extends BaseHttpService {
  constructor(private readonly http: HttpClient) {
    super();
  }

  startJobInterview(
    createInterviewChatDto: CreateInterviewChat
  ): Observable<CreateInterviewChatResponse> {
    return this.http.post<CreateInterviewChatResponse>(
      `${this.URL}/chat`,
      createInterviewChatDto
    );
  }

  interviewCreateChatCompletion(
    id: string,
    createChatCompletionDto: CreateChatCompletion
  ): Observable<CreateInterviewChatResponse> {
    return this.http.patch<CreateInterviewChatResponse>(
      `${this.URL}/chat/${id}`,
      createChatCompletionDto
    );
  }

  getChatsHistory(
    getChatHistory: GetChatHistory
  ): Observable<FindOneChatHistory | null> {
    return this.http.get<FindOneChatHistory | null>(
      `${this.URL}/chat/history`,
      {
        params: getChatHistory,
      }
    );
  }
}
