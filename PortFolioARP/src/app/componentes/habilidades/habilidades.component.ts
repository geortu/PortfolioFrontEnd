import { Component, EventEmitter, HostBinding, OnInit, SimpleChanges,TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { NuevaHabilidadComponent } from '../nueva-habilidad/nueva-habilidad.component';
import { EditarHabilidadComponent } from '../editar-habilidad/editar-habilidad.component';



@Component({
  selector: 'app-habilidades',
  templateUrl: './habilidades.component.html',
  styleUrls: ['./habilidades.component.css']
})
export class HabilidadesComponent implements OnInit {
  faPlus=faPlus;
  
  faPen=faPen;
  faTrash=faTrash;
  isLogged=false;
  habilidades:Array<any>=[];
  id_persona:any;
  progressDerecho!:number;
  progressIzquierdo!:number;
  tiempoDerecho:string="";
  tiempoIzquierdo:string="";
  rotateLeft:string="";
  rotateRight:string="";
  response: any;
  path="skill";
  bsModalRef?: BsModalRef;
  skill:any; 
   
 

  constructor(private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolio:PortfolioService,
    private modalService: BsModalService) { 
  
  }

  ngOnInit(): void {
    this.isLogged=this.tokenService.getToken()==null? false:true;
    this.ObtenerDatos();       
   
       
   
    
    
     
   
  
   
  }
  ObtenerDatos(){
      this.habilidades=new Array<any>();
      this.portFolio.obtenerDatos().subscribe((data)=>{
      this.id_persona=data[0].id;
      this.response = data[0].skilles;  
      //this.habilidades = data[0].skilles; 
      
      this.response.forEach((element: {
        id: any; nombre: any; porcentaje: any; 
}) => {
  
        this.habilidades.push({
        id:element.id,
        nombre:element.nombre,
        porcentaje:element.porcentaje,
        

       
        
       // id_persona:element.persona.id
        
          });
          
       });
       
    }); 
   

  }
  
 
  
  loadSkillIzquierdo(porcentaje:number):string{      
   
     if(porcentaje >= 50){
      
      this.progressIzquierdo=Math.round(((porcentaje-50)/50)*180);  
      
      return  this.rotateLeft="rotate("+this.progressIzquierdo +"deg)";
      
      //scrollProgressRight.style.animation="loading-1 2s linear forwards";        
     // this.tiempoIzquierdo=(((porcentaje-50)/50)*2).toString();     
     // scrollProgressLeft.style.animation= `loading-2 ${this.tiempoIzquierdo}s linear forwards 2s`;              
    }else{
      
      this.progressIzquierdo=0; 
         
      return this.rotateLeft="rotate("+this.progressIzquierdo +"deg)";
      
     
    } 
  }
  loadSkillDerecho(porcentaje:number):string{      
   
    if(porcentaje >= 50){
    
     this.progressDerecho=180; 
    
    return this.rotateRight="rotate("+this.progressDerecho +"deg)"; 
     //scrollProgressRight.style.animation="loading-1 2s linear forwards";        
    // this.tiempoIzquierdo=(((porcentaje-50)/50)*2).toString();     
    // scrollProgressLeft.style.animation= `loading-2 ${this.tiempoIzquierdo}s linear forwards 2s`;              
   }else{
    
     this.progressDerecho=Math.round(((porcentaje)/50)*180);
       
     return this.rotateRight="rotate("+this.progressDerecho +"deg)"; 
    
   } 
 }
    


  
  borrar(id:number){
    this.borrarArray(id);    
    this.portFolio.borrar(id,this.path).subscribe();
   
    
  
  }
  borrarArray(id:number){
    const found = this.habilidades.findIndex(element => element.id==id);    
    this.habilidades.splice(found,1);

  }
  openModalNuevo() {
  
  const initialState = {
    id: [
      {"tag":'id_persona',"value":this.id_persona}
    ]
  };
 
    this.bsModalRef = this.modalService.show(NuevaHabilidadComponent,{initialState ,class: 'modal-lg'} );
     this.bsModalRef.content.closeBtnName = 'Close';    
      this.bsModalRef.content.event.subscribe((res: { nombre: any; porcentaje: any; id: any; }) => {
      this.habilidades.push({
        
        nombre:res.nombre,
        porcentaje:res.porcentaje,
        id:res.id
      });
    });
  
    
  }
  openModalEditar(id:number) {
    this.skill=this.obtenerSkill(id);
    
    const initialState = {
          skill: [
            {"tag":'id_skill',"value":this.skill.id},
            {"tag":'nombre',"value":this.skill.nombre},
            {"tag":'porcentaje',"value":this.skill.porcentaje}
          ]
        }; 
     
  
    
   
   
      this.bsModalRef = this.modalService.show(EditarHabilidadComponent,{initialState ,class: 'modal-lg'} );
      this.bsModalRef.content.closeBtnName = 'Close';   
      
      
        this.bsModalRef.content.event.subscribe((res: { nombre: any; porcentaje: any; id: any; }) => {
          this.borrarArray(res.id);
        this.habilidades.push({
          id:res.id,
          nombre:res.nombre,
          porcentaje:res.porcentaje
          
        });
      });
    
    
      
    }
    obtenerSkill(id:number){
      return  this.habilidades.find(element => element.id==id);
    }
 
 
  
  
  

}
