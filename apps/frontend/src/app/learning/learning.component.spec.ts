import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningComponent } from './learning.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarLandingModule } from '../landing/navbar-landing/navbar-landing.module';

describe('LearningComponent', () => {
  let component: LearningComponent;
  let fixture: ComponentFixture<LearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningComponent],
      imports: [RouterTestingModule, NavbarLandingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component learning', () => {
    expect(component).toBeTruthy();
  });
});
