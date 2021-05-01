import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


const  _API = "https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1/coberturas";


@Injectable({
  providedIn: 'root'
})
export class CoberturaService {

  
  constructor(private http:HttpClient) { }


  traerCoberturas()
  {
    
    return this.http.get("https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1/coberturas")
    .pipe(
      map((resp:Array<any>) => {

        return resp.sort((a: any, b: any) => { return b.puntaje - a.puntaje });

      })
    )
  }
}
