import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {
  IpfsService,
  LensService,
  PostService,
  TokenService,
} from '../../services';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'wagademy-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.css'],
})
export class WidgetComponent implements OnInit {
  congratulationsMessage = '';
  failMessage = '';
  showDropdown = false;
  showPostModal = false;
  toggled = false;
  form = this.fb.group({
    post: ['', Validators.required],
  });
  isLoading = false;
  handle = '';
  lensId = '';

  handleSelection(event: any) {
    const currentValue = this.form.controls.post.value;
    this.form.controls.post.setValue(currentValue + event.char);
  }

  async ngOnInit() {
    const ethereumAddress = this.tokenService.getWalletAddress();
    const {
      data: {
        defaultProfile: { id, handle },
      },
    } = await this.lensService.client.query({
      query: this.lensService.defaultProfileId,
      variables: {
        request: { ethereumAddress },
      },
    });
    this.lensId = id;
    this.handle = handle;
  }

  constructor(
    private postService: PostService,
    private tokenService: TokenService,
    private ipfsService: IpfsService,
    private fb: FormBuilder,
    private lensService: LensService
  ) {}

  post() {
    this.isLoading = true;
    this.ipfsService
      .createPost({
        version: '2.0.0',
        mainContentFocus: 'TEXT_ONLY',
        description: `@${this.handle} Post`,
        metadata_id: uuidv4(),
        locale: 'en-US',
        content: this.form.controls.post.value,
        name: `@${this.handle} Post`,
        attributes: [],
        tags: [this.tokenService.getAccountType()],
        appId: 'Wagademy',
      })
      .subscribe({
        next: async ({ cid }) => {
          const tx = await this.postService
            .createPost(this.lensId, cid, false)
            .catch(() => {
              this.errorPosting();
            });
          tx.wait().then(() => {
            this.postSuccessful();
            this.form.reset();
          });
        },
      });
  }

  errorPosting() {
    this.isLoading = false;
    this.showPostModal = false;
    this.failMessage = 'Error creating post';
    setTimeout(() => {
      this.failMessage = '';
    }, 10000);
  }

  postSuccessful() {
    this.isLoading = false;
    this.showPostModal = false;
    this.congratulationsMessage = 'Your post has been published';
    setTimeout(() => {
      this.congratulationsMessage = '';
    }, 3000);
  }

  ok() {
    this.failMessage = '';
  }
}
