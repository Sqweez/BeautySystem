import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonItemComponent } from './salon-item.component';

describe('SalonItemComponent', () => {
  let component: SalonItemComponent;
  let fixture: ComponentFixture<SalonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
