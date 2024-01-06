import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegsitroComponent } from './regsitro.component';

describe('RegsitroComponent', () => {
  let component: RegsitroComponent;
  let fixture: ComponentFixture<RegsitroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegsitroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegsitroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
