import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { throwError,catchError, map, Observable,of, Subscriber } from 'rxjs';
import { PersonaDto } from '../model/persona-dto';


@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  url:string="http://localhost:8080/";
  myimage!: Observable<any>;
  base64code: any;
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
  obtenerExperienciasById(id:any):Observable<any> {
    return this.http.get(this.url + `experiencia/unica/${id}`);
  }
  obtenerExperiencias(id:number):Observable<any> {
    return this.http.get(this.url + `experiencia/${id}`);
  }
  obtenerExperienciasByUser(user:string):Observable<any>{
    return this.http.get(this.url + `experiencia/detalle/${user}`);
  }
  crearExperiencia(experiencia:any):Observable<any>{
    return this.http.post(this.url +"experiencia/crear",experiencia);
  }
  actualizarExperiencia(id:any,experiencia:any):Observable<any>{
    return this.http.put(this.url +`experiencia/editar/${id}`,experiencia);
  }
  borrarExperiencia(id:number){
    return this.http.delete(this.url + `experiencia/borrar/${id}`);
  }

  obtenerFecha(fecha:string):string{
    var nuevaFecha:string=""
    var indice= fecha.indexOf("/");
    if(indice==-1){
      return fecha;
    }else{      
      var splitted = fecha.split("/");
      if(splitted[0].length==4){
      nuevaFecha=splitted[0]+"-"+splitted[1]+"-"+splitted[2];
      return nuevaFecha;
       }else{
        nuevaFecha=splitted[2]+"-"+splitted[1]+"-"+splitted[0];
       return nuevaFecha;
       }
    }
    
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
 
    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
 
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }
  convertirBase64(file:File):any{
    var nuevofile='data:image/jpeg;base64,' + file;
    return nuevofile; 
  }
  
}
