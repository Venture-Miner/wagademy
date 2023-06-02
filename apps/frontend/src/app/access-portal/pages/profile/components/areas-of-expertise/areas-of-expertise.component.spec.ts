import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreasOfExpertiseComponent } from './areas-of-expertise.component';

describe('AreasOfExpertiseComponent', () => {
  let component: AreasOfExpertiseComponent;
  let fixture: ComponentFixture<AreasOfExpertiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreasOfExpertiseComponent],
    }).compileComponents();
    fixture = TestBed.createComponent(AreasOfExpertiseComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
