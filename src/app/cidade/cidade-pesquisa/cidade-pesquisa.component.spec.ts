import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CidadePesquisaComponent } from './cidade-pesquisa.component';

describe('CidadePesquisaComponent', () => {
  let component: CidadePesquisaComponent;
  let fixture: ComponentFixture<CidadePesquisaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CidadePesquisaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CidadePesquisaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
