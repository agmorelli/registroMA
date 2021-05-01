import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { VehiculoService } from 'src/app/servicios/vehiculo.service';

@Component({
  selector: 'app-form-vehiculo',
  templateUrl: './form-vehiculo.component.html',
  styleUrls: ['./form-vehiculo.component.scss']
})
export class FormVehiculoComponent implements OnInit {

  @Output() siguiente = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();
  
  registroDos: FormGroup;
  marcas = [];
  modelos: any;
  versiones: Object;

  constructor(public fb: FormBuilder, private VehiculoServ: VehiculoService) {
    this._crearForm();
   }


  private _crearForm() {
    this.registroDos = this.fb.group({

      marca: [null,
        [Validators.required
        ]
       
      ],

      anio: [null,
        [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.max(new Date(Date.now()).getFullYear()),
         this. _checkFecha],
         onblur
       
      ],

      modelo: [null,
        [Validators.required]
        
      ],

      version: [null,
        [],
        onblur
      ],

    })
  }

  retroceder(){
    this.atras.emit();
  }

  setMarca(i){
    this.registroDos.controls['marca'].setValue(this.marcas[i]);
    this.traerModelos();
  }

  setVersion(i) {
    this.registroDos.controls['version'].setValue(this.versiones[i]);
    
  }


  avanzar() {
    this.siguiente.emit({ valid: this.registroDos.valid, formVehiculo: this.registroDos.value });
  }

  private _checkFecha(control: AbstractControl){
    if (control.touched || control.dirty) {

          var date = new Date(Date.now());

          var a = moment(date);
          var b = moment(control.value);
        
          var years = a.diff(b, 'year');
       
          b.add(years, 'years');
          
          if(years < 20){
            return null
             }else{
              return {menor: true} 
             }
        
          }
        
    }

    traerVersiones(){

      if(this.registroDos.value.anio && this.registroDos.value.marca && this.registroDos.value.modelo  ){

        this.VehiculoServ.traerVersiones(this.registroDos.value.marca.codigo, this.registroDos.value.anio, this.registroDos.value.modelo )
         .toPromise()
         .then((resp)=>{
             this.versiones = resp;

             // Seteo por defecto la primera version
             this.setVersion(0);
           

           })  
         } else {
           this.versiones = undefined;
         }

    }

    traerModelos(){

      if(this.registroDos.value.anio && this.registroDos.value.marca ){

         this.VehiculoServ.traerModelos(this.registroDos.value.marca.codigo, this.registroDos.value.anio )
          .subscribe((resp)=>{
            
              this.modelos = resp;
              this.traerVersiones()
            

            })  
          } else {
            this.modelos = undefined;
          }
      }
      

  ngOnInit() {

    this.VehiculoServ.traerMarcas()
    .subscribe((resp:any)=>{     
      this.marcas = resp;

      // Seteo por defecto la primera marca
      this.setMarca(0);


    })
  }

}
