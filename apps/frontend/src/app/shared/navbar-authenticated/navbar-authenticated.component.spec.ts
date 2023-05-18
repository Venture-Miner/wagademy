import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAuthenticatedComponent } from './navbar-authenticated.component';

describe('NavbarAuthenticatedComponent', () => {
  let component: NavbarAuthenticatedComponent;
  let fixture: ComponentFixture<NavbarAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAuthenticatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
