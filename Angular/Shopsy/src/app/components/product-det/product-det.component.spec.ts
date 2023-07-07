import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetComponent } from './product-det.component';

describe('ProductDetComponent', () => {
  let component: ProductDetComponent;
  let fixture: ComponentFixture<ProductDetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetComponent]
    });
    fixture = TestBed.createComponent(ProductDetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
