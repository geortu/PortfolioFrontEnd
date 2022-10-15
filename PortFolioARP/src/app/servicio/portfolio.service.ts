import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable,of } from 'rxjs';
import { PersonaDto } from '../model/persona-dto';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url:string="http://localhost:8080/";
  constructor(private http:HttpClient) {
   
  }
  obtenerDatos(): Observable<any>{
    return this.http.get(this.url+ 'persona/lista');
    
  }
  obtenerPersona(email:string): Observable<any>{
    return this.http.get(this.url+ `persona/${email}`);
    
  }
  optenerPersonaById(id: number): Observable<any> {
    return this.http.get<any>(this.url +'persona/'+ `detalle/${id}`);
  }
   upDate(id: number, persona: any): Observable<any> {    
    
    return this.http.put(this.url +'persona/' + `editar/${id}`, persona);
    
  }
}
