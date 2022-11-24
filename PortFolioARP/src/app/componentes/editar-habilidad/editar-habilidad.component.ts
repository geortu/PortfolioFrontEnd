import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-editar-habilidad',
  templateUrl: './editar-habilidad.component.html',
  styleUrls: ['./editar-habilidad.component.css']
})
export class EditarHabilidadComponent implements OnInit {
  editar:FormGroup;
  skill: any[] = []; 
  public event: EventEmitter<any> = new EventEmitter(); 
  path="skill";

  constructor(public bsModalRef: BsModalRef, private portfolio:PortfolioService,private activatedRoute: ActivatedRoute,private tokenService:TokenService ,private FormBuilder:FormBuilder,private ruta:Router ) { 
    this.editar=this.FormBuilder.group(
      {
        
        nombre:['',Validators.required] ,  
        porcentaje:['',[Validators.required,Validators.max(100),Validators.min(0)]],
        
        
    
        
        

      });
  }

  ngOnInit(): void {
    this.editar.controls['nombre'].setValue(this.skill[this.skill.findIndex(element=>element['tag']=="nombre")].value);
    this.editar.controls['porcentaje'].setValue(this.skill[this.skill.findIndex(element=>element['tag']=="porcentaje")].value);
  }
  get Nombre(){
    return this.editar.get('nombre');
    
  }
  get Porcentaje(){
    return this.editar.get('porcentaje');
  }
  onUpdate(): void {
   
    
    const formData=new FormData();
   
    formData.append('nombre',this.editar.get('nombre')?.value);    
    formData.append('porcentaje',this.editar.get('porcentaje')?.value);     
    //formData.append('id_persona',this.skill[0].value);
    
  
    
   this.portfolio.actualizar(this.skill[this.skill.findIndex(element=>element['tag']=="id_skill")].value,formData,this.path).subscribe(data=>{
    this.event.emit({ id:data.id, nombre:data.nombre,porcentaje:data.porcentaje}); 
   

   });
    
    
   
                    
                  
     
   this.bsModalRef.hide();  
   

   }

}
