import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Token } from '@angular/compiler';
import { TokenService } from 'src/app/servicio/token.service';
import { Observable, Subscriber } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
   miPortfolios:any="";
   faPen=faPen;   
   foto_perfil:any;
   foto_portada:any;
  
 
  

  constructor( private datosPortfolios:PortfolioService, private tokenService:TokenService,private activatedRoute: ActivatedRoute) {  

  }

  ngOnInit(): void {   
      // const user = this.activatedRoute.snapshot.params['user'];
      //console.log(id);
      //const user=this.tokenService.getUserName();
      //this.datosPortfolios.obtenerPersona(user).subscribe(data=>{   
       this.datosPortfolios.obtenerDatos().subscribe(data=>{    
       this.miPortfolios=data[0];
      //this.miPortfolios=data;
      console.log(this.miPortfolios);
      this.foto_perfil=this.datosPortfolios.convertirBase64(this.miPortfolios.foto_perfil) ;  
      this.foto_portada= this.datosPortfolios.convertirBase64(this.miPortfolios.foto_portada);
     
    });
   
   
    
  }
  

}
