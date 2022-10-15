import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicio/token.service';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  myimage!: Observable<any>;
  base64code: any;
  

  constructor(private tokenService:TokenService,private portFolioService:PortfolioService ,private FormBuilder:FormBuilder,private ruta:Router  ) { 
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
    
    this.portFolioService.obtenerPersona(this.tokenService.getUserName()).subscribe(data=>{
      var fechaNacimiento=data.fecha_nacimiento;
      var splitted = fechaNacimiento.split("/");
      var nuevaFecha=splitted[2]+"-"+splitted[1]+"-"+splitted[0];
     
     
      
      
      
      
     
      this.editar.controls['nombre'].setValue(data.nombre);
      this.editar.controls['apellido'].setValue(data.apellido);
      this.editar.controls['fecha_nacimiento'].setValue(nuevaFecha);
      this.editar.controls['nacionalidad'].setValue(data.nacionalidad);
      this.editar.controls['direccion'].setValue(data.domicilio.direccion);
      this.editar.controls['numero'].setValue(data.domicilio.numero);
     // this.editar.controls['foto_portada'].setValue(data.foto_portada);
     // this.editar.controls['foto_perfil'].setValue(data.foto_perfil);
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
  public onFileChangedFotoPerfil(event:any) {
    //Select File
    this.selectedFotoPerfil = event.target.files[0];
    
  }
  public onFileChangedFotoPortada(event:any) {
    //Select File
    this.selectedFotoPortada = event.target.files[0];
   
    
    

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
   
    this.ruta.navigate(['/portfolio']);

   }

}
