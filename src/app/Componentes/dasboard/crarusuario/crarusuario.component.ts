import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuService } from 'src/app/services/menu.service';
import { Usuario } from 'src/app/Model/Usuario';
import * as moment from 'moment';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crarusuario',
  templateUrl: './crarusuario.component.html',
  styleUrls: ['./crarusuario.component.css']
})
export class CrarusuarioComponent implements OnInit {
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

  firstFormGroup!: FormGroup;
  CurrentDate = new Date();

  constructor( public dialogRef: MatDialogRef<CrarusuarioComponent>,private _formBuilder: FormBuilder,private rutass: MenuService,private _snackBar: MatSnackBar) { }

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
  }

  onSubmit() {

    //const formModel = this.firstFormGroup.value;
    var tipo_solicitud = 0;
  
    let usuario = new Usuario();
  
    //articulo.id_articulo=this.respuesta[0].id_articulo;   
    usuario.cedula = this.firstFormGroup.value.cedula;
    usuario.nombre = this.firstFormGroup.value.nombre;
    usuario.correo = this.firstFormGroup.value.correo;
    usuario.direccion = this.firstFormGroup.value.direccion;
    
    
    //this.fecha_asignacion = this.firstFormGroup.value.fecha_asignacion;
  
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
  
  
      
  
    });
  
    this.confirmacion();
  
  }
  cerra() {
    this.dialogRef.close();
  
  
  }
  confirmacion() {
  
    //this.loading=true
    //setTimeout(() => {
    this._snackBar.open('Usuario creado...', '', {
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
