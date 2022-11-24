import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { LoginUsuario } from 'src/app/model/login-usuario';
import { AutenticacionService } from 'src/app/servicio/autenticacion.service';
import { TokenService } from 'src/app/servicio/token.service';
import { faRightToBracket,faUser,faLock } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form:FormGroup;
  isLogged=false;
  isLoginFail=false;
  Icon=faRightToBracket;
  faUser=faUser;
  faLock=faLock;
  
 
  loginUsuario:LoginUsuario | undefined;
  roles:string[]=[];
  errMsj:string="";
  user:string="";
  

  constructor(private FormBuilder:FormBuilder, private tokenService:TokenService,private autenticationservice: AutenticacionService, private ruta:Router ) { 
    this.form=this.FormBuilder.group(
      {
        
        nombreUsuario:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]]
        

      })
  }

  ngOnInit(): void {
    if(this.tokenService.getToken() == null){
      this.isLogged= true;
      this.isLoginFail=false;
      this. roles=this.tokenService.getAuthorities();
    
    }
    

  }
   
    get NombreUsuario(){
      return this.form.get('nombreUsuario');
    }
    get Password(){
      return this.form.get('password');
    }
    onEnviar(event:Event){
      event.defaultPrevented;
      console.log(this.NombreUsuario);
      this.autenticationservice.IniciarSesion(this.form.value).subscribe(data=>{
        console.log("DATA "+ JSON.stringify(data));
       
       // this.ruta.navigate(['/'+`portfolio/${email}`]);
      })
    }
    onLogin():void{
      
      this.loginUsuario=new LoginUsuario(this.NombreUsuario?.value  ,this.Password?.value);
      
      this.autenticationservice.login(this.loginUsuario).subscribe(data =>{
        this.isLogged =true;        
        this.isLoginFail=false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles=data.authorities;
        this.user=this.tokenService.getUserName();
        this.ruta.navigate(['/portfolio']);
        //this.ruta.navigate(['/'+`portfolio/${this.user}`]);
      },  
        err=>{
        
          this.isLogged=false;
          this.isLoginFail=true;
          this.errMsj=err.error.error;
          
        }
       
        
      
      );
      
    }
  

}
 