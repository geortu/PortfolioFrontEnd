export class PersonaDto {
    foto_portada:File;
    foto_perfil:File;
    sobre_mi:string;
    ocupacion:string;
    direccion:string ;
    numero:string;   
    provincia:string;
    nombre:string;
    apellido:string;
    nacionalidad:string;
    fecha_nacimiento:string;

      
   
    
    
    
    constructor(  foto_portada:File,   foto_perfil:File,     sobre_mi:string,    ocupacion:string, direccion:string,numero:string,
        provincia:string,nombre:string,
        apellido:string,
        nacionalidad:string,
        fechaNacimiento:string,){
            
            this.foto_portada=foto_portada;
            this.foto_perfil=foto_perfil;
            this.sobre_mi=sobre_mi;
            this.ocupacion=ocupacion;
            this.direccion=direccion;
            this.numero=numero;
           
            this.provincia=provincia;
            this.nombre=nombre;
            this.apellido=apellido;
            this.fecha_nacimiento=fechaNacimiento;
            this.nacionalidad=nacionalidad;
    

    }
}
