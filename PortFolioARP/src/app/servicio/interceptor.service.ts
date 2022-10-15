import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor,HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from './autenticacion.service';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private autenticationservice: AutenticacionService, private tokenService:TokenService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //var currentUser=this.autenticationservice.UsuarioAutenticado;
    const token = this.tokenService.getToken();
   //if(currentUser && currentUser.accessToken)
   
   if(token!=null){
         req=req.clone({
          setHeaders:{
            Authorization: `Bearer ${token}`
          }
         })
         
    }
   
    return next.handle(req);
  }
}
