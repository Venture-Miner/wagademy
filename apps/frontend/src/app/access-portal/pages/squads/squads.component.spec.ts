import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SquadsComponent } from './squads.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { InputModule } from '../../../shared/input/input.module';
import { NavbarModule } from '../../../shared/navbar/navbar.module';

jest.mock('ethers');

describe('SquadsComponent', () => {
  let component: SquadsComponent;
  let fixture: ComponentFixture<SquadsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SquadsComponent],
      imports: [
        HttpClientTestingModule,
        ButtonSecondaryModule,
        InputModule,
        NavbarModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(SquadsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
