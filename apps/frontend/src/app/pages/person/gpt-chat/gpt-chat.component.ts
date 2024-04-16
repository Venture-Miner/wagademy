import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { ChatService } from '../../../services/chat/chat.service';
import {
  JobApplicationStatusEnum,
  JobInterviewChat,
  OpenAIChatModel,
} from '@wagademy/types';
import { ToastService } from '../../../services/toast/toast.service';
import { HttpError } from '../../../shared/types/http-error';
import { FormsModule } from '@angular/forms';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';

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
  chatTypeObject: {
    jobInterViewChat: JobInterviewChat;
    chatBot: { history: OpenAIChatModel[] };
  } = {
    jobInterViewChat: {
      id: '',
      history: [],
      jobApplicationId: '',
      maxPrompts: 0,
      jobApplication: { applicationStatus: JobApplicationStatusEnum.INVITED },
    },
    chatBot: { history: [] },
  };
  isCreatingChatCompletion = false;
  isStartingTheChat = false;
  private chatType: 'jobInterViewChat' | 'chatBot' = 'jobInterViewChat';
  pageUrl = {
    jobInterViewChat: 'job-applications-all',
    chatBot: 'chatbot',
  };
  userMessage = '';
  count = 0;
  maxCharacters = 1200;

  constructor(
    private readonly chatService: ChatService,
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
                message:
                  'You are not authorized to access the chat because you were not invited',
                type: 'warning',
              });
              this.router.navigate(['/pages/job-applications-all']);
            }
            this.chatTypeObject.jobInterViewChat = chatHistory;
            this.isStartingTheChat = false;
          } else this.startJobInterview();
        },
        error: ({ error }: { error: HttpError }) => {
          const type = error.statusCode === 401 ? 'warning' : 'error';
          const messageError =
            error.statusCode === 401
              ? error.message
              : 'Error while retrieving chat';
          this.toastService.showToast({
            message: messageError,
            type: type,
          });
          if (type === 'warning')
            this.companyAccessingUnauthorizedRoute(error.message);
          this.isStartingTheChat = false;
        },
      });
  }

  companyAccessingUnauthorizedRoute(message: string) {
    if (
      message ===
      'Only accounts where the type is physical person can get the chat history.'
    )
      this.router.navigate(['/pages/home-company']);
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
            : 'Error while retrieving chat';
          const type = error.statusCode === 401 ? 'warning' : 'error';
          this.toastService.showToast({
            message: messageError,
            type: type,
          });
          if (type === 'warning')
            this.companyAccessingUnauthorizedRoute(error.message);
          else this.router.navigate(['/pages/job-applications-all']);
          this.isStartingTheChat = false;
        },
      });
  }

  chatCompletion() {
    this.isCreatingChatCompletion = true;
    const message = this.handleMessage();
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
            : 'Error while generating chat completion';
          const type = error.statusCode === 401 ? 'warning' : 'error';
          this.toastService.showToast({
            message: messageError,
            type: type,
          });
          this.isCreatingChatCompletion = false;
          if (codes.includes(error.statusCode)) {
            if (type === 'warning')
              this.companyAccessingUnauthorizedRoute(error.message);
            else this.router.navigate(['/pages/job-applications-all']);
          }
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
