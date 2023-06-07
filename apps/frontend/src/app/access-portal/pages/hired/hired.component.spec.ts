import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HiredComponent } from './hired.component';
import { PaginationModule } from '../../../shared/pagination/pagination.module';
import { RouterTestingModule } from '@angular/router/testing';
import { InputSelectModule } from '../../../shared/input-select/input-select.module';
import { NavbarAuthenticatedCompanyModule } from '../../../shared/navbar-authenticated-company/navbar-authenticated-company.module';

jest.mock('ethers');

describe('HiredComponent', () => {
  let component: HiredComponent;
  let fixture: ComponentFixture<HiredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HiredComponent],
      imports: [
        InputSelectModule,
        PaginationModule,
        RouterTestingModule,
        PaginationModule,
        NavbarAuthenticatedCompanyModule,
        RouterTestingModule,
        InputSelectModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HiredComponent);
    component = fixture.componentInstance;
  });

  it('should create the component hired', () => {
    expect(component).toBeTruthy();
  });
});
