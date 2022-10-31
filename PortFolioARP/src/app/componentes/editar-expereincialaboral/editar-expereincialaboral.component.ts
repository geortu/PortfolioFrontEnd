import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,ValidationErrors,ValidatorFn,Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-editar-expereincialaboral',
  templateUrl: './editar-expereincialaboral.component.html',
  styleUrls: ['./editar-expereincialaboral.component.css']
})
export class EditarExpereincialaboralComponent implements OnInit {
  editar:FormGroup;
  
  selectedFotologo!:File ;  
  user:string="";
  id?:number
  fecha:any;
  isFechaInicio:boolean=false;
  fechaInicio:string="";
  fechaFin:string="";

  constructor(private date:DatePipe,private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolioService:PortfolioService ,private FormBuilder:FormBuilder,private ruta:Router  ) {
    this.editar=this.FormBuilder.group(
      {
        
        nombre_empresa:['',Validators.required] ,  
        puesto:['',Validators.required],
        fecha_inicio:['',{validators: [Validators.required,this.validarFechaInicio()]}], 
        fecha_fin:['', {validators: [Validators.required,this.validarFechaFin()]}],
        logo:null,
        descripcion:['',Validators.required]
        
    
        
        

      })
     }

  ngOnInit(): void {
    this.id=this.activatedRoute.snapshot.params['id'];
    this.portFolioService.obtenerExperienciasById(this.id).subscribe(data =>{
      
      this.user=data.persona.email;
      this.editar.controls['nombre_empresa'].setValue(data.nombre_empresa);
      this.editar.controls['puesto'].setValue(data.puesto);
      this.editar.controls['fecha_inicio'].setValue(this.portFolioService.obtenerFecha(data.fecha_inicio));
      this.editar.controls['fecha_fin'].setValue(this.portFolioService.obtenerFecha(data.fecha_fin));
      this.editar.controls['descripcion'].setValue(data.descripcion);  
      this.fechaInicio= this.portFolioService.obtenerFecha(data.fecha_inicio);
      this.fechaFin=this.portFolioService.obtenerFecha(data.fecha_fin);
     


    });



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
get Empresa(){
  return this.editar.get('nombre_empresa');
  
}
get Puesto(){
  return this.editar.get('puesto')
}
get FechaInicio(){
  return this.editar.get('fecha_inicio');
}
get FechaFin(){
  return this.editar.get('fecha_fin');
}

public onFileChangedFotoLogo(event:any) {
  //Select File
  this.selectedFotologo = event.target.files[0];
      
}
onUpdate(): void {
   
  const formData=new FormData();
 
  formData.append('nombre_empresa',this.editar.get('nombre_empresa')?.value);    
  formData.append('puesto',this.editar.get('puesto')?.value);
  formData.append('fecha_inicio',this.editar.get('fecha_inicio')?.value);
  formData.append('fecha_fin',this.editar.get('fecha_fin')?.value);
  formData.append('logo',this.selectedFotologo);
  formData.append('descripcion',this.editar.get('descripcion')?.value);
  
  
   
  
 this.portFolioService.actualizarExperiencia(this.id,formData).subscribe();
   
 
 //this.ruta.navigate(['/portfolio']);
 //this.ruta.navigate(['/'+`portfolio/${this.user}`]);

 }
 onChangeValueFecha(){

  this.fechaInicio=this.FechaInicio?.value;
  var f=new Date(this.editar.get('fecha_inicio')?.value);       
  f.setDate(f.getDate() + 1);    
 
  if (new Date(this.FechaInicio?.value).toString()!="Invalid Date"){
    this.fecha=this.date.transform(f,'yyyy-MM-dd');
    
  }
  console.log(this.fechaInicio);
  console.log(this.fechaFin);

 
 
 
 
 }
 onChangeValueFechaFin(){   
  
  
    this.fechaFin=this.FechaFin?.value;
  
  
 }

}
