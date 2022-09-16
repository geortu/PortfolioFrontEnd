import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {
  form:FormGroup;
  constructor(private FormBuilder:FormBuilder) { 
    this.form=this.FormBuilder.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(8)]],
        diviceInfo:this.FormBuilder.group({
          diviceId:[""],
          diviceType:[""],
          notificationToken:[""]

        })

      })
  }

  ngOnInit(): void {

  }
    get Email(){
      return this.form.get('email');
    }
    get Password(){
      return this.form.get('password');
    }
  

}
 