import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/servicio/token.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { PersonaDto } from 'src/app/model/persona-dto';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})
export class AcercaDeComponent implements OnInit {
  
   faPen=faPen;
   isActivo=false
   form:FormGroup;
   sobre_mi:string=""
   id:any;
   formData:FormData;
   isLogged=false;

  constructor(private portfolioService:PortfolioService,
    private tokenServicio:TokenService,
    private activatedRoute: ActivatedRoute,        
    private router: Router,
    private FormBuilder:FormBuilder) {  
      this.form=this.FormBuilder.group(
        {
          
          sobre_mi:['']         
          
  
        })
        this.formData=new FormData();
    }

  ngOnInit(): void {
    this.isLogged=this.tokenServicio.getToken()==null? false:true;
          // let user=this.tokenServicio.getUserName(); 
          /* const user = this.activatedRoute.snapshot.params['user'];     
            this.portfolioService.obtenerPersona(user).subscribe(data=>{
            this.sobre_mi=data.sobre_mi;    
            this.formData.append('ocupacion',data.ocupacion);
            this.formData.append('direccion',data.domicilio.direccion);
            this.formData.append('numero',data.domicilio.numero);
            this.formData.append('provincia',data.domicilio.provincia);
            this.formData.append('nombre',data.nombre);
            this.formData.append('apellido',data.apellido);
            this.formData.append('nacionalidad',data.nacionalidad);
            this.formData.append('fecha_nacimiento',data.fecha_nacimiento);          
            this.id=data.id;*/
            this.portfolioService.obtenerDatos().subscribe(data=>{
              this.sobre_mi=data[0].sobre_mi;    
              this.formData.append('ocupacion',data[0].ocupacion);
              this.formData.append('direccion',data[0].domicilio.direccion);
              this.formData.append('numero',data[0].domicilio.numero);
              this.formData.append('provincia',data[0].domicilio.provincia);
              this.formData.append('nombre',data[0].nombre);
              this.formData.append('apellido',data[0].apellido);
              this.formData.append('nacionalidad',data[0].nacionalidad);
              this.formData.append('fecha_nacimiento',data[0].fecha_nacimiento);          
              this.id=data[0].id;
        

        });
       
      
     }
     onUpdate(): void {  
            this.formData.append('sobre_mi',this.getSobreMi()?.value);
            this.sobre_mi= this.getSobreMi()?.value;    
            this.portfolioService.upDate(this.id,this.formData).subscribe();
            this.isActivo=false;

          
      
    }
    getSobreMi(){
      return this.form.get('sobre_mi');
    }
    activarImput(event:Event){
      if(this.isActivo){
        this.isActivo=false;
      }else{
        this.isActivo=true;
      }
             

    }

    
  

    }
