import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsModalComponent } from './details-modal.component';
import { InputSelectModule } from '../../../../../shared/input-select/input-select.module';
import { InputModule } from '../../../../../shared/input/input.module';

describe('DetailsModalComponent', () => {
  let component: DetailsModalComponent;
  let fixture: ComponentFixture<DetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailsModalComponent],
      imports: [InputSelectModule, InputModule],
    }).compileComponents();
    fixture = TestBed.createComponent(DetailsModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
