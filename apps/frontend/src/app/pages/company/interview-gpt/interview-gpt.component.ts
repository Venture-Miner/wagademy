import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../../../services/job/job.service';
import { ToastService } from '../../../services/toast/toast.service';

@Component({
  selector: 'wagademy-interview-gpt',
  standalone: true,
  imports: [NgClass, InputComponent, BackButtonComponent, FormsModule],
  templateUrl: './interview-gpt.component.html',
  styleUrl: './interview-gpt.component.scss',
})
export class InterviewGptComponent implements OnInit {
  isQuestionOpen: boolean[] = [];
  name = 'Job Title';
  questions: string[] = [];
  editQuestion: boolean[] = [];
  newQuestionText = '';
  private jobId = '';
  hasMinimumQuestions = false;
  hasMaximumQuestions = false;
  isSaving = false;
  private readonly minimumNumberOfQuestions = 5;
  private readonly maxNumberOfQuestions = 20;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly jobService: JobService,
    private readonly toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const jobId = params.get('jobId');
      if (jobId) this.jobId = jobId;
    });
    this.getAiQuestions();
  }

  getAiQuestions() {
    this.jobService.findOneJobCompanyView(this.jobId).subscribe({
      next: (job) => {
        if (!job) {
          this.toastService.showToast({
            message: 'This job does not exist',
            type: 'error',
          });
        } else {
          this.questions.push(...job.aiInterviewQuestions);
          this.name = job.title;
        }
      },
      error: () => {
        const message = 'Error while retrieving interview questions';
        this.toastService.showToast({
          message,
          type: 'error',
        });
      },
    });
  }

  addQuestion(): void {
    if (this.newQuestionText.trim()) {
      this.questions.push(this.newQuestionText.trim());
      this.newQuestionText = '';
      this.editQuestion.push(false);
      this.updateQuestionStatus();
    }
  }

  toggleQuestion(index: number): void {
    this.isQuestionOpen[index] = !this.isQuestionOpen[index];
  }

  removeQuestion(event: Event, index: number): void {
    event.stopPropagation();
    this.questions.splice(index, 1);
    this.editQuestion.splice(index, 1);
    this.updateQuestionStatus();
  }

  updateQuestionStatus(): void {
    this.hasMinimumQuestions =
      this.questions.length >= this.minimumNumberOfQuestions;
    this.hasMaximumQuestions =
      this.questions.length === this.maxNumberOfQuestions;
  }

  onFocus(index: number): void {
    this.editQuestion[index] = true;
  }

  onBlur(index: number): void {
    this.confirmEdit(index);
  }

  confirmEdit(index: number): void {
    this.editQuestion[index] = false;
  }

  startEdit(index: number): void {
    this.editQuestion[index] = true;
  }

  saveQuestions() {
    this.isSaving = true;
    this.jobService
      .configureAIQuestions(this.jobId, {
        aiInterviewQuestions: this.questions,
      })
      .subscribe({
        next: () => {
          this.toastService.showToast({
            message: 'Questions successfully saved',
            type: 'success',
          });
          this.resetValidators();
        },
        error: () => {
          this.toastService.showToast({
            message: 'Questions successfully saved',
            type: 'success',
          });
          this.isSaving = false;
        },
      });
  }

  resetValidators() {
    this.isSaving = false;
    this.hasMinimumQuestions = false;
  }
}
