import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { Location, NgClass } from '@angular/common';
import { CardComponent } from '../../../shared/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { InputSearchComponent } from '../../../shared/components/input-search/input-search.component';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';
import { ChatBot, FilterChatbots } from '@wagademy/types';
import { ChatBotService } from '../../../services/chat-bot/chat-bot.service';
import { BehaviorSubject, debounceTime, skip } from 'rxjs';
import { ToastService } from '../../../services/toast/toast.service';

interface Filter {
  name: string;
}

@Component({
  selector: 'wagademy-gpt-list',
  standalone: true,
  imports: [
    RouterModule,
    ModalComponent,
    PaginationComponent,
    InputComponent,
    CardComponent,
    FormsModule,
    NgClass,
    InputSearchComponent,
    LoadingComponent,
  ],
  templateUrl: './gpt-list.component.html',
  styleUrl: './gpt-list.component.scss',
})
export class GptListComponent implements OnInit {
  chats: ChatBot[] = [];
  isLoading = false;
  filters: Filter[] = [
    { name: 'All' },
    { name: 'Featured' },
    { name: 'Most recent' },
    { name: 'Invited' },
  ];
  page = 1;
  take = 10;
  count = 5;
  searchChat$ = new BehaviorSubject('');
  selectedFilter = 'All';

  constructor(
    public router: Router,
    private chatBotService: ChatBotService,
    private toastService: ToastService,
    private location: Location
  ) {}

  ngOnInit() {
    this.getChatBots();
    this.searchChat$.pipe(skip(1), debounceTime(600)).subscribe(() => {
      this.getChatBots();
    });
  }

  getChatBots() {
    this.isLoading = true;
    const filterChatbots: FilterChatbots = {
      search: this.searchChat$.value,
    };

    switch (this.selectedFilter) {
      case 'Featured':
        filterChatbots.featured = true;
        break;
      case 'Most recent':
        filterChatbots.mostRecent = true;
        break;
      case 'Invited':
        filterChatbots.invited = true;
        break;
      case 'All':
        break;
    }

    this.chatBotService
      .findManyChatBots(filterChatbots, {
        take: this.take,
        skip: (this.page - 1) * this.take,
      })
      .subscribe({
        next: ({ count, chatBots }) => {
          this.count = count;
          this.chats = chatBots;
          this.isLoading = false;
        },
        error: () => {
          this.toastService.showToast({
            message: 'Error while loading chatbots',
            type: 'error',
          });
        },
      });
  }

  initChat(id: string) {
    this.router.navigate(['/pages/gptchat'], {
      queryParams: { chatBotId: id },
    });
  }

  exploreOption() {
    //TODO: redirect to somewhere
  }

  cancel() {
    this.location.back();
  }
}
