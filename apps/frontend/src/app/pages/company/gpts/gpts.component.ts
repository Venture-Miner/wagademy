import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ToastService } from '../../../services/toast/toast.service';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { ModalComponent } from '../../../shared/modal/modal.component';
import { RouterModule } from '@angular/router';

interface Filter {
  name: string;
}

@Component({
  selector: 'wagademy-gpts',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    PaginationComponent,
    InputComponent,
    SelectComponent,
    ModalComponent,
    RouterModule,
  ],
  templateUrl: './gpts.component.html',
  styleUrl: './gpts.component.scss',
})
export class GptsComponent {
  gptType: 'FINETUNING' | 'TRAININGDATA' = 'FINETUNING';
  selectedFilter = 'All';
  filters: Filter[] = [
    { name: 'All' },
    { name: 'Processing' },
    { name: 'Success' },
    { name: 'Fail' },
  ];
  gpts = [
    {
      title: 'Title',
      description: 'Description',
      image: '',
      status: 'Processing',
    },
    {
      title: 'Title',
      description: 'Description',
      image: './assets/img/images/img-card-content.png',
      status: 'Success',
    },
    {
      title: 'Title',
      description: 'Description',
      image: './assets/img/images/img-card-content.png',
      status: 'Fail',
    },
  ];
  gptsTraining = [
    {
      title: 'trainigexample.json',
    },
    {
      title: 'trainigexample.json',
    },
    {
      title: 'trainigexample.json',
    },
  ];
  page = 1;
  take = 1;
  count = 5;
  isDragging = false;
  files: File[] = [];

  constructor(private readonly toastService: ToastService) {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDragLeave() {
    this.isDragging = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    const files = event.dataTransfer?.files;
    if (files) this.checkFiles(files);
  }

  onFileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files) this.checkFiles(files);
  }

  checkFiles(files: FileList) {
    if (files) {
      if (files?.length > 10) {
        this.toastService.showToast({
          message: 'You can only upload a maximum of 10 files.',
          type: 'error',
        });
        return;
      }
    }
  }

  createFineTurning() {
    this.toastService.showToast({
      message: 'Success! Fine tuning successfully created.',
      type: 'success',
    });
  }

  removeFineTurning() {
    this.toastService.showToast({
      message: 'Success! Fine tuning successfully removed.',
      type: 'success',
    });
  }

  download() {
    //
  }

  view() {
    //
  }

  removeTrainingData() {
    //
  }

  removeDataTraining() {
    this.toastService.showToast({
      message: 'Success! Training data successfully removed.',
      type: 'success',
    });
  }

  createTrainingData() {
    this.toastService.showToast({
      message: 'Success! Training data created successfully.',
      type: 'success',
    });
  }
}
