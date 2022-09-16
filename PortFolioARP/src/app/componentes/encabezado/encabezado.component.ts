import { Component, OnInit } from '@angular/core';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { faPen } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.css']
})
export class EncabezadoComponent implements OnInit {
  miPortfolio:any;
  faPen=faPen;

  constructor( private datosPortfolios:PortfolioService) { }

  ngOnInit(): void {
    this.datosPortfolios.obtenerDatos().subscribe(data=>{ 
      console.log(data);
      
      this.miPortfolio=data;
    });
  }

}
