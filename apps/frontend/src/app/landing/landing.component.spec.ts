import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LandingComponent } from './landing.component';
import { NavbarLandingComponent } from './navbar-landing';
import { ButtonPrimaryModule } from '../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../shared/button-secondary/button-secondary.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingComponent, NavbarLandingComponent],
      imports: [
        ButtonPrimaryModule,
        ButtonSecondaryModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component landing', () => {
    expect(component).toBeTruthy();
  });
});
