import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JoinSquadComponent } from './join-squad.component';

describe('JoinSquadComponent', () => {
  let component: JoinSquadComponent;
  let fixture: ComponentFixture<JoinSquadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JoinSquadComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(JoinSquadComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
