import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatHorizontalStepper, MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paso-uno',
  templateUrl: './paso-uno.component.html',
  styleUrls: ['./paso-uno.component.scss']
})
export class PasoUnoComponent implements OnInit {

  @ViewChild('stepper', {static: false})stepper: MatStepper;

 formUsuario:{};
 formVehiculo:{};
 formCobertura:{};
  enviando: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  atras(){
    this.stepper.previous();
  }

  nextStepUsuario($event) {
    if($event.valid === true){
      this.formUsuario = $event.formUsuario;
      this.stepper.next();
    }
  }

  nextStepVehiculo($event) {
    if($event.valid === true){
      this.formVehiculo = $event.formVehiculo;
      this.stepper.next();
    }
  }

  nextStepCobertura($event){
    this.formCobertura = $event.formCobertura;
    this.stepper.next();
  }

  
  finalizar() {
    this.enviando = true;
    
    setTimeout(() => {
      this.enviando = false;
      this.router.navigateByUrl('ok');
    }, 1200);
    
  }

}
