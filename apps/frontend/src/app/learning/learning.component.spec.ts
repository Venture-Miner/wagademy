import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LearningComponent } from './learning.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('LearningComponent', () => {
  let component: LearningComponent;
  let fixture: ComponentFixture<LearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearningComponent],
      imports: [RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LearningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component learning', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "account type"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#connect-wallet'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/account-type');
  });

  it('should redirect to "home"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#home'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/');
  });
});
