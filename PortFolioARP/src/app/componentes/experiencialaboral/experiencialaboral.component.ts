import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';


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


  constructor(private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolio:PortfolioService) { 

  }

  ngOnInit(): void {
    //this.user = this.activatedRoute.snapshot.params['user'];
   //this.portFolio.obtenerExperienciasByUser(this.user).subscribe((data)=>{
      this.portFolio.obtenerDatos().subscribe((data)=>{
      this.id_persona=data[0].id;
      this.response = data[0].experienciasLaborales; 
      console.log(this.response);     
      this.response.forEach((element: {
        id: any; nombre_empresa: any; puesto: any; fecha_inicio: string; fecha_fin: string; descripcion: any; logo: File; 
}) => {
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
    
  }
  borrarExperiencia(id:number){
    const found = this.experiencias.findIndex(element => element.id==id);
    
    this.experiencias.splice(found,1);
      
    this.portFolio.borrarExperiencia(id).subscribe();
   
   
    
  
  }
  

}
