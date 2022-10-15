import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map}from 'rxjs/operators'
import { NuevoUsuario } from '../model/nuevo-usuario';
import { LoginUsuario } from '../model/login-usuario';
import { JwtDto } from '../model/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
url="http://localhost:8080/auth/";
currentUserSubject:BehaviorSubject<any>;
  constructor(private http:HttpClient) { 
   console.log("El servicio de autenticacion esta corriendo");
  
  this.currentUserSubject=new BehaviorSubject<any>(JSON.parse(sessionStorage.getItem("currentSubjet") ||'{}'));
  
  }
  //Otra forma de implementar el login
  IniciarSesion(credenciales:any):Observable<any>{
    return this.http.post(this.url +'login',credenciales).pipe(map(data=>{
      sessionStorage.setItem('currentUser',JSON.stringify(data));
      this.currentUserSubject.next(data);
      return data;
    }))
  }
  //Otra forma de implementar el login
  get UsuarioAutenticado() {
    return  this.currentUserSubject.value;
  }
  public nuevo(nuevoUsuario:NuevoUsuario):Observable<any>{
    return this.http.post<any>(this.url+'nuevo',nuevoUsuario);
  }
  public login(loginUsuario:LoginUsuario):Observable<JwtDto>{
   
    return this.http.post<JwtDto>(this.url+'login',loginUsuario);
  }
  
}
