import { Component, EventEmitter, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from 'src/app/servicio/token.service';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-nueva-habilidad',
  templateUrl: './nueva-habilidad.component.html',
  styleUrls: ['./nueva-habilidad.component.css']
})
export class NuevaHabilidadComponent implements OnInit {
  editar:FormGroup;
  id: any[] = []; 
  public event: EventEmitter<any> = new EventEmitter();
  path="skill";
 

  constructor(public bsModalRef: BsModalRef, private portfolio:PortfolioService,private activatedRoute: ActivatedRoute,private tokenService:TokenService ,private FormBuilder:FormBuilder,private ruta:Router ) { 
    this.editar=this.FormBuilder.group(
      {
        
        nombre:['',Validators.required] ,  
        porcentaje:['',[Validators.required,Validators.max(100),Validators.min(0)]],
        
        
    
        
        

      }
      )
  }

  ngOnInit(): void {
    
    
    
   
    
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
    formData.append('id_persona',this.id[0].value);
    
  
    
   this.portfolio.crear(formData,this.path).subscribe();
   this.event.emit({ bandera:true  });                  
                  
     
   this.bsModalRef.hide();  

   }
  
 
  

}
