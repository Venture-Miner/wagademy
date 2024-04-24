import { Injectable } from '@angular/core';
import { BaseHttpService } from '../base-http/base-http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  FilterChatbots,
  FindManyChatBotsResponse,
  InitChatBotResponse,
  Pagination,
} from '@wagademy/types';

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

  initChat(id: string): Observable<InitChatBotResponse> {
    return this.http.post<InitChatBotResponse>(
      `${this.URL}/chat-bot/init-chat-bot/${id}`,
      {}
    );
  }
}
