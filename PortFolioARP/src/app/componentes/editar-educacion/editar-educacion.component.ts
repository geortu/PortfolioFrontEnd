import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';

@Component({
  selector: 'app-editar-educacion',
  templateUrl: './editar-educacion.component.html',
  styleUrls: ['./editar-educacion.component.css']
})
export class EditarEducacionComponent implements OnInit {
  editar:FormGroup;
  selectedFotologo!:File ;  
  user:string="";
  id?:number
  fecha:any;
  isFechaInicio:boolean=false;
  fechaInicio:string="";
  fechaFin:string="";
  path="educacion";
  educaciones:any[]=[];
  public event: EventEmitter<any> = new EventEmitter(); 

  constructor(public bsModalRef: BsModalRef,private date:DatePipe,private activatedRoute: ActivatedRoute,private tokenService:TokenService,private portFolioService:PortfolioService ,private FormBuilder:FormBuilder,private ruta:Router ) {
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
    //this.id=this.activatedRoute.snapshot.params['id'];
   // this.portFolioService.obtenerById(this.id,this.path).subscribe(data =>{
      
      //this.user=data.persona.email; });

      this.editar.controls['establecimiento'].setValue(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="establecimiento")].value);
      this.editar.controls['titulo'].setValue(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="titulo")].value);
      this.editar.controls['inicio'].setValue(this.portFolioService.obtenerFecha(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="inicio")].value));
      this.editar.controls['fin'].setValue(this.portFolioService.obtenerFecha(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="fin")].value));
      this.editar.controls['carrera'].setValue(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="carrera")].value); 
      this.editar.controls['puntaje'].setValue(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="puntaje")].value);  
      this.fechaInicio= this.portFolioService.obtenerFecha(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="inicio")].value);
      this.fechaFin=this.portFolioService.obtenerFecha(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="fin")].value);
     
     
   


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
    
    
     
    
  // this.portFolioService.actualizar(this.id,formData,this.path).subscribe();
   this.portFolioService.actualizar(this.educaciones[this.educaciones.findIndex(element=>element['tag']=="id")].value,formData,this.path).subscribe(data=>{
    this.event.emit({ id:data.id, establecimiento:data.establecimiento,titulo:data.titulo,
      carrera:data.carrera,puntaje:data.puntaje, inicio:data.inicio,fin:data.fin,logo:data.logo}); 
   

   });
   this.bsModalRef.hide();  
     
   
   //this.ruta.navigate(['/portfolio']);
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
