import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EducationComponent } from './education.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('EducationComponent', () => {
  let component: EducationComponent;
  let fixture: ComponentFixture<EducationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EducationComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component education', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "profile edit"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-profile-edit'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/profile/profile-edit');
  });
});
