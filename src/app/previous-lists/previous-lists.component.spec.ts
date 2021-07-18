import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousListsComponent } from './previous-lists.component';

describe('PreviousListsComponent', () => {
  let component: PreviousListsComponent;
  let fixture: ComponentFixture<PreviousListsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviousListsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviousListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
