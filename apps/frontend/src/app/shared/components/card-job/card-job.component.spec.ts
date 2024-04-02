import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CardJobComponent } from './card-job.component';

describe('CardJobComponent', () => {
  let component: CardJobComponent;
  let fixture: ComponentFixture<CardJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [CardJobComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(CardJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
