import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostQuestionDialogComponentComponent } from './post-question-dialog-component.component';

describe('PostQuestionDialogComponentComponent', () => {
  let component: PostQuestionDialogComponentComponent;
  let fixture: ComponentFixture<PostQuestionDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostQuestionDialogComponentComponent]
    });
    fixture = TestBed.createComponent(PostQuestionDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
