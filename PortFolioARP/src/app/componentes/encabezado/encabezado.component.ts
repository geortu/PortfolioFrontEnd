import { Component, OnInit, TemplateRef } from '@angular/core';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { faPen,faCircleInfo } from '@fortawesome/free-solid-svg-icons';

import { Token } from '@angular/compiler';
import { TokenService } from 'src/app/servicio/token.service';
import { Observable, Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { EditarPersonaComponent } from '../editar-persona/editar-persona.component';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
   miPortfolios:any="";
   faPen=faPen;  
   faCircle=faCircleInfo; 
   foto_perfil:any;
   foto_portada:any;
   isLogged=false;
   bsModalRef?: BsModalRef;
  
 
  

  constructor( private datosPortfolios:PortfolioService, private tokenService:TokenService,private activatedRoute: ActivatedRoute,private modalService: BsModalService) {  

  }

  ngOnInit(): void {   
    this.isLogged=this.tokenService.getToken()==null? false:true;
      //const user = this.activatedRoute.snapshot.params['user'];      
      //const user=this.tokenService.getUserName();
      //this.datosPortfolios.obtenerPersona(user).subscribe(data=>{   
       this.datosPortfolios.obtenerDatos().subscribe(data=>{    
       this.miPortfolios=data[0];
      //this.miPortfolios=data;     
      this.foto_perfil=this.datosPortfolios.convertirBase64(this.miPortfolios.foto_perfil) ;  
      this.foto_portada= this.datosPortfolios.convertirBase64(this.miPortfolios.foto_portada);
     
    });
   
   
    
  }
  openModalEditar(id:number) {
      
    
    
    const initialState = {
          persona: [
            {"tag":'id',"value":this.miPortfolios.id},
            {"tag":'nombre',"value":this.miPortfolios.nombre},
            {"tag":'apellido',"value":this.miPortfolios.apellido},
            {"tag":'nacionalidad',"value":this.miPortfolios.nacionalidad},
            {"tag":'fecha_nacimiento',"value":this.miPortfolios.fecha_nacimiento},
            {"tag":'sobre_mi',"value":this.miPortfolios.sobre_mi},
            {"tag":'telefono',"value":this.miPortfolios.telefono},
            {"tag":'ocupacion',"value":this.miPortfolios.ocupacion},
            {"tag":'direccion',"value":this.miPortfolios?.domicilio?.direccion},
            {"tag":'numero',"value":this.miPortfolios?.domicilio?.numero},
            {"tag":'provincia',"value":this.miPortfolios?.domicilio?.provincia}
           
          
          ]
        }; 
     
  
    
   
   
      this.bsModalRef = this.modalService.show(EditarPersonaComponent,{initialState ,class: 'modal-lg'} );
      this.bsModalRef.content.closeBtnName = 'Close';   
      
      
        this.bsModalRef.content.event.subscribe((res: any) => {
         this.miPortfolios=res;
         this.foto_perfil=this.datosPortfolios.convertirBase64(this.miPortfolios.foto_perfil) ;  
         this.foto_portada= this.datosPortfolios.convertirBase64(this.miPortfolios.foto_portada);
       
      });
    
    
      
    }
    openModal(template: TemplateRef<any>) {
      this.bsModalRef = this.modalService.show(template, {class: 'modal-lg'});
    }

  

}
