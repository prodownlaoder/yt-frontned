import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OkruComponent } from './okru.component';

describe('OkruComponent', () => {
  let component: OkruComponent;
  let fixture: ComponentFixture<OkruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OkruComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OkruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
