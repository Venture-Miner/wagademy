import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalComponent } from '../../../shared/modal/modal.component';

@Component({
  selector: 'wagademy-gpt-chat',
  standalone: true,
  imports: [RouterModule, ModalComponent],
  templateUrl: './gpt-chat.component.html',
  styleUrl: './gpt-chat.component.scss',
})
export class GptChatComponent {
  selectedChat = 'Lens GPT';
  message = 'Lorem ipsum';

  exploreOption() {
    /* TODO document why this method 'exploreOption' is empty */
  }
}
