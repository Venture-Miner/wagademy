import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { BackButtonComponent } from '../../../shared/components/back-button/back-button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'wagademy-interview-gpt',
  standalone: true,
  imports: [NgClass, InputComponent, NgFor, BackButtonComponent, FormsModule],
  templateUrl: './interview-gpt.component.html',
  styleUrl: './interview-gpt.component.scss',
})
export class InterviewGptComponent {
  isQuestionOpen: boolean[] = [];
  name = 'Job Title';
  questions: string[] = [];
  editQuestion: boolean[] = [];
  newQuestionText = '';

  addQuestion(): void {
    if (this.newQuestionText.trim()) {
      this.questions.push(this.newQuestionText.trim());
      this.newQuestionText = '';
      this.editQuestion.push(false);
    }
  }

  toggleQuestion(index: number): void {
    this.isQuestionOpen[index] = !this.isQuestionOpen[index];
  }

  removeQuestion(event: Event, index: number): void {
    event.stopPropagation();
    this.questions.splice(index, 1);
    this.editQuestion.splice(index, 1);
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
}
