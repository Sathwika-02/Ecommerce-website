import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PincodeDialogComponent } from './pincode-dialog.component';

describe('PincodeDialogComponent', () => {
  let component: PincodeDialogComponent;
  let fixture: ComponentFixture<PincodeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PincodeDialogComponent]
    });
    fixture = TestBed.createComponent(PincodeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
