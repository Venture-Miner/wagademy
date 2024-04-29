import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ChatService } from '../../../services/chat/chat.service';
import {
  GetChatBotHistoryResponse,
  JobApplicationStatusEnum,
  JobInterviewChat,
  OpenAIChatModel,
} from '@wagademy/types';
import { ToastService } from '../../../services/toast/toast.service';
import { HttpError } from '../../../shared/types/http-error';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { ChatBotService } from '../../../services/chat-bot/chat-bot.service';

@Component({
  selector: 'wagademy-gpt-chat',
  standalone: true,
  imports: [RouterModule, ModalComponent, BackButtonComponent, FormsModule],
  templateUrl: './gpt-chat.component.html',
  styleUrl: './gpt-chat.component.scss',
})
export class GptChatComponent implements OnInit {
  @ViewChild('input', { static: true, read: ElementRef })
  myInput!: ElementRef;
  selectedChat = 'Bot GPT';
  jobApplicationId = '';
  chatBotId = '';
  chatTypeObject: {
    jobInterViewChat: JobInterviewChat;
    chatBot: GetChatBotHistoryResponse;
  } = {
    jobInterViewChat: {
      id: '',
      history: [],
      jobApplicationId: '',
      maxPrompts: 0,
      jobApplication: { applicationStatus: JobApplicationStatusEnum.INVITED },
    },
    chatBot: {
      id: '',
      history: [],
      chatBotId: '',
      userId: '',
      chatBot: { title: '' },
    },
  };
  isCreatingChatCompletion = false;
  isStartingTheChat = false;
  private chatType: 'jobInterViewChat' | 'chatBot' = 'jobInterViewChat';
  userMessage = '';
  count = 0;
  maxCharacters = 1200;
  private readonly RETRIEVE_CHAT_HISTORY_MESSAGE =
    'Error while retrieving chat';
  private readonly NOT_INVITED_MESSAGE =
    'You are not authorized to access the chat because you were not invited';
  private readonly NOT_AUTHORIZED_MESSAGE =
    'Only accounts where the type is physical person can get the chat history';
  private readonly CHAT_COMPLETION_MESSAGE =
    'Error while generating chat completion';
  private readonly APPLICATIONS_URL = '/pages/job-applications-all';
  private readonly HOME_COMPANY_URL = '/pages/home-company';
  private readonly CHATBOT_PAGE = '/pages/chatbot';
  private readonly BAD_REQUEST_HISTORY = 'Chatbot not initialized.';
  private readonly ERROR_INITIATING_CHAT =
    'Error while initiating the chat bot';
  private readonly CHAT_ALREADY_INITIALIZED = 'Chatbot already initialized.';
  private readonly NOT_INVITED_AND_NO_CREDITS =
    'User is not invited nor has credits.';

