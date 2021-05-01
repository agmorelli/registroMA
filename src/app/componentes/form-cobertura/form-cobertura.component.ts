import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CoberturaService } from 'src/app/servicios/cobertura.service';

@Component({
  selector: 'app-form-cobertura',
  templateUrl: './form-cobertura.component.html',
  styleUrls: ['./form-cobertura.component.scss']
})
export class FormCoberturaComponent implements OnInit {

  @Output() siguiente = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();

  
  coberturas: any[];
  cobertura: any;
  constructor(private coberturaService: CoberturaService) { }

  ngOnInit() {

    this.coberturaService.traerCoberturas()
    .subscribe((data)=>{
      this.coberturas = data;
      
    })
    
  }

  avanzar() {
    if(this.cobertura){
      this.siguiente.emit({ valid: true, formCobertura: this.cobertura });
    }
    

  }

  retroceder(){
    this.atras.emit();
  }

  selected(cobertura) {
    this.cobertura = cobertura;
    this.siguiente.emit({ valid: true, formCobertura: this.cobertura });
  }

}
