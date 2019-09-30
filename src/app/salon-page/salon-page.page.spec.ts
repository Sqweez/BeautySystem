import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonPagePage } from './salon-page.page';

describe('SalonPagePage', () => {
  let component: SalonPagePage;
  let fixture: ComponentFixture<SalonPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
