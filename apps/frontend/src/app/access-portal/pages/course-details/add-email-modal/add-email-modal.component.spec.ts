import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEmailModalComponent } from './add-email-modal.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../../shared/button-secondary/button-secondary.module';

describe('AddEmailModalComponent', () => {
  let component: AddEmailModalComponent;
  let fixture: ComponentFixture<AddEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmailModalComponent],
      imports: [ButtonPrimaryModule, ButtonSecondaryModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AddEmailModalComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
