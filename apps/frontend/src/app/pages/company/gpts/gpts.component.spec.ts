import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GptsComponent } from './gpts.component';

describe('GptsComponent', () => {
  let component: GptsComponent;
  let fixture: ComponentFixture<GptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GptsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
