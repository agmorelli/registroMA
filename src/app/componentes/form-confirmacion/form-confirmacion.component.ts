import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-form-confirmacion',
  templateUrl: './form-confirmacion.component.html',
  styleUrls: ['./form-confirmacion.component.scss']
})
export class FormConfirmacionComponent implements OnInit {

  @Output() finalizar = new EventEmitter<boolean>();
  @Input() datosUsuario;
  @Input() datosVehiculo;
  @Input() datosCobertura;

  constructor() { }

  enviar() {

   this.finalizar.emit(true);

  }

  ngOnInit() {
  }

}
