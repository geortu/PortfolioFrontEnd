import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-editar-proyecto',
  templateUrl: './editar-proyecto.component.html',
  styleUrls: ['./editar-proyecto.component.css']
})
export class EditarProyectoComponent implements OnInit {
  editar:FormGroup;  
  path="proyecto";
  proyectos:any[]=[];
  public event: EventEmitter<any> = new EventEmitter(); 

  constructor(public bsModalRef: BsModalRef,private tokenService:TokenService,private portFolioService:PortfolioService ,private FormBuilder:FormBuilder) { 
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
    this.editar.controls['nombre'].setValue(this.proyectos[this.proyectos.findIndex(element=>element['tag']=="nombre")].value);
    this.editar.controls['descripcion'].setValue(this.proyectos[this.proyectos.findIndex(element=>element['tag']=="descripcion")].value);
    this.editar.controls['fecha'].setValue(this.portFolioService.obtenerFecha(this.proyectos[this.proyectos.findIndex(element=>element['tag']=="fecha")].value));
    this.editar.controls['link'].setValue(this.proyectos[this.proyectos.findIndex(element=>element['tag']=="link")].value);
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
    
    
     
    
   this.portFolioService.actualizar(this.proyectos[this.proyectos.findIndex(element=>element['tag']=="id")].value,formData,this.path).subscribe(data=>{
    this.event.emit({ id:data.id, nombre:data.nombre,fecha:data.fecha, descripcion:data.descripcion,link:data.link}); 
   

   });
  
   
   this.bsModalRef.hide();    
   

   }


}
