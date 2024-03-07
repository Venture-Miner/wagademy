import { Component } from '@angular/core';
import { InputComponent } from '../../../shared/components/input/input.component';
import { NgFor, NgIf } from '@angular/common';
import { CardsComponent } from '../../../shared/components/cards/cards.component';

@Component({
  selector: 'wagademy-home',
  standalone: true,
  imports: [InputComponent, NgIf, NgFor, CardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  jobs = [
    {
      images: '',
      name: 'Job name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: '',
      name: 'Job name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: '',
      name: 'Job name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: '',
      name: 'Job name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
  ];
  chatbots = [
    {
      images: '',
      name: 'Chatbots name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: '',
      name: 'Chatbots name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: '',
      name: 'Chatbots name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
    {
      images: '',
      name: 'Chatbots name',
      description:
        'Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu. Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Nam condimentum tempus diam, ultricies sollicitudin erat facilisis eget. Vestibulum rhoncus dui vel eros laoreet consectetur. Vivamus eget elementum ligula, vitae pharetra quam. Nullam at ligula sed metu',
    },
  ];
  isLoading = false;
}
