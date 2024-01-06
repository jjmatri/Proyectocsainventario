import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrarusuarioComponent } from './crarusuario.component';

describe('CrarusuarioComponent', () => {
  let component: CrarusuarioComponent;
  let fixture: ComponentFixture<CrarusuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrarusuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrarusuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
