import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';

@Component({
  selector: 'wagademy-interview-gpt',
  standalone: true,
  imports: [NgClass, InputComponent],
  templateUrl: './interview-gpt.component.html',
  styleUrl: './interview-gpt.component.scss',
})
export class InterviewGptComponent {
  isQuestionOpen: boolean[] = [];
  name = 'Job Title';
  description =
    'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.';
  questions: string[] = [];

  addQuestion(): void {
    const questionNumber = this.questions.length + 1;
    const newQuestion = `Question ${questionNumber}`;
    this.questions.push(newQuestion);
    this.isQuestionOpen.push(false);
  }

  toggleQuestion(index: number): void {
    this.isQuestionOpen[index] = !this.isQuestionOpen[index];
  }

  removeQuestion(event: Event, index: number): void {
    event.stopPropagation();
    this.questions.splice(index, 1);
    this.isQuestionOpen.splice(index, 1);
  }
}
