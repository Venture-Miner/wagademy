import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEmailModalComponent } from './add-email-modal.component';
import { ButtonPrimaryModule } from '../../../../shared/button-primary/button-primary.module';
import { ButtonSecondaryModule } from '../../../../shared/button-secondary/button-secondary.module';
import { By } from '@angular/platform-browser';

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

  it('should create the component add email modal', () => {
    expect(component).toBeTruthy();
  });

  it('should call cancel.emit()', () => {
    const cancel = jest.spyOn(component.cancel, 'emit');
    const cancelButton = fixture.debugElement.query(By.css('#cancel'));
    cancelButton.nativeElement.click();
    expect(cancel).toHaveBeenCalledTimes(1);
  });
});
