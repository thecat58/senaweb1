import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipogrupoComponent } from './tipoGrupo.component';

describe('TipogrupoComponent', () => {
  let component: TipogrupoComponent;
  let fixture: ComponentFixture<TipogrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipogrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipogrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
