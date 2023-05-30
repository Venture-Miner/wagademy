import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecommendationsPageComponent } from './recommendations-page.component';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('ethers');

describe('RecommendationsPageComponent', () => {
  let component: RecommendationsPageComponent;
  let fixture: ComponentFixture<RecommendationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendationsPageComponent],
      imports: [NavbarAuthenticatedModule, RouterTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(RecommendationsPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
