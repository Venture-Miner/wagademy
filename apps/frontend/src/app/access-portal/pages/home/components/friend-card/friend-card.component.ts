import { Component, Input } from '@angular/core';

@Component({
  selector: 'wagademy-friend-card',
  templateUrl: './friend-card.component.html',
  styleUrls: ['./friend-card.component.css'],
})
export class FriendCardComponent {
  @Input() publication: any;

  sanitizeUrl(url: string | null) {
    url = url || '';
    if (url.includes('http')) return url;
    if (url.includes('ipfs://'))
      return `https://ipfs.io/ipfs/${url.split('ipfs://')[1]}`;
    if (url.includes('ar://'))
      return `https://arweave.net/${url.split('ar://')[1]}`;
    return 'https://lens.infura-ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX';
  }
}
