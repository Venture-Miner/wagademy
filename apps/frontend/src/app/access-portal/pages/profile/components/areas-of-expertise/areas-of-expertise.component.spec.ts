import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreasOfExpertiseComponent } from './areas-of-expertise.component';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('AreasOfExpertiseComponent', () => {
  let component: AreasOfExpertiseComponent;
  let fixture: ComponentFixture<AreasOfExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreasOfExpertiseComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AreasOfExpertiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component areas of expertise', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "profile edit"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-profile-edit'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/profile/profile-edit');
  });
});
