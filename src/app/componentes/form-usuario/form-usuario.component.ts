import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeoService } from 'src/app/servicios/geo.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { map } from 'rxjs/operators';
import * as moment from 'moment';




@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss']
})
export class FormUsuarioComponent implements OnInit {

  @Output() siguiente = new EventEmitter<any>();

  provincias;
  ciudades;
  registroUno: FormGroup;

  constructor(
    private usuarioService: UsuarioService,
    public fb: FormBuilder,
    private geoService: GeoService) {
    this._crearForm();

  }

  avanzar() {
    this.siguiente.emit({ valid: this.registroUno.valid, formUsuario: this.registroUno.value });

  }


  private _crearForm() {

    this.registroUno = this.fb.group({

      nombre: [null,
        [Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z ]+$/)]
      ],

      apellido: [null,
        [Validators.required,
        Validators.maxLength(15),
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z ]+$/)]
      ],

      dni: [null, [
        Validators.required,
        Validators.maxLength(8),
        Validators.minLength(7),
        Validators.pattern('-?[0-9]+(.[0-9][0-9]?)?')
      ]],

      //Agrego validacion pattern porque el email no valida el .com o .net, etc...
      email: [null, [
        Validators.compose([
          Validators.email,
          Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'),
        ])
      ]
      ],

      usuario: ["", [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(3),
        this.checkUsuario.bind(this)
      ]

      ],

      clave: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ],

      ],

      celular: [null, [
        Validators.required,
        Validators.pattern('-?[0-9]+(\.[0-9][0-9]?)?'),
        Validators.minLength(10)
      ]
      ],

      telefono: [null, [
        Validators.required,
        Validators.pattern('-?[0-9]+(\.[0-9][0-9]?)?'),
        Validators.minLength(10)
      ]
      ],

      provincia: [null, [
        Validators.required
      ]
      ],

      ciudad: [null, [
        Validators.required
      ]
      ],

      domicilio: [null, [
        Validators.required
      ]
      ],

      fecha_nacimiento: [null, [
        Validators.required,
        this._checkFecha.bind(this)
      ]
      ]
    })

    const usuario = this.registroUno.get("usuario");
  }


  traerProvincias() {

    this.geoService.traerProvincias()
      .subscribe((resp_geo_prov: any) => {

        // Recibo la lista de provincias y luego las ordéno alfabéticamente.
        this.provincias = resp_geo_prov.provincias;
        this.provincias.sort((a: any, b: any) => { return a.nombre.localeCompare(b.nombre) });
        this.setProvincia(0);

      })
  }

  traerCiudades() {

    this.geoService.traerMunicipios(this.registroUno.value.provincia.id)
      .subscribe((resp_geo_mun: any) => {

        this.ciudades = resp_geo_mun.municipios;
        this.ciudades.sort((a: any, b: any) => { return a.nombre.localeCompare(b.nombre) });
        this.setCiudad(0);
      })
  }


  checkUsuario(control: AbstractControl) {

    control.setAsyncValidators(() => {

      if (control.touched || control.dirty) {

        return this.usuarioService.checkUsuairo(control.value)
          .pipe(map(data => {

            if (data === true) {

              return { exist: true };
            } else {
              return null;
            }

          }))
      }
    })

  }


  private _checkFecha(control: AbstractControl) {
    if (control.touched || control.dirty) {

      var date = new Date(Date.now());

      var ahora = moment(date);
      var fechaNac = moment(control.value);

      var years = ahora.diff(fechaNac, 'year');

      fechaNac.add(years, 'years');

      if (years >= 18 && years <= 99) {
        return null
      } else {
        return { feraFecha: true }
      }

    }

  }


  setProvincia(i) {
    this.registroUno.controls['provincia'].setValue(this.provincias[i]);
    this.traerCiudades();

  }

  setCiudad(i) {
    this.registroUno.controls['ciudad'].setValue(this.ciudades[i]);
  }


  ngOnInit() {

    this.traerProvincias()

  }

}
