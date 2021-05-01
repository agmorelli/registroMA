import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


 const API= "https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1"

@Injectable({
  providedIn: 'root'
})


export class UsuarioService {

  constructor(private http:HttpClient) {
   
   }


   checkUsuairo(usuario:string): Observable<any>
   {
     
     return this.http.get(API + "/usuarios?nombre=" + usuario).pipe()
   }

}
