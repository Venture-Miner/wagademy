import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WidgetComponent } from './widget.component';
import { InputModule } from '../input/input.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

jest.mock('ethers');

describe('WidgetComponent', () => {
  let component: WidgetComponent;
  let fixture: ComponentFixture<WidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WidgetComponent],
      imports: [InputModule, HttpClientTestingModule],
    }).compileComponents();
    fixture = TestBed.createComponent(WidgetComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
