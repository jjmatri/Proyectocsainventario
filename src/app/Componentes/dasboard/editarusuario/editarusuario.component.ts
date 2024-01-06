import { Component, OnInit, Inject } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulos } from 'src/app/Model/Articulos';
//import { art } from 'src/app/interfaces/art';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Usuario } from 'src/app/Model/Usuario';

@Component({
  selector: 'app-editarusuario',
  templateUrl: './editarusuario.component.html',
  styleUrls: ['./editarusuario.component.css']
})
export class EditarusuarioComponent implements OnInit {

  cedula: any;	
  nombre: any;
  correo: any;	
  direccion: any;
  fecha_asignacion: any;	
  login_registro: any;
  estado: any;	
  perfil:any;
  contrasena:any;
  fechasys: any;

  respuesta: any = [];
  respuesta2: any = [];
  firstFormGroup!: FormGroup;
  CurrentDate = new Date();

  constructor(public dialogRef: MatDialogRef<EditarusuarioComponent>, private rutass: MenuService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.firstFormGroup = this._formBuilder.group({
    cedula: ['', Validators.required],	
    nombre: ['', Validators.required],
    correo: ['', Validators.required],	
    direccion:  ['', Validators.required],
    fecha_asignacion:  ['', Validators.required],	
    login_registro:  ['', Validators.required],
    estado:  ['', Validators.required],	
    perfil: ['', Validators.required],
    contrasena: ['', Validators.required],
  });

  this.getFecha();

  this.rutass.getusuarioid(this.data.asignId).subscribe(r => {
    this.respuesta2 = r;
    
      this.cedula=''+this.respuesta2[0].cedula; 
  
  })

  this.rutass.getusuarioid(this.data.asignId).subscribe(r => {
    this.respuesta = r;
    this.firstFormGroup.patchValue({

      
      nombre: this.respuesta[0].nombre,
      correo: this.respuesta[0].correo,
      direccion: this.respuesta[0].direccion,
      fecha_asignacion: moment(this.fecha_asignacion).format('MM/DD/YYYY'),
      //this.CurrentDate.getDate();
      //this.fecha_asignacion= moment(this.CurrentDate).format('DD/MM/YYYY');


      login_registro: this.respuesta[0].login_registro,
      estado: this.respuesta[0].estado,

      perfil: this.respuesta[0].perfil,
      contrasena: this.respuesta[0].contrasena,

      

      /* this.fecha = ''+this.respuesta[0].fecha;
      this.fecha = moment(this.fecha).format('DD/MM/YYYY');
      this.zona = ''+this.respuesta[0].zona;*/

    })

  })

  
}

getFecha() {
  let date = new Date();
  console.log(date);

  this.fechasys = moment(date).format('yyyy-MM-DD');
  let hora = moment(date).format('HH:mm');

  this.fechasys = this.fechasys + ' ' + hora;

  console.log(this.fechasys);


}
onSubmit() {

  //const formModel = this.firstFormGroup.value;
  var tipo_solicitud = 0;

  let usuario = new Usuario();

  //articulo.id_articulo=this.respuesta[0].id_articulo;   
  usuario.cedula = this.respuesta[0]. cedula;
  usuario.nombre = this.firstFormGroup.value.nombre;
  usuario.correo = this.firstFormGroup.value.correo;
  usuario.direccion = this.firstFormGroup.value.direccion;
      
  this.fecha_asignacion = this.firstFormGroup.value.fecha_asignacion;

  let date = new Date();
  console.log(date);

  this.fecha_asignacion = moment(this.fecha_asignacion).format('yyyy-MM-DD');
  let hora = moment(date).format('HH:mm');

  this.fecha_asignacion = this.fecha_asignacion + ' ' + hora;

  console.log(this.fecha_asignacion);

  usuario.fecha_asignacion = this.fecha_asignacion;

   
  usuario.login_registro = this.firstFormGroup.value.login_registro;

  usuario.estado = this.firstFormGroup.value.estado;
  usuario.perfil = this.firstFormGroup.value.perfil;
  usuario.direccion = this.firstFormGroup.value.direccion;
  usuario.contrasena = this.firstFormGroup.value.contrasena
  

  /*this.fecha_creacion=formModel.fecha_creacion;
  this.fecha_creacion=moment(this.fecha_creacion).format('DD/MM/YYYY');
  */

  



  

  /*this.rutass.actualizararticulo(this.activofijo,this.marca,this.modelo,this.imei,this.serialsimcard,this.numerocel,this.contrasena_sim,this.ip,this.cod_operador,this.puerto,this.estado,this.fecha_asignacion,this.login_registro,this.cod_tipoarticulo,this.descripcion,this.codzona,this.codpunto,this.nombre,this.id).subscribe (r =>{
  this.respuesta = r;
  
  console.log('hola'+this.respuesta)
  
  });*/
  //creararticulo   actualizararticulo

  this.rutass.crearusuario(usuario).subscribe(r => {


    console.log(this.respuesta)

  });

  this.confirmacion();

}
cerra() {
  this.dialogRef.close();


}
confirmacion() {

  //this.loading=true
  //setTimeout(() => {
  this._snackBar.open('Informacion Editada...', '', {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',

  })
  this.limpia()
  //}, 2000);

}
limpia() {

  this.firstFormGroup.reset();
}

}
