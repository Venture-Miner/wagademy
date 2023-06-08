import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfessionalExperienceComponent } from './professional-experience.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('ProfessionalExperienceComponent', () => {
  let component: ProfessionalExperienceComponent;
  let fixture: ComponentFixture<ProfessionalExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfessionalExperienceComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(ProfessionalExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component professional experience', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "profile edit"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-profile-edit'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/profile/profile-edit');
  });
});
