import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Token } from '@angular/compiler';
import { TokenService } from 'src/app/servicio/token.service';
import { Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
   miPortfolio:any="";
   faPen=faPen;
   myimage!: Observable<any>;
   base64code: any;
   foto_perfil:any;
   foto_portada:any;
  
 // retrievedImage: any;
  //base64Data: any;
  //retrieveResonse: any;
  

  constructor( private datosPortfolios:PortfolioService, private tokenService:TokenService) {  

  }

  ngOnInit(): void {
    let user=this.tokenService.getUserName();
    this.datosPortfolios.obtenerPersona(user).subscribe(data=>{   
     
         
      this.miPortfolio=data;
      //this.base64Data = this.miPortfolio.foto_perfil;
      //this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;  
      this.foto_perfil='data:image/jpeg;base64,' +this.miPortfolio.foto_perfil;  
      this.foto_portada='data:image/jpeg;base64,' +this.miPortfolio.foto_portada;
     
    });
  }
  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
 
    observable.subscribe((d) => {
      console.log(d)
      this.myimage = d
      this.base64code = d
    })
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
 
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };
    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    };
  }

}
