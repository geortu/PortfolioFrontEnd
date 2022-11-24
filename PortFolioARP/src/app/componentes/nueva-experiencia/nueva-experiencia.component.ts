import { Component, EventEmitter, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PortfolioService } from 'src/app/servicio/portfolio.service';
import { TokenService } from 'src/app/servicio/token.service';
import { AbstractControl, FormBuilder,FormGroup,ValidationErrors,ValidatorFn,Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Validaciones } from 'src/app/utils/validaciones';
import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-nueva-experiencia',
  templateUrl: './nueva-experiencia.component.html',
  styleUrls: ['./nueva-experiencia.component.css']
})
export class NuevaExperienciaComponent implements OnInit {
  editar:FormGroup;
 // id:any;
  selectedFotologo!:File ;  
  user:string="";
  fecha:any;
  isFechaInicio:boolean=false;
  fechaInicio:string="";
  fechaFin:string="";
  path="experiencia";
  id: any[] = []; 
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
        
    
        
        

      }
      )
   }

  ngOnInit(): void {
    //this.id=this.activatedRoute.snapshot.params['id'];
    //this.user=this.tokenService.getUserName();   
    if (new Date(this.FechaInicio?.value).toString()=="Invalid Date"){
      this.editar.controls['fecha_fin'].disable();
    }

  }

  get Empresa(){
    return this.editar.get('nombre_empresa');
    
  }
  get Puesto(){
    return this.editar.get('puesto');
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
    formData.append('logo',this.selectedFotologo != undefined? this.selectedFotologo: this.editar.get('logo')?.value);
    formData.append('descripcion',this.editar.get('descripcion')?.value);
    formData.append('id_persona',this.id[0].value);
    
     
    
   this.portFolioService.crear(formData,this.path).subscribe(data=>{
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
      this.editar.controls['fecha_fin'].enable();
    }
   

   
   
   
   
   }
   onChangeValueFechaFin(){   
    
    
      this.fechaFin=this.FechaFin?.value;
    
    
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
   
  







