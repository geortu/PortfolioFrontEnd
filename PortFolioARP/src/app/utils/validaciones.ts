import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class Validaciones {

     static validarFecha(): any {
        return (editar: FormGroup): ValidationErrors| null => {
    
            const fecha1 = new Date(editar.get("fecha_inicio")?.value);
    
            const fecha2= new Date( editar.get("fecha_fin")?.value);
    
            if (fecha1 && fecha1) {
                const isRangeValid = (fecha1 <= fecha2 );
    
                return isRangeValid ? null : {validarFecha:true};
            }
    
            return null;
        }
    }












   
}
           
            
        