  constructor(
    private readonly chatService: ChatService,
    private readonly chatBotService: ChatBotService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const jobApplicationId = params.get('jobApplicationId');
      if (jobApplicationId) {
        this.jobApplicationId = jobApplicationId;
        this.selectedChat = 'Interviewer Bot';
        this.chatType = 'jobInterViewChat';
        this.getInterviewChatHistory();
      }
      const chatBotId = params.get('chatBotId');
      if (chatBotId) {
        this.chatBotId = chatBotId;
        this.chatType = 'chatBot';
        this.getChatHistory();
      }
    });
  }

  get getChatType() {
    return this.chatType;
  }

  getInterviewChatHistory() {
    this.isStartingTheChat = true;
    this.chatService
      .getChatsHistory({
        jobApplicationId: this.jobApplicationId,
      })
      .subscribe({
        next: (chatHistory) => {
          if (chatHistory) {
            if (
              chatHistory.jobApplication.applicationStatus !==
              JobApplicationStatusEnum.INVITED
            ) {
              this.toastService.showToast({
                message: this.NOT_INVITED_MESSAGE,
                type: 'warning',
              });
              this.router.navigate([this.APPLICATIONS_URL]);
            }
            this.chatTypeObject.jobInterViewChat = chatHistory;
            this.isStartingTheChat = false;
          } else this.startJobInterview();
        },
        error: ({ error }: { error: HttpError }) => {
          const messageError =
            error.statusCode === 401
              ? error.message
              : this.RETRIEVE_CHAT_HISTORY_MESSAGE;
          this.handleErrorAndRedirectIfUnauthorized(error, messageError);
          this.isStartingTheChat = false;
        },
      });
  }

  getChatHistory() {
    this.isStartingTheChat = true;
    this.chatBotService.getChatHistory(this.chatBotId).subscribe({
      next: (chatHistory) => {
        this.chatTypeObject.chatBot = chatHistory;
        this.isStartingTheChat = false;
        this.selectedChat = chatHistory.chatBot.title;
      },
      error: ({ error }: { error: HttpError }) => {
        if (
          error.statusCode === 400 &&
          error.message === this.BAD_REQUEST_HISTORY
        ) {
          this.initChatBot();
        } else {
          this.isStartingTheChat = false;
          const messageError =
            error.statusCode === 401
              ? error.message
              : this.RETRIEVE_CHAT_HISTORY_MESSAGE;
          this.handleErrorAndRedirectIfUnauthorized(error, messageError);
          this.toastService.showToast({
            message: messageError,
            type: 'error',
          });
        }
      },
    });
  }

  initChatBot() {
    this.chatBotService.initChat(this.chatBotId).subscribe({
      next: (chatHistory) => {
        this.chatTypeObject.chatBot = chatHistory;
        this.isStartingTheChat = false;
      },
      error: ({ error }: { error: HttpError }) => {
        const codes = [401, 400];
        const messageError = codes.includes(error.statusCode)
          ? error.message
          : this.ERROR_INITIATING_CHAT;
        if (error.message === this.NOT_INVITED_AND_NO_CREDITS) {
          window.modal['showModal']();
        } else {
          this.handleErrorAndRedirectIfUnauthorized(error, messageError);
          this.isStartingTheChat = false;
        }
      },
    });
  }

  companyAccessingUnauthorizedRoute(message: string) {
    if (message === this.NOT_AUTHORIZED_MESSAGE)
      this.router.navigate([this.HOME_COMPANY_URL]);
  }

  startJobInterview() {
    this.chatService
      .startJobInterview({
        jobApplicationId: this.jobApplicationId,
      })
      .subscribe({
        next: (chatHistory) => {
          this.chatTypeObject.jobInterViewChat = chatHistory;
          this.isStartingTheChat = false;
        },
        error: ({ error }: { error: HttpError }) => {
          const codes = [401, 404];
          const messageError = codes.includes(error.statusCode)
            ? error.message
            : this.RETRIEVE_CHAT_HISTORY_MESSAGE;
          this.handleErrorAndRedirectIfUnauthorized(error, messageError);
          this.isStartingTheChat = false;
        },
      });
  }

  private handleErrorAndRedirectIfUnauthorized(
    error: HttpError,
    messageError: string
  ) {
    const toastType = error.statusCode === 401 ? 'warning' : 'error';
    this.toastService.showToast({
      message: messageError,
      type: toastType,
    });
    if (toastType === 'warning')
      this.companyAccessingUnauthorizedRoute(error.message);
    else if (this.chatType === 'jobInterViewChat')
      this.router.navigate([this.APPLICATIONS_URL]);
    else this.router.navigate([this.CHATBOT_PAGE]);
  }

  chatCompletion() {
    this.isCreatingChatCompletion = true;
    const message = this.handleMessage();
    if (this.chatType === 'jobInterViewChat')
      this.interviewCreateChatCompletion(message);
    else this.createChatCompletion(message);
  }

  private createChatCompletion(message: string) {
    this.chatBotService
      .createChatCompletion(this.chatTypeObject.chatBot.id, {
        message,
        chatBotId: this.chatBotId,
      })
      .subscribe({
        next: ({ content, role }) => {
          this.chatTypeObject.jobInterViewChat.history.push({
            content: content ?? '',
            role,
          });
          this.isCreatingChatCompletion = false;
        },
        error: ({ error }: { error: HttpError }) => {
          const codes = [400, 401, 404];
          const messageError = codes.includes(error.statusCode)
            ? error.message
            : this.CHAT_COMPLETION_MESSAGE;
          this.handleErrorAndRedirectIfUnauthorized(error, messageError);
          this.isCreatingChatCompletion = false;
        },
      });
  }

  private interviewCreateChatCompletion(message: string) {
    this.chatService
      .interviewCreateChatCompletion(this.chatTypeObject.jobInterViewChat.id, {
        message: message,
      })
      .subscribe({
        next: ({ content, role }) => {
          this.chatTypeObject.jobInterViewChat.history.push({
            content: content ?? '',
            role,
          });
          this.isCreatingChatCompletion = false;
        },
        error: ({ error }: { error: HttpError }) => {
          const codes = [400, 401, 404];
          const messageError = codes.includes(error.statusCode)
            ? error.message
            : this.CHAT_COMPLETION_MESSAGE;
          this.handleErrorAndRedirectIfUnauthorized(error, messageError);
          this.isCreatingChatCompletion = false;
        },
      });
  }

  private handleMessage() {
    const message = this.userMessage;
    this.userMessage = '';
    this.count = 0;
    this.chatTypeObject.jobInterViewChat.history.push({
      content: message,
      role: 'user',
    });
    return message;
  }

  updateCount(newValue: string) {
    this.count = newValue.length;
  }

  focusInput() {
    this.myInput.nativeElement.focus();
  }

  exploreOption() {
    /* TODO document why this method 'exploreOption' is empty */
  }
}
