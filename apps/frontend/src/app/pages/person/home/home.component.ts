import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { CardComponent } from '../../../shared/components/card/card.component';
import {
  FindManyJobsUserView,
  JobUserView,
  FindManyChatBotsResponse,
  ChatBot,
} from '@wagademy/types';
import { JobService } from '../../../services/job/job.service';
import { forkJoin } from 'rxjs';
import { RouterModule } from '@angular/router';
import { ChatBotService } from '../../../services/chat-bot/chat-bot.service';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

@Component({
  selector: 'wagademy-home',
  standalone: true,
  imports: [InputComponent, CardComponent, RouterModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  jobs: JobUserView[] = [];
  chatbots: ChatBot[] = [];
  courses: {
    images: string;
    name: string;
    description: string;
  }[] = [];
  isLoading = false;

  constructor(
    private readonly jobService: JobService,
    private readonly chatbotService: ChatBotService
  ) {}

  ngOnInit(): void {
    this.listJobsAndChatbots();
  }

  listJobsAndChatbots() {
    this.isLoading = true;
    const jobs = this.jobService.findManyJobsUserView(
      { mostRecent: true },
      { skip: 0, take: 4 }
    );
    const chatbots = this.chatbotService.findManyChatBots(
      { mostRecent: true },
      { skip: 0, take: 4 }
    );
    const combinedRequests = {
      jobs,
      chatbots,
    };
    forkJoin(combinedRequests).subscribe({
      next: (response: {
        jobs: FindManyJobsUserView;
        chatbots: FindManyChatBotsResponse;
      }) => {
        this.jobs = response.jobs.jobs;
        this.chatbots = response.chatbots.chatBots;
        this.isLoading = false;
      },
    });
  }
}
