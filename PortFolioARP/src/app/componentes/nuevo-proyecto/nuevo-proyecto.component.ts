import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-nuevo-proyecto',
  templateUrl: './nuevo-proyecto.component.html',
  styleUrls: ['./nuevo-proyecto.component.css']
})
export class NuevoProyectoComponent implements OnInit {
  
  editar:FormGroup;  
  path="proyecto";
  id: any[] = []; 
  public event: EventEmitter<any> = new EventEmitter(); 

  constructor(public bsModalRef: BsModalRef,private tokenService:TokenService,private portFolioService:PortfolioService ,private FormBuilder:FormBuilder ) {
    this.editar=this.FormBuilder.group(
      {
        
        nombre:['',Validators.required] ,  
        descripcion:['',Validators.required],
        fecha:['',{validators: [Validators.required]}],         
        link:['',Validators.required]
        
    
        
        

      }
      )
   }

  ngOnInit(): void {
  }
  get Nombre(){
    return this.editar.get('nombre');
    
  }
  get Descripcion(){
    return this.editar.get('descripcion');
  }
  get Fecha(){
    return this.editar.get('fecha');
  }
  get Link(){
    return this.editar.get('link');
  }
  onUpdate(): void {
   
    const formData=new FormData();
   
    formData.append('nombre',this.editar.get('nombre')?.value);    
    formData.append('link',this.editar.get('link')?.value);
    formData.append('fecha',this.editar.get('fecha')?.value);    
    formData.append('descripcion',this.editar.get('descripcion')?.value);
    formData.append('id_persona',this.id[0].value);
    
     
    
   this.portFolioService.crear(formData,this.path).subscribe(data=>{
    this.event.emit({ id:data.id, nombre:data.nombre,fecha:data.fecha, descripcion:data.descripcion,link:data.link}); 
   

   });
  
   
   this.bsModalRef.hide();    
   

   }

}
