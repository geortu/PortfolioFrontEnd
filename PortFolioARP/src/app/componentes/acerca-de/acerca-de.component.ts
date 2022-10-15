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

  constructor(private portfolioService:PortfolioService,
    private tokenServicio:TokenService,        
    private router: Router,
    private FormBuilder:FormBuilder) {  
      this.form=this.FormBuilder.group(
        {
          
          sobre_mi:['']         
          
  
        })
        this.formData=new FormData();
    }

  ngOnInit(): void {
           let user=this.tokenServicio.getUserName(); 
                 
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
          
            this.id=data.id;
        

        });
       
      
     }
     onUpdate(): void {  
            this.formData.append('sobre_mi',this.getSobreMi()?.value);
            this.sobre_mi= this.getSobreMi()?.value;    
            this.portfolioService.upDate(this.id,this.formData).subscribe();
            this.isActivo=false;

           //window.location.reload();
      
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
