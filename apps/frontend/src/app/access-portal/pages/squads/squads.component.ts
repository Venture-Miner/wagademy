import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateSquadDto } from '../../../dtos/squad/create-squad.dto';
import { Squad } from '../../../interfaces/prisma/prisma';
import { SquadService } from '../../../services/squad/squad.service';
import { TokenService } from '../../../services/token/token.service';

@Component({
  selector: 'wagademy-squads',
  templateUrl: './squads.component.html',
  styleUrls: ['./squads.component.css'],
})
export class SquadsComponent implements OnInit {
  form = this.fb.group({
    name: [''],
  });
  showCreateSquadModal = false;
  congratulationsMessage = '';
  failMessage = '';
  mode: 'JOIN' | 'MANAGE' = 'MANAGE';
  squadIndexToQuit: string | false = false;
  showParticipantsModal = false;
  squadsToJoin: Squad[] = [];
  squadsBelonged: Squad[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private squadService: SquadService,
    private tokenService: TokenService
  ) {}

  ngOnInit() {
    this.listSquads();
  }

  getControl(field: string) {
    return this.form.get(field) as FormControl;
  }

  quitSquad(squadId: string) {
    this.squadService.quitSquad(squadId).subscribe({
      next: () => {
        this.squadIndexToQuit = false;
        this.congratulationsMessage = 'You are no longer part of this squad';
        setTimeout(() => {
          this.congratulationsMessage = '';
        }, 2000);
        this.listSquads();
      },
      error: () => {
        this.failMessage = 'Failed to leave squad';
        setTimeout(() => {
          this.failMessage = '';
        }, 2000);
      },
    });
  }

  joinSquad(squadId: string) {
    this.squadService.joinSquad(squadId).subscribe({
      next: () => {
        this.congratulationsMessage = "Now you're part of a squad";
        setTimeout(() => {
          this.congratulationsMessage = '';
        }, 2000);
        this.listSquads();
      },
      error: () => {
        this.failMessage = 'Your request to join squad failed';
        setTimeout(() => {
          this.failMessage = '';
        }, 2000);
      },
    });
  }

  listSquads() {
    this.squadService.getSquads().subscribe({
      next: (response) => {
        const address = this.tokenService.getWalletAddress();
        this.squadsToJoin = response.filter(({ members }) => {
          return !members.includes(address);
        });
        this.squadsBelonged = response.filter(({ members }) => {
          return members.includes(address);
        });
      },
      error: () => {
        this.failMessage = 'Error loading squad list';
        setTimeout(() => {
          this.failMessage = '';
        }, 2000);
      },
    });
  }

  createSquad() {
    const body: CreateSquadDto = {
      name: this.form.controls['name'].value!,
    };
    this.squadService.createSquad(body).subscribe({
      next: () => {
        this.congratulationsMessage = 'Squad successfully created';
        setTimeout(() => {
          this.congratulationsMessage = '';
        }, 2000);
      },
    });
  }

  back() {
    if (this.mode === 'JOIN') {
      this.mode = 'MANAGE';
    } else {
      this.router.navigate(['/home']);
    }
  }
}
