import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreasOfInterestComponent } from './areas-of-interest.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('AreasOfInterestComponent', () => {
  let component: AreasOfInterestComponent;
  let fixture: ComponentFixture<AreasOfInterestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreasOfInterestComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AreasOfInterestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component areas of interest', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "profile edit"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#redirect-profile-edit'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/home/profile/profile-edit');
  });
});
