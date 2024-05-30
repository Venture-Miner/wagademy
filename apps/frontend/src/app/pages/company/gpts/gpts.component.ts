import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ToastService } from '../../../services/toast/toast.service';
import {
  SelectComponent,
  SelectItem,
} from '../../../shared/components/select/select.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { Router, RouterModule } from '@angular/router';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ChatBotService,
  CreateFineTuningJob,
} from '../../../services/chat-bot/chat-bot.service';
import {
  ChatBot,
  ChatBotStatusEnum,
  FilterCompanyChatbots,
  TrainingData,
} from '@wagademy/types';
import { forkJoin } from 'rxjs';
import { LoadingComponent } from '../../../shared/components/loading/loading.component';

interface Filter {
  name: string;
}

@Component({
  selector: 'wagademy-gpts',
  standalone: true,
  imports: [
    NgClass,
    PaginationComponent,
    InputComponent,
    SelectComponent,
    ModalComponent,
    RouterModule,
    FormFieldComponent,
    ReactiveFormsModule,
    LoadingComponent,
  ],
  templateUrl: './gpts.component.html',
  styleUrl: './gpts.component.scss',
})
export class GptsComponent implements OnInit {
  gptType: 'FINETUNING' | 'TRAININGDATA' = 'FINETUNING';
  selectedFilter = 'All';
  filters: Filter[] = [
    { name: 'All' },
    { name: 'Processing' },
    { name: 'Success' },
    { name: 'Fail' },
  ];
  chatBots: ChatBot[] = [];
  trainingData: TrainingData[] = [];
  pageFineTuning = 1;
  takeFineTuning = 10;
  countFineTuning = 0;
  pageTrainingData = 1;
  takeTrainingData = 10;
  countTrainingData = 0;
  isDragging = false;
  isDownloading = false;
  thumbnail: File | null = null;
  trainingDataFile: File | null = null;
  fineTuningForm = this.fb.group({
    title: ['', [Validators.required]],
    description: ['', Validators.required],
    trainingDataId: ['', [Validators.required]],
  });
  trainingDataForm = this.fb.group({
    title: ['', [Validators.required]],
  });
  chatBotToDelete = '';
  trainingDataToDelete = '';
  trainingDataDropdownOptions: SelectItem<string>[] = [];
  isLoading = false;
  filterChatbots: FilterCompanyChatbots = {};
  isRemovingTrainingData = false;

  constructor(
    private readonly toastService: ToastService,
    private readonly fb: FormBuilder,
    private readonly chatbotService: ChatBotService,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.isLoading = true;

    const trainingData = this.chatbotService.findManyTrainingData({
      take: this.takeTrainingData,
      skip: (this.pageTrainingData - 1) * this.takeTrainingData,
    });
    const dropdownOptions =
      this.chatbotService.getTrainingDataDropdownOptions();
    this.handleStatusChange();
    const chatbots = this.chatbotService.findManyCompanyChatBots(
      this.filterChatbots,
      {
        take: this.takeFineTuning,
        skip: (this.pageFineTuning - 1) * this.takeFineTuning,
      }
    );

    const combinedRequests = {
      trainingData,
      chatbots,
      dropdownOptions,
    };
    forkJoin(combinedRequests).subscribe({
      next: (response) => {
        this.isLoading = false;
        const { trainingData, chatbots, dropdownOptions } = response;

        this.trainingDataDropdownOptions = [
          ...Object.values(dropdownOptions).map(({ id, title }) => {
            return { value: id, label: title };
          }),
        ];

        this.countFineTuning = chatbots.count;
        this.chatBots = chatbots.chatBots;
        this.countTrainingData = trainingData.count;
        this.trainingData = trainingData.trainingData;
      },
      error: () => {
        this.isLoading = false;
        this.toastService.showToast({
          message: 'Error while retrieving data.',
          type: 'error',
        });
      },
    });
  }

