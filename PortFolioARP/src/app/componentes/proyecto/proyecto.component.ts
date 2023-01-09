import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';
import { EditarProyectoComponent } from '../editar-proyecto/editar-proyecto.component';
import { NuevoProyectoComponent } from '../nuevo-proyecto/nuevo-proyecto.component';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {
  faPlus=faPlus;
  faPen=faPen;
  faTrash=faTrash;
  proyectos:Array<any>=[]  
  response: any; 
  id_persona:any;
  isLogged=false;
  path="proyecto";
  bsModalRef?: BsModalRef;
  proyecto:any;
  fechaInicio:string="";
 

  constructor(private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolio:PortfolioService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.isLogged=this.tokenService.getToken()==null? false:true;
    this.portFolio.obtenerDatos().subscribe((data)=>{
      this.id_persona=data[0].id;
      this.response = data[0].proyectos;  
       
      
      this.response.forEach((element: {
        id: any; nombre: any;  fecha: string; fecha_fin: string; descripcion: any; link: any; 
}) => {
       ;
        
        this.proyectos.push({
        id:element.id,
        nombre:element.nombre,
        descripcion:element.descripcion,
        fecha:this.portFolio.obtenerFecha(element.fecha),        
        link:element.link
        
        
       // id_persona:element.persona.id
        
          });
       });
       
    });
  }
  borrarProyecto(id:number){
    this.borrarArray(id);
      
    this.portFolio.borrar(id,this.path).subscribe();
   
   
    
  
  }
  borrarArray(id:number){
    const found = this.proyectos.findIndex(element => element.id==id);    
    this.proyectos.splice(found,1);

  }
  openModalNuevo() {
  
    const initialState = {
      id: [
        {"tag":'id_persona',"value":this.id_persona}
      ]
    };
   
      this.bsModalRef = this.modalService.show(NuevoProyectoComponent,{initialState ,class: 'modal-lg'} );
       this.bsModalRef.content.closeBtnName = 'Close';    
        this.bsModalRef.content.event.subscribe((res: {
          descripcion: any;
          fecha: string;         
          link: any;
          nombre: any;
          id: any;
          
}) => {
        this.proyectos.push({
          
          id:res.id,
          nombre:res.nombre,
          descripcion:res.descripcion,
          fecha:this.portFolio.obtenerFecha(res.fecha),        
          link:res.link
        });
      });
    
      
    }
    openModalEditar(id:number) {
      
      this.proyecto=this.obtenerProyecto(id);
      
      const initialState = {
            proyectos: [
              {"tag":'id',"value":this.proyecto.id},
              {"tag":'nombre',"value":this.proyecto.nombre},
              {"tag":'descripcion',"value":this.proyecto.descripcion},
              {"tag":'fecha',"value":this.proyecto.fecha},
              {"tag":'link',"value":this.proyecto.link},
             
             
            
            ]
          }; 
       
    
      
     
     
        this.bsModalRef = this.modalService.show(EditarProyectoComponent,{initialState ,class: 'modal-lg'} );
        this.bsModalRef.content.closeBtnName = 'Close';   
        
        
        this.bsModalRef.content.event.subscribe((res: {
          descripcion: any;
          fecha: string;         
          link: any;
          nombre: any;
          id: any;

          
}) => {
        this.borrarArray(res.id);
        this.proyectos.push({
          
          id:res.id,
          nombre:res.nombre,
          descripcion:res.descripcion,
          fecha:this.portFolio.obtenerFecha(res.fecha),        
          link:res.link
        });
      });
      
      
        
      }
      obtenerProyecto(id:number){
        return  this.proyectos.find(element => element.id==id);
      }
      


}
