import { Component, OnInit, TemplateRef } from '@angular/core';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';
import { EditarEducacionComponent } from '../editar-educacion/editar-educacion.component';
import { NuevaEducacionComponent } from '../nueva-educacion/nueva-educacion.component';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  faPlus=faPlus;
  faPen=faPen;
  faTrash=faTrash;
  educaciones:Array<any>=[]
  logo:any;
  response: any; 
  id_persona:any;
  isLogged=false;
  path="educacion";
  bsModalRef?: BsModalRef;
  educacion:any;
  fechaInicio:string="";
  fechaFin:string="";
  constructor(private tokenService:TokenService,private portFolio:PortfolioService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.isLogged=this.tokenService.getToken()==null? false:true;
    //this.user = this.activatedRoute.snapshot.params['user'];
    //this.portFolio.obtenerExperienciasByUser(this.user).subscribe((data)=>{
    this.portFolio.obtenerDatos().subscribe((data)=>{
    this.id_persona=data[0].id;
    this.response = data[0].educaciones;   
    
    this.response.forEach((element: {
      puntaje: any; id: any; establecimiento: any; titulo: any; inicio: string; fin: string; carrera: any; logo: File; 
}) => {
     
      this.educaciones.push({
      id:element.id,
      establecimiento:element.establecimiento,
      titulo:element.titulo,
      inicio:this.portFolio.obtenerFecha(element.inicio),
      fin:this.portFolio.obtenerFecha(element.fin).toString(),
      carrera:element.carrera,
      puntaje:element.puntaje,
      logo:this.portFolio.convertirBase64(element.logo)
      
     
      
        });
     });
     
  });


  }
  borrarEducacion(id:number){
    this.borrarArray(id);
      
    this.portFolio.borrar(id,this.path).subscribe();
   
   
    
  
  }
  borrarArray(id:number){
    const found = this.educaciones.findIndex(element => element.id==id);    
    this.educaciones.splice(found,1);

  }
  openModalNuevo() {
  
    const initialState = {
      id: [
        {"tag":'id_persona',"value":this.id_persona}
      ]
    };
   
      this.bsModalRef = this.modalService.show(NuevaEducacionComponent,{initialState ,class: 'modal-lg'} );
       this.bsModalRef.content.closeBtnName = 'Close';    
        this.bsModalRef.content.event.subscribe((res: {
          puntaje: any; id: any; establecimiento: any; titulo: any; inicio: string; fin: string; carrera: any; logo: File; 
}) => {
        this.educaciones.push({
          
          id:res.id,
          establecimiento:res.establecimiento,
          titulo:res.titulo,
          inicio:this.portFolio.obtenerFecha(res.inicio),
          fin:this.portFolio.obtenerFecha(res.fin),
          carrera:res.carrera,
          puntaje:res.puntaje,
          logo:this.portFolio.convertirBase64(res.logo)
        });
      });
    
      
    }
    openModalEditar(id:number) {
      
      this.educacion=this.obtenerEducacion(id);
      
      const initialState = {
            educaciones: [
              {"tag":'id',"value":this.educacion.id},
              {"tag":'establecimiento',"value":this.educacion.establecimiento},
              {"tag":'titulo',"value":this.educacion.titulo},
              {"tag":'inicio',"value":this.educacion.inicio},
              {"tag":'fin',"value":this.educacion.fin},
              {"tag":'carrera',"value":this.educacion.carrera},
              {"tag":'puntaje',"value":this.educacion.puntaje}
             
            
            ]
          }; 
       
    
      
     
     
        this.bsModalRef = this.modalService.show(EditarEducacionComponent,{initialState ,class: 'modal-lg'} );
        this.bsModalRef.content.closeBtnName = 'Close';   
        
        this.bsModalRef.content.event.subscribe((res: {
          puntaje: any; id: any; establecimiento: any; titulo: any; inicio: string; fin: string; carrera: any; logo: File; 
}) => {
        this.borrarArray(res.id);
        this.educaciones.push({
          
          id:res.id,
          establecimiento:res.establecimiento,
          titulo:res.titulo,
          inicio:this.portFolio.obtenerFecha(res.inicio),
          fin:this.portFolio.obtenerFecha(res.fin),
          carrera:res.carrera,
          puntaje:res.puntaje,
          logo:this.portFolio.convertirBase64(res.logo)
        });
      });
      
      
        
      }
      obtenerEducacion(id:number){
        return  this.educaciones.find(element => element.id==id);
      }
      openModalDetalle(id:number,template: TemplateRef<any>){
        this.educacion=this.obtenerEducacion(id);
        this.bsModalRef = this.modalService.show(template, {class: 'modal-lg'});

      }
      obtnerAnoFecha(fecha:string):string{
        var a =new Date(fecha).getFullYear().toString();
        return a;
      }

}
