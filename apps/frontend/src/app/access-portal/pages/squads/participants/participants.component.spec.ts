import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ParticipantsComponent } from './participants.component';
import { BaseModalModule } from '../../../../shared/base-modal/base-modal.module';

describe('ParticipantsComponent', () => {
  let component: ParticipantsComponent;
  let fixture: ComponentFixture<ParticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParticipantsComponent],
      imports: [BaseModalModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ParticipantsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
