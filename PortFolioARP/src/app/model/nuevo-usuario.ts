export class NuevoUsuario {
      nombre: string;  
      nombreUsuario:string;  
      apellido:string;
      fecha_nacimiento:string;
      nacionalidad:string;
      direccion:string;
      numero:string;
      password:string;
      authorities:string[] 
     
      constructor(nombre: string,nombreUsuario:string, apellido:string, fecha_nacimiento:string, nacionalidad:string,  direccion:string,   numero:string,  password:string,
        authorities:string[]){
            this.nombre=nombre;
            this.nombreUsuario=nombreUsuario;
            this.apellido=apellido;
            this.fecha_nacimiento=fecha_nacimiento;
            this.nacionalidad=nacionalidad;
            this.direccion=direccion;
            this.numero=numero;
            this.password=password;
            this.authorities=authorities;
            
    }
    
}