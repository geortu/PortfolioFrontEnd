import { Component, OnInit } from '@angular/core';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';

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
  constructor(private tokenService:TokenService,private portFolio:PortfolioService) { }

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
      inicio:new Date(this.portFolio.obtenerFecha(element.inicio).toString()).getFullYear(),
      fin:new Date(this.portFolio.obtenerFecha(element.fin).toString()).getFullYear(),
      carrera:element.carrera,
      puntaje:element.puntaje,
      logo:this.portFolio.convertirBase64(element.logo)
      
     
      
        });
     });
     
  });


  }
  borrarEducacion(id:number){
    const found = this.educaciones.findIndex(element => element.id==id);
    
    this.educaciones.splice(found,1);
      
    this.portFolio.borrar(id,this.path).subscribe();
   
   
    
  
  }

}
