import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticulosasignadosComponent } from './articulosasignados.component';

describe('ArticulosasignadosComponent', () => {
  let component: ArticulosasignadosComponent;
  let fixture: ComponentFixture<ArticulosasignadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticulosasignadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticulosasignadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
