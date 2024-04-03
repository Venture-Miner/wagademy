import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { PaginationComponent } from '../../../shared/components/pagination/pagination.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { ToastService } from '../../../services/toast/toast.service';

interface Filter {
  name: string;
}

@Component({
  selector: 'wagademy-fine-tuning',
  standalone: true,
  imports: [NgClass, NgFor, PaginationComponent, InputComponent],
  templateUrl: './fine-tuning.component.html',
  styleUrl: './fine-tuning.component.scss',
})
export class FineTuningComponent {
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
}
