import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-nueva-educacion',
  templateUrl: './nueva-educacion.component.html',
  styleUrls: ['./nueva-educacion.component.css']
})
export class NuevaEducacionComponent implements OnInit {
  editar:FormGroup;
  id:any;
  selectedFotologo!:File ;   
  fecha:any;  
  fechaInicio:string="";
  fechaFin:string="";
  path="educacion";
  
  

  constructor(private date:DatePipe,private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolioService:PortfolioService ,private FormBuilder:FormBuilder,private ruta:Router ) {
    
    this.editar=this.FormBuilder.group(
      {
        
        establecimiento:['',Validators.required] ,  
        titulo:['',Validators.required],
        carrera:['',Validators.required], 
        puntaje:['',[Validators.required,Validators.max(10),Validators.min(0)] ],
        logo:null,
        inicio:['',{validators: [Validators.required,this.validarFechaInicio()]}],
        fin:['',{validators: [Validators.required,this.validarFechaFin()]}]
        
        
    
        
        

      }
      )
   }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    

    //this.user=this.tokenService.getUserName();   
    if (new Date(this.Inicio?.value).toString()=="Invalid Date"){
      this.editar.controls['fin'].disable();
    }

  }
  onUpdate(): void {
   
    const formData=new FormData();
   
    formData.append('establecimiento',this.editar.get('establecimiento')?.value);    
    formData.append('titulo',this.editar.get('titulo')?.value);
    formData.append('inicio',this.editar.get('inicio')?.value);
    formData.append('fin',this.editar.get('fin')?.value);
    formData.append('logo',this.selectedFotologo != undefined? this.selectedFotologo: this.editar.get('logo')?.value);
    formData.append('carrera',this.editar.get('carrera')?.value);
    formData.append('puntaje',this.editar.get('puntaje')?.value);
    formData.append('id_persona',this.id);
    
     
    
   this.portFolioService.crear(formData,this.path).subscribe();
   
     
   
   this.ruta.navigate(['/portfolio']);
   //this.ruta.navigate(['/'+`portfolio/${this.user}`]);

   }
  get Establecimiento(){
    return this.editar.get('establecimiento');
    
  }
  get Titulo(){
    return this.editar.get('titulo')
  }
  get Carrera(){
    return this.editar.get('carrera');
    
  }
  get Puntaje(){
    return this.editar.get('puntaje')
  }
  get Inicio(){
    return this.editar.get('inicio');
  }
  get Fin(){
    return this.editar.get('fin');
  }
  public onFileChangedFotoLogo(event:any) {
    //Select File
    this.selectedFotologo = event.target.files[0];
   
        
  }
  onChangeValueFecha(){
    this.fechaInicio=this.Inicio?.value;
    var f=new Date(this.editar.get('inicio')?.value);       
    f.setDate(f.getDate() + 1);    
   
    if (new Date(this.Inicio?.value).toString()!="Invalid Date"){
      this.fecha=this.date.transform(f,'yyyy-MM-dd');
      this.editar.controls['fin'].enable();
    }
   

   
   
   
   
   }
   onChangeValueFechaFin(){   
    
    
      this.fechaFin=this.Fin?.value;
    
    
   }
  validarFechaFin():ValidatorFn {
    return(control:AbstractControl) : ValidationErrors | null=> {
        var fecha1=new Date(this.fechaInicio);
        var fecha2=new Date(control.value);
        if(fecha1.toString()=="Invalid Date"){        
          return null;
         }

        const fechaValida=  fecha1 < fecha2 ;
            return !fechaValida? {"validarFechaFin":true}:null;    
        
  
       
        
    }
    
    
}
validarFechaInicio():ValidatorFn {
  return(control:AbstractControl) : ValidationErrors | null=> {
      var fecha1=new Date(control.value);
      var fecha2=new Date(this.fechaFin);
       if(fecha2.toString()=="Invalid Date"){        
        return null;
       }
        const fechaValida= fecha1 < fecha2 ;
          return !fechaValida? {"validarFecha":true}:null;    
      

     
      
  }
}
cancelar(){
  this.editar.reset();
  this.ruta.navigate(['/portfolio']);

}

}
