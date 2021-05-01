import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const  _API = "https://servicios.qamercantilandina.com.ar/api/v1";

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  
  constructor(private http:HttpClient) { }

  traerMarcas()
  {
    return this.http.get(_API + "/vehiculos/marcas");
  }

  traerModelos(codigo_marca: number, año: number)
  {
    return this.http.get(_API + "/vehiculos/marcas/" + codigo_marca + "/" + año );
  }

  traerVersiones(codigo_marca: number, año: number, modelo: string)
  {
    return this.http.get(_API + "/vehiculos/marcas/" + codigo_marca + "/" + año + "/" + modelo );
  }

}
