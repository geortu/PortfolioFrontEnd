import { Component, OnInit } from '@angular/core';
import { faRightToBracket,faPersonWalkingArrowRight,faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { faInstagram,faFacebook, faSquareInstagram,faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {
  faRight=faRightToBracket;
  faInstagram=faInstagram;
  faFacebook=faFacebook;
  faPersonWalkingArrowRight=faPersonWalkingArrowRight;
  isLogged=false;
  
  constructor(private tokenService:TokenService) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
    }else{
      this.isLogged=false;
    }
  }
  onLOgout():void{
    this.tokenService.logOut();
    this.isLogged=false;
    
   
  }

}
