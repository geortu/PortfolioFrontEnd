import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicio/token.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { Observable, Subscriber } from 'rxjs';
import { PersonaDto } from 'src/app/model/persona-dto';

@Component({
  selector: 'app-editar-persona',
  templateUrl: './editar-persona.component.html',
  styleUrls: ['./editar-persona.component.css']
})
export class EditarPersonaComponent implements OnInit {
  editar:FormGroup;
  id!:number
  //id_domicilio?:number;
  selectedFotoPerfil!:File ;
  selectedFotoPortada!:File;
  user:string="";
  
  

  constructor(private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolioService:PortfolioService ,private FormBuilder:FormBuilder,private ruta:Router  ) { 
    this.editar=this.FormBuilder.group(
      {
        
        nombre:['',Validators.required] ,  
        apellido:['',Validators.required],
        fecha_nacimiento:['',Validators.required], 
        nacionalidad:['',Validators.required],
        direccion:['',Validators.required],
        numero:['',Validators.required],
        provincia:['',Validators.required],
        foto_portada:null,
        foto_perfil:null,
        sobre_mi:[''],
        ocupacion:['']   
    
        
        

      })
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params['id']
    //this.portFolioService.obtenerPersona(this.tokenService.getUserName()).subscribe
   
     this.portFolioService.optenerPersonaById(id).subscribe(data=>{
     this.user=data.email;
      
      //this.selectedFotoPerfil=this.portFolioService.convertirBase64( data.foto_perfil);
      //this.selectedFotoPortada=this.portFolioService.convertirBase64(data.foto_portada);    
      
      
     
      this.editar.controls['nombre'].setValue(data.nombre);
      this.editar.controls['apellido'].setValue(data.apellido);
      this.editar.controls['fecha_nacimiento'].setValue(this.portFolioService.obtenerFecha(data.fecha_nacimiento));
      this.editar.controls['nacionalidad'].setValue(data.nacionalidad);
      this.editar.controls['direccion'].setValue(data.domicilio.direccion);
      this.editar.controls['numero'].setValue(data.domicilio.numero);    
      this.editar.controls['provincia'].setValue(data.domicilio.provincia);
      this.editar.controls['sobre_mi'].setValue(data.sobre_mi);
      this.editar.controls['ocupacion'].setValue(data.ocupacion);
      this.id=data.id;
     
      



    });
    
  }
  get Nombre(){
    return this.editar.get('nombre');
  }
  get Apellido(){
    return this.editar.get('apellido')
  }
  get Nacionalidad(){
    return this.editar.get('nacionalidad')
  }
  get Direccion(){
    return this.editar.get('direccion')
  }
  get Provincia(){
    return this.editar.get('provincia')
  }
  get NUmero(){
    return this.editar.get('numero')
  }
  public onFileChangedFotoPerfil(event:any) {
    //Select File
    this.selectedFotoPerfil = event.target.files[0];
    
  }
  public onFileChangedFotoPortada(event:any) {
    //Select File
    this.selectedFotoPortada = event.target.files[0];
   
    
    

  }

  
  onUpdate(): void {
   
    const formData=new FormData();
    formData.append('foto_perfil',this.selectedFotoPerfil);   
    formData.append('foto_portada',this.selectedFotoPortada);
    formData.append('sobre_mi',this.editar.get('sobre_mi')?.value);    
    formData.append('ocupacion',this.editar.get('ocupacion')?.value);
    formData.append('direccion',this.editar.get('direccion')?.value);
    formData.append('numero',this.editar.get('numero')?.value);
    formData.append('provincia',this.editar.get('provincia')?.value);
    formData.append('nombre',this.editar.get('nombre')?.value);
    formData.append('apellido',this.editar.get('apellido')?.value);
    formData.append('nacionalidad',this.editar.get('nacionalidad')?.value);
    formData.append('fecha_nacimiento',this.editar.get('fecha_nacimiento')?.value);
     
    
   this.portFolioService.upDate(this.id,formData).subscribe();
     
   
   //this.ruta.navigate(['/portfolio']);
   this.ruta.navigate(['/'+`portfolio/${this.user}`]);

   }

}
