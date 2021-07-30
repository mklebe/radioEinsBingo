import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaceTipsComponent } from './place-tips.component';

describe('PlaceTipsComponent', () => {
  let component: PlaceTipsComponent;
  let fixture: ComponentFixture<PlaceTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaceTipsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
