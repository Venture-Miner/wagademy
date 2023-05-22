import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddEmailModalComponent } from './add-email-modal.component';
import { ButtonSecondaryModule } from 'apps/frontend/src/app/shared/button-secondary/button-secondary.module';
import { ButtonPrimaryModule } from 'apps/frontend/src/app/shared/button-primary/button-primary.module';
import { By } from '@angular/platform-browser';

describe('AddEmailModalComponent', () => {
  let component: AddEmailModalComponent;
  let fixture: ComponentFixture<AddEmailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEmailModalComponent],
      imports: [ButtonSecondaryModule, ButtonPrimaryModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEmailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component add email modal', () => {
    expect(component).toBeTruthy();
  });

  it('should call emailConfirm()', () => {
    const emailConfirm = jest.spyOn(component, 'emailConfirm');
    const emailConfirmButton = fixture.debugElement.query(
      By.css('#email-confirm')
    );
    emailConfirmButton.nativeElement.click();
    expect(emailConfirm).toHaveBeenCalledTimes(1);
  });
});
