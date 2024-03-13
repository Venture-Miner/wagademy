import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgFor, NgIf } from '@angular/common';
import { CardsComponent } from '../../../shared/components/cards/cards.component';

interface Filter {
  name: string;
}

interface ChatBots {
  images: string;
  name: string;
  description: string;
}

@Component({
  selector: 'wagademy-gpt-list',
  standalone: true,
  imports: [
    RouterModule,
    ModalComponent,
    PaginationComponent,
    InputComponent,
    NgFor,
    NgIf,
    CardsComponent,
  ],
  templateUrl: './gpt-list.component.html',
  styleUrl: './gpt-list.component.scss',
})
export class GptListComponent {
  chats: ChatBots[] = [
    {
      images: './assets/img/images/img-card-lens.svg',
      name: 'Lens GPT',
      description: 'Talk about Lens Protocol.',
    },
    {
      images: './assets/img/images/img-card-VM.svg',
      name: 'Venture Miner GPT',
      description: 'Talk about Venture Miner, AI and WEB3 technologies.',
    },
    {
      images: './assets/img/images/img-card-lens.svg',
      name: 'Lens GPT',
      description: 'Talk about Lens Protocol.',
    },
    {
      images: './assets/img/images/img-card-VM.svg',
      name: 'Venture Miner GPT',
      description: 'Talk about Venture Miner, AI and WEB3 technologies.',
    },
  ];
  isLoading = false;
  filters: Filter[] = [
    { name: 'All' },
    { name: 'Featured' },
    { name: 'Most recent' },
    { name: 'Invited' },
  ];
  page = 1;
  take = 1;
  count = 5;

  constructor(public router: Router) {}

  getChatBots() {
    /* TODO document why this method 'getChatBots' is empty */
  }
}
