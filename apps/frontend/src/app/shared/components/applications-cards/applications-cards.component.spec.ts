import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationsCardsComponent } from './applications-cards.component';

describe('ApplicationsCardsComponent', () => {
  let component: ApplicationsCardsComponent;
  let fixture: ComponentFixture<ApplicationsCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [ApplicationsCardsComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(ApplicationsCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
