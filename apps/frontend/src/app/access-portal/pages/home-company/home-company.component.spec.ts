import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeCompanyComponent } from './home-company.component';
import {
  CompaniesActivitiesComponent,
  CompanyCardComponent,
} from './components';
import { NavbarAuthenticatedCompanyModule } from '../../../shared/navbar-authenticated-company/navbar-authenticated-company.module';
import { WidgetModule } from '../../../shared/widget/widget.module';
import { InputModule } from '../../../shared/input/input.module';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { RouterTestingModule } from '@angular/router/testing';

jest.mock('ethers');

describe('HomeCompanyComponent', () => {
  let component: HomeCompanyComponent;
  let fixture: ComponentFixture<HomeCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeCompanyComponent,
        CompaniesActivitiesComponent,
        CompanyCardComponent,
      ],
      imports: [
        NavbarAuthenticatedCompanyModule,
        WidgetModule,
        InputModule,
        InputSelectModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeCompanyComponent);
    component = fixture.componentInstance;
  });

  it('should create the component home company', () => {
    expect(component).toBeTruthy();
  });
});