  getTrainingDataDropdownOptions() {
    this.chatbotService.getTrainingDataDropdownOptions().subscribe({
      next: (trainingDataDropdownOptions) => {
        this.trainingDataDropdownOptions = [
          ...Object.values(trainingDataDropdownOptions).map(({ id, title }) => {
            return { value: id, label: title };
          }),
        ];
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while retrieving training data dropdown options.',
          type: 'error',
        });
      },
    });
  }

  handleStatusChange() {
    switch (this.selectedFilter) {
      case 'All':
        this.filterChatbots = {};
        break;
      case 'Processing':
        this.filterChatbots.status = ChatBotStatusEnum.PROCESSING;
        break;
      case 'Success':
        this.filterChatbots.status = ChatBotStatusEnum.SUCCESS;
        break;
      case 'Fail':
        this.filterChatbots.status = ChatBotStatusEnum.FAIL;
        break;
    }
  }

  findManyCompanyChatbots() {
    this.isLoading = true;
    this.handleStatusChange();
    this.chatbotService
      .findManyCompanyChatBots(this.filterChatbots, {
        take: this.takeFineTuning,
        skip: (this.pageFineTuning - 1) * this.takeFineTuning,
      })
      .subscribe({
        next: ({ chatBots, count }) => {
          this.countFineTuning = count;
          this.chatBots = chatBots;
          this.isLoading = false;
        },
        error: () => {
          this.toastService.showToast({
            message: 'Error while retrieving fine tunings',
            type: 'error',
          });
          this.isLoading = false;
        },
      });
  }

  findManyTrainingData() {
    this.chatbotService
      .findManyTrainingData({
        take: this.takeTrainingData,
        skip: (this.pageTrainingData - 1) * this.takeTrainingData,
      })
      .subscribe({
        next: ({ trainingData, count }) => {
          this.countTrainingData = count;
          this.trainingData = trainingData;
        },
        error: () => {
          this.toastService.showToast({
            message: 'Error while retrieving training data',
            type: 'error',
          });
        },
      });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDropThumbnail(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.thumbnail = files[0];
    }
  }

  onThumbnailChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.thumbnail = files[0];
    }
  }

  onDropTrainingData(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) {
      this.trainingDataFile = files[0];
    }
  }

  onTrainingDataChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) {
      this.trainingDataFile = files[0];
    }
  }

  createFineTuning() {
    const createFineTuningJob = {
      thumbnail: this.thumbnail,
      ...this.fineTuningForm.value,
    } as CreateFineTuningJob;

    this.chatbotService.createFineTuningJob(createFineTuningJob).subscribe({
      next: () => {
        this.toastService.showToast({
          message: 'Success! Fine tuning successfully created.',
          type: 'success',
        });
        this.trainingDataForm.reset();
        this.removeThumbnail();
        this.findManyCompanyChatbots();
        window.modal['close']();
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error creating fine tuning.',
          type: 'error',
        });
      },
    });
  }

  removeThumbnail() {
    this.thumbnail = null;
  }

  removeTrainingDataFile() {
    this.trainingDataFile = null;
  }

  removeFineTuning() {
    this.chatbotService.deleteChatBot(this.chatBotToDelete).subscribe({
      next: () => {
        this.toastService.showToast({
          message: 'Success! Fine tuning successfully removed.',
          type: 'success',
        });
        this.findManyCompanyChatbots();
        window.modal['close']();
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while deleting fine tuning',
          type: 'error',
        });
      },
    });
  }

  download(id: string, title: string) {
    this.isDownloading = true;
    this.chatbotService.getTrainingDataContent(id).subscribe({
      next: (data) => {
        this.downloadTextAsJsonl(data, title);
        this.isDownloading = false;
      },
      error: () => {
        this.toastService.showToast({
          message: 'Error while downloading training data.',
          type: 'error',
        });
        this.isDownloading = false;
      },
    });
  }

  downloadTextAsJsonl(text: string, filename: string) {
    const blob = new Blob([text], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  }

  view(id: string) {
    this.router.navigate(['/pages/build-training-data'], {
      queryParams: {
        id,
      },
    });
  }

  removeTrainingData() {
    this.isRemovingTrainingData = true;
    this.chatbotService
      .deleteTrainingData(this.trainingDataToDelete)
      .subscribe({
        next: () => {
          this.toastService.showToast({
            message: 'Success! Training data successfully removed.',
            type: 'success',
          });
          this.findManyTrainingData();
          this.getTrainingDataDropdownOptions();
          this.isRemovingTrainingData = false;
          window.modal['close']();
        },
        error: () => {
          this.isRemovingTrainingData = false;
          this.toastService.showToast({
            message: 'Error while removing training data.',
            type: 'error',
          });
        },
      });
  }

  createTrainingData() {
    const title = this.trainingDataForm.value.title;
    const trainingData = this.trainingDataFile;
    if (!title || !trainingData) return;
    this.isLoading = true;
    this.chatbotService
      .uploadTrainingData({
        title,
        trainingData,
      })
      .subscribe({
        next: () => {
          this.toastService.showToast({
            message: 'Success! Training data created successfully.',
            type: 'success',
          });
          this.trainingDataForm.reset();
          this.removeTrainingDataFile();
          this.findManyTrainingData();
          this.getTrainingDataDropdownOptions();
          window.modal['close']();
          this.isLoading = false;
        },
        error: ({ error }) => {
          this.toastService.showToast({
            message: error.message,
            type: 'error',
          });
          this.isLoading = false;
        },
      });
  }

  getImageSrc(file: File): string {
    return URL.createObjectURL(file);
  }
}
