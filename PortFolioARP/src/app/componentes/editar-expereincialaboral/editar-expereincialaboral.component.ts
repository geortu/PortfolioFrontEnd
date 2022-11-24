import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,ValidationErrors,ValidatorFn,Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
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
  path="experiencia";
  experiencias:any[]=[];
  public event: EventEmitter<any> = new EventEmitter(); 

  constructor(public bsModalRef: BsModalRef, private date:DatePipe,private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolioService:PortfolioService ,private FormBuilder:FormBuilder,private ruta:Router  ) {
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
    //this.id=this.activatedRoute.snapshot.params['id'];
    //this.portFolioService.obtenerById(this.id,this.path).subscribe(data =>{
      
      //this.user=data.persona.email;});
      this.editar.controls['nombre_empresa'].setValue(this.experiencias[this.experiencias.findIndex(element=>element['tag']=="nombre_empresa")].value);
      this.editar.controls['puesto'].setValue(this.experiencias[this.experiencias.findIndex(element=>element['tag']=="puesto")].value);
      this.editar.controls['fecha_inicio'].setValue(this.portFolioService.obtenerFecha(this.experiencias[this.experiencias.findIndex(element=>element['tag']=="fecha_inicio")].value));
      this.editar.controls['fecha_fin'].setValue(this.portFolioService.obtenerFecha(this.experiencias[this.experiencias.findIndex(element=>element['tag']=="fecha_fin")].value));
      this.editar.controls['descripcion'].setValue(this.experiencias[this.experiencias.findIndex(element=>element['tag']=="descripcion")].value);  
      this.fechaInicio= this.portFolioService.obtenerFecha(this.experiencias[this.experiencias.findIndex(element=>element['tag']=="fecha_inicio")].value);
      this.fechaFin=this.portFolioService.obtenerFecha(this.experiencias[this.experiencias.findIndex(element=>element['tag']=="fecha_fin")].value);
     


    



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
  
  
   
  
 //this.portFolioService.actualizar(this.id,formData,this.path).subscribe();
 this.portFolioService.actualizar(this.experiencias[this.experiencias.findIndex(element=>element['tag']=="id")].value,formData,this.path).subscribe(data=>{
  this.event.emit({ id:data.id, nombre_empresa:data.nombre_empresa,puesto:data.puesto,
    fecha_inicio:data.fecha_inicio,fecha_fin:data.fecha_fin, descripcion:data.descripcion,logo:data.logo}); 
 

 });  
 this.bsModalRef.hide(); 
 
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
  

 
 
 
 
 }
 onChangeValueFechaFin(){   
  
  
    this.fechaFin=this.FechaFin?.value;
  
  
 }
 cancelar(){
  this.editar.reset();
  this.ruta.navigate(['/portfolio']);

}

}
