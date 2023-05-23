import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyContactsComponent } from './my-contacts.component';
import { ButtonPrimaryModule } from '../../../shared/button-primary/button-primary.module';
import { NavbarAuthenticatedModule } from '../../../shared/navbar-authenticated/navbar-authenticated.module';
import { InputModule } from '../../../shared/input/input.module';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ButtonSecondaryModule } from '../../../shared/button-secondary/button-secondary.module';
import { FormFieldModule } from '../../../shared/form-field/form-field.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TextAreaModule } from '../../../shared/text-area/text-area.module';
import { BaseModalModule } from '../../../shared/base-modal/base-modal.module';

jest.mock('ethers');

describe('MyContactsComponent', () => {
  let component: MyContactsComponent;
  let fixture: ComponentFixture<MyContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyContactsComponent],
      imports: [
        ButtonPrimaryModule,
        ButtonSecondaryModule,
        NavbarAuthenticatedModule,
        InputModule,
        RouterTestingModule,
        FormFieldModule,
        ReactiveFormsModule,
        TextAreaModule,
        BaseModalModule,
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(MyContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('add recommendation button', () => {
    it('should open addRecommendationModal', () => {
      component.addRecommendationModal = false;
      const recommendationBtn = fixture.debugElement.query(
        By.css('#recommendation-button')
      );
      recommendationBtn.nativeElement.click();
      expect(component.addRecommendationModal).toBe(true);
    });
  });

  describe('add recommendation modal', () => {
    it('should call send()', () => {
      component.addRecommendationModal = true;
      fixture.detectChanges();
      const send = jest.spyOn(component, 'send');
      const sendBtn = fixture.debugElement.query(By.css('#send-button'));
      sendBtn.nativeElement.click();
      expect(send).toHaveBeenCalledTimes(1);
    });
  });

  describe('follow modal', () => {
    it('should call follow()', () => {
      component.followModal = true;
      fixture.detectChanges();
      const follow = jest.spyOn(component, 'follow');
      const followBtn = fixture.debugElement.query(By.css('#follow-button'));
      followBtn.nativeElement.click();
      expect(follow).toHaveBeenCalledTimes(1);
    });
  });

  describe('contact list', () => {
    it('should display a list of contacts', () => {
      const teamList = fixture.debugElement.queryAll(By.css('#contact-list'));
      expect(teamList.length).toBe(4);
    });

    it('should display a list of contact interests', () => {
      const teamList = fixture.debugElement.queryAll(By.css('#interest-list'));
      expect(teamList.length).toBe(40);
    });
  });
});
