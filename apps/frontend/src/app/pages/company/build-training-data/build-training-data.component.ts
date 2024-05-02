import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { FormFieldComponent } from '../../../shared/components/form-field/form-field.component';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ChatBotService } from '../../../services/chat-bot/chat-bot.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../services/toast/toast.service';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'wagademy-build-training-data',
  standalone: true,
  imports: [
    SelectComponent,
    InputComponent,
    FormFieldComponent,
    ReactiveFormsModule,
    FormsModule,
    ModalComponent,
  ],
  templateUrl: './build-training-data.component.html',
  styleUrl: './build-training-data.component.scss',
})
export class BuildTrainingDataComponent implements OnInit {
  search = new FormGroup({
    role: new FormControl(''),
    content: new FormControl(''),
  });
  messageSets: {
    messages: {
      role: string;
      content: string;
    }[];
  }[] = [];
  filteredMessageSets: {
    messages: {
      role: string;
      content: string;
    }[];
  }[] = [];
  messageForm: FormArray<
    FormGroup<{
      role: FormControl<string | null>;
      content: FormControl<string | null>;
    }>
  >;
  id = '';
  title = new FormControl<string>('', Validators.required);

  constructor(
    private readonly chatbotService: ChatBotService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {
    this.messageForm = new FormArray<
      FormGroup<{
        role: FormControl<string | null>;
        content: FormControl<string | null>;
      }>
    >([]);
    this.search.valueChanges.subscribe((search) => {
      this.filteredMessageSets = this.messageSets.map(({ messages }) => {
        return {
          messages: messages.filter((message) => {
            const role = search.role || '';
            const content = search.content || '';
            return (
              message.role.includes(role) && message.content.includes(content)
            );
          }),
        };
      });
    });
  }

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.chatbotService.getTrainingDataContent(id).subscribe({
          next: (trainingDataContent) => {
            const dataObjects = trainingDataContent.trim().split('\n');
            this.messageSets = dataObjects.map((objString: any) =>
              JSON.parse(objString)
            );
            this.messageSets.forEach(() => {
              this.addNewMessageGroup();
            });
            this.syncFilteredMessageSets();
          },
          error: () => {
            this.toastService.showToast({
              message: 'Error while retrieving training data.',
              type: 'error',
            });
          },
        });
      } else {
        this.addNewExampleSet();
      }
    });
  }

  addNewMessageGroup() {
    const message = new FormGroup({
      role: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
    });
    this.messageForm.push(message);
  }

  addNewExampleSet() {
    this.messageSets.push({
      messages: [],
    });
    this.syncFilteredMessageSets();
    this.addNewMessageGroup();
  }

  syncFilteredMessageSets() {
    this.filteredMessageSets = [...this.messageSets];
  }

  getMessageFormItem(idx: number) {
    return this.messageForm.controls[idx];
  }

  onChangeRoleText(idxMsgSet: number, idxMsg: number, event: Event) {
    this.messageSets[idxMsgSet].messages[idxMsg].role = (
      event.target as HTMLInputElement
    ).value;
    this.syncFilteredMessageSets();
  }

  onChangeContentText(idxMsgSet: number, idxMsg: number, event: Event) {
    this.messageSets[idxMsgSet].messages[idxMsg].content = (
      event.target as HTMLInputElement
    ).value;
    this.syncFilteredMessageSets();
  }

  removeItem(idxMsgSet: number, idxMsg: number) {
    this.messageSets[idxMsgSet].messages.splice(idxMsg, 1);
    if (this.messageSets[idxMsgSet].messages.length === 0) {
      this.messageSets.splice(idxMsgSet, 1);
      this.messageForm.removeAt(idxMsgSet);
    }
    this.syncFilteredMessageSets();
  }

  addMessage(idx: number) {
    const messageForm = this.getMessageFormItem(idx);
    const { content, role } = messageForm.value;
    if (!content || !role) return;
    this.messageSets[idx].messages.push({ content, role });
    this.syncFilteredMessageSets();
    this.messageForm.reset();
  }

  saveItems() {
    const jsonlArray = this.messageSets.map((messageSet) => {
      return JSON.stringify(messageSet);
    });
    const jsonlContent = jsonlArray.join('\n');
    const jsonlFile = this.createJsonlFile(jsonlContent);

    const title = this.title.value!;
    this.uploadTrainindData(title, jsonlFile);
  }

  uploadTrainindData(title: string, trainingData: File) {
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
          this.router.navigate(['/pages/gpts']);
          window.modal['close']();
        },
        error: ({ error }) => {
          this.toastService.showToast({
            message: error.message,
            type: 'error',
          });
          window.modal['close']();
        },
      });
  }

  createJsonlFile(jsonlContent: string) {
    const blob = new Blob([jsonlContent], { type: 'application/json' });
    return new File([blob], 'data.jsonl', { type: 'application/jsonl' });
  }
}
