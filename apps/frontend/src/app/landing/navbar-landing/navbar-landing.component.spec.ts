import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarLandingComponent } from './navbar-landing.component';
import { ButtonSecondaryModule } from '../../shared/button-secondary/button-secondary.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarLandingComponent', () => {
  let component: NavbarLandingComponent;
  let fixture: ComponentFixture<NavbarLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavbarLandingComponent],
      imports: [ButtonSecondaryModule, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(NavbarLandingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
