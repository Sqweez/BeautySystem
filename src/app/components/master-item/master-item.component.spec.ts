import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterItemComponent } from './master-item.component';

describe('MasterItemComponent', () => {
  let component: MasterItemComponent;
  let fixture: ComponentFixture<MasterItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterItemComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
