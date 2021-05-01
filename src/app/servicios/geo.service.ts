import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const _GEO_REF = "https://apis.datos.gob.ar/georef/api";

@Injectable({
  providedIn: 'root'
})
export class GeoService {

  constructor(private http:HttpClient) { }

  traerProvincias()
  {
    return this.http.get(_GEO_REF + "/provincias");
  }

  traerMunicipios(idProvincia:number)
  {
    return this.http.get(_GEO_REF + "/municipios?provincia="+ idProvincia +"&campos=id,nombre&max=135");
  }
}
