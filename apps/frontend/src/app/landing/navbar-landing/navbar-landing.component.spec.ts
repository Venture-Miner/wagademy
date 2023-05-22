import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarLandingComponent } from './navbar-landing.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('NavbarLandingComponent', () => {
  let component: NavbarLandingComponent;
  let fixture: ComponentFixture<NavbarLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarLandingComponent],
      imports: [RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component navbar', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to "connect wallet"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#connect-wallet'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/account-type');
  });

  it('should redirect to "about"', () => {
    const routerLink = fixture.debugElement
      .query(By.css('#about'))
      .nativeElement.getAttribute('ng-reflect-router-link');
    expect(routerLink).toBe('/about');
  });
});
