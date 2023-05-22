import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { NavbarLandingComponent } from './navbar-landing';
import { ButtonPrimaryModule } from '../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../shared/button-secondary/button-secondary.module';
import { FooterComponent } from './footer';
import { ResumesTogglerComponent } from './resumes-toggler';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        LandingComponent,
        NavbarLandingComponent,
        FooterComponent,
        ResumesTogglerComponent,
      ],
      imports: [ButtonPrimaryModule, ButtonSecondaryModule],
    }).compileComponents();
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
