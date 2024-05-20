import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCertificadoComponent } from './crear-certificado.component';

describe('CrearCertificadoComponent', () => {
  let component: CrearCertificadoComponent;
  let fixture: ComponentFixture<CrearCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearCertificadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
