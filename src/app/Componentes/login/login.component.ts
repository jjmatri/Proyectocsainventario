import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form:FormGroup;
  loading=false;
  respuesta : any= [];
  u?:string;
  p?:string;  

  constructor(private fb:FormBuilder,private _snackBar: MatSnackBar ,private router:Router,private  rutass: MenuService) { 

    this.form = this.fb.group({
   
      usuario : ['', Validators.required ],
      password:   ['', Validators.required ] 
  
    })
  
  }

  ngOnInit(): void {
  }

  ingresar(){

this.u="";
this.p="";
    console.log("funciona");
  
    const usuario=this.form.value.usuario;
    const password=this.form.value.password;
    console.log(usuario);
    console.log(password);
   

 this.rutass.getbuscarusuario(usuario,password).subscribe (r=> {
      this.respuesta = r;
    /*console.log("jaja"+this.respuesta);
      
      this.u=''+this.respuesta[0].login_registro;
      this.p=''+this.respuesta[0].contrasena;
      console.log("Usuario"+this.u);
      console.log("pas"+this.p);
      console.log("entreo a error"+this.respuesta.login_registro);
     */
      if(this.respuesta != ''){
      if (this.respuesta[0].login_registro == usuario && this.respuesta[0].contrasena == password ) {
      //if (usuario=='jaime'&& password=='12345') {

      this.fakeLoading();
    } else  {
      console.log("entre aa error"+this.respuesta.login_registro);
      this.error();
      this.form.reset();
    }
  }else{
    this.error();
  }
  });
}
  
  error(){

    this._snackBar.open('Usuario o Contraseña Invalido','',{
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition:'bottom',

    })
    this.form.reset();
  }
  
  fakeLoading(){
    this.loading=true
    setTimeout(()=>{
    this.router.navigate(['dasboard']);
    //this.loading=false;
    },1500);
   
  }


  
  }


