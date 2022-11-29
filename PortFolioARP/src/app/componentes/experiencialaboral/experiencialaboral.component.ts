import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';
import { EditarExpereincialaboralComponent } from '../editar-expereincialaboral/editar-expereincialaboral.component';
import { NuevaExperienciaComponent } from '../nueva-experiencia/nueva-experiencia.component';


@Component({
  selector: 'app-experiencialaboral',
  templateUrl: './experiencialaboral.component.html',
  styleUrls: ['./experiencialaboral.component.css']
})
export class ExperiencialaboralComponent implements OnInit {
  faPlus=faPlus;
  faPen=faPen;
  faTrash=faTrash;
  experiencias:Array<any>=[]
  logo:any;
  response: any;
  user:string="";
  id_persona:any;
  isLogged=false;
  path="experiencia";
  bsModalRef?: BsModalRef;
  experiencia:any;
  fechaInicio:string="";
  fechaFin:string="";


  constructor(private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolio:PortfolioService, private modalService: BsModalService) { 

  }

  ngOnInit(): void {
     this.isLogged=this.tokenService.getToken()==null? false:true;
      //this.user = this.activatedRoute.snapshot.params['user'];
      //this.portFolio.obtenerExperienciasByUser(this.user).subscribe((data)=>{
      this.portFolio.obtenerDatos().subscribe((data)=>{
      this.id_persona=data[0].id;
      this.response = data[0].experienciasLaborales;   
      
      this.response.forEach((element: {
        id: any; nombre_empresa: any; puesto: any; fecha_inicio: string; fecha_fin: string; descripcion: any; logo: File; 
}) => {
        this.fechaInicio=element.fecha_inicio;
        this.fechaFin=element.fecha_fin;
        this.experiencias.push({
        id:element.id,
        nombre_empresa:element.nombre_empresa,
        puesto:element.puesto,
        fecha_inicio:new Date(this.portFolio.obtenerFecha(element.fecha_inicio).toString()).getFullYear(),
        fecha_fin:new Date(this.portFolio.obtenerFecha(element.fecha_fin).toString()).getFullYear(),
        descripcion:element.descripcion,
        logo:this.portFolio.convertirBase64(element.logo)
        
       // id_persona:element.persona.id
        
          });
       });
       
    });
    
   //Pedndiente el ordenamiento  
    
  }
  borrarExperiencia(id:number){
    this.borrarArray(id);
      
    this.portFolio.borrar(id,this.path).subscribe();
   
   
    
  
  }
  borrarArray(id:number){
    const found = this.experiencias.findIndex(element => element.id==id);    
    this.experiencias.splice(found,1);

  }
  openModalNuevo() {
  
    const initialState = {
      id: [
        {"tag":'id_persona',"value":this.id_persona}
      ]
    };
   
      this.bsModalRef = this.modalService.show(NuevaExperienciaComponent,{initialState ,class: 'modal-lg'} );
       this.bsModalRef.content.closeBtnName = 'Close';    
        this.bsModalRef.content.event.subscribe((res: {
          descripcion: any;
          fecha_inicio: string; 
          fecha_fin: string;
          puesto: any;
          nombre_empresa: any;
          id: any;
          logo: File;  
}) => {
        this.experiencias.push({
          
        id:res.id,
        nombre_empresa:res.nombre_empresa,
        puesto:res.puesto,
        fecha_inicio:new Date(this.portFolio.obtenerFecha(res.fecha_inicio).toString()).getFullYear(),
        fecha_fin:new Date(this.portFolio.obtenerFecha(res.fecha_fin).toString()).getFullYear(),
        descripcion:res.descripcion,
        logo:this.portFolio.convertirBase64(res.logo)
        });
      });
    
      
    }
    openModalEditar(id:number) {
      
      this.experiencia=this.obtenerExperiencia(id);
      
      const initialState = {
            experiencias: [
              {"tag":'id',"value":this.experiencia.id},
              {"tag":'nombre_empresa',"value":this.experiencia.nombre_empresa},
              {"tag":'puesto',"value":this.experiencia.puesto},
              {"tag":'fecha_inicio',"value":this.fechaInicio},
              {"tag":'fecha_fin',"value":this.fechaFin},
              {"tag":'descripcion',"value":this.experiencia.descripcion}
             
            
            ]
          }; 
       
    
      
     
     
        this.bsModalRef = this.modalService.show(EditarExpereincialaboralComponent,{initialState ,class: 'modal-lg'} );
        this.bsModalRef.content.closeBtnName = 'Close';   
        
        
          this.bsModalRef.content.event.subscribe((res: { descripcion: any;
            fecha_inicio: string; 
            fecha_fin: string;
            puesto: any;
            nombre_empresa: any;
            id: any;
            logo: File;   }) => {
            this.borrarArray(res.id);
          this.experiencias.push({
            id:res.id,
            nombre_empresa:res.nombre_empresa,
            puesto:res.puesto,
            fecha_inicio:new Date(this.portFolio.obtenerFecha(res.fecha_inicio).toString()).getFullYear(),
            fecha_fin:new Date(this.portFolio.obtenerFecha(res.fecha_fin).toString()).getFullYear(),
            descripcion:res.descripcion,
            logo:this.portFolio.convertirBase64(res.logo)
            
          });
        });
      
      
        
      }
      obtenerExperiencia(id:number){
        return  this.experiencias.find(element => element.id==id);
      }
      openModalDetalle(id:number,template: TemplateRef<any>){
        this.experiencia=this.obtenerExperiencia(id);
        this.bsModalRef = this.modalService.show(template, {class: 'modal-lg'});

      }
  

}
