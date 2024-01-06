import { Component, OnInit, Inject } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulos } from 'src/app/Model/Articulos';
//import { art } from 'src/app/interfaces/art';
import { MatSnackBar } from '@angular/material/snack-bar';

import * as moment from 'moment';


@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {
  loading = false
  id: any;
  activofijo: any;
  marca: any;
  modelo: any;
  imei: any;
  serialsimcard: any;
  numerocel: any;
  contrasena_sim: any;
  ip: any;
  cod_operador: any;
  puerto: any;
  estado: any;
  fechasys: any;
  fecha_asignacion: any;


  login_registro: any;
  cod_tipoarticulo: any;
  descripcion: any;
  codzona: any;
  codpunto: any;
  nombre: any;
  //const formato='DD/MM/YYYY'; 

  respuesta: any = [];
  operadores: any = [];
  dispositivos: any = []
  disabled=false;
  persona=false;

  firstFormGroup!: FormGroup;
  CurrentDate = new Date();


  constructor(public dialogRef: MatDialogRef<EditarComponent>, private rutass: MenuService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar) {

  }

  ngOnInit(): void {

    this.firstFormGroup = this._formBuilder.group({

      activofijo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      imei: ['', Validators.required],
      serialsimcard: ['', Validators.required],
      numerocel: [''],
      contrasena_sim: ['', Validators.required],
      ip: ['', Validators.required],
      cod_operador: ['', Validators.required],
      puerto: ['', Validators.required],
      estado: ['', Validators.required],
      fecha_asignacion: ['', Validators.required],
      login_registro: ['', Validators.required],
      cod_tipoarticulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      /*codzona:[,[Validators.required,Validators.minLength(4)]],
      codpunto:[,[Validators.required,Validators.minLength(4)]],
      nombre:['', Validators.required],*/
      codzona: [''],
      codpunto: [''],
      nombre: ['']


    });

    //traemos los opreradores    
    this.rutass.listaroperadores().subscribe(r => {
      this.operadores = r;

      console.log(this.operadores);

    });

    //traemos los dispositovos
    this.rutass.listardispositivos().subscribe(r => {
      this.dispositivos = r;

      console.log(this.dispositivos);

    });


    this.getFecha();

    /*this.CurrentDate.getDate();
    this.fecha_asignacion= moment(this.CurrentDate).format('DD/MM/YYYY');
    */



    this.rutass.getArticuloid(this.data.asignId).subscribe(r => {
      this.respuesta = r;
      this.firstFormGroup.patchValue({

        id: this.respuesta[0].id_articulo,
        activofijo: this.respuesta[0].activofijo,
        marca: this.respuesta[0].marca,
        modelo: this.respuesta[0].modelo,
        imei: this.respuesta[0].imei,
        serialsimcard: this.respuesta[0].serialsimcar,

        numerocel: this.respuesta[0].numerocel,
        contrasena_sim: this.respuesta[0].contrasena_sim,

        ip: this.respuesta[0].ip,
        cod_operador: this.respuesta[0].cod_operador,


        puerto: this.respuesta[0].puerto,
        estado: this.respuesta[0].estado,
        //fecha_asignacion :this.respuesta.fecha_asignacion,
        fecha_asignacion: moment(this.fecha_asignacion).format('MM/DD/YYYY'),
        //this.CurrentDate.getDate();
        //this.fecha_asignacion= moment(this.CurrentDate).format('DD/MM/YYYY');


        login_registro: this.respuesta[0].login_registro,
        cod_tipoarticulo: this.respuesta[0].cod_tipoarticulo,

        descripcion: this.respuesta[0].descripcion,
        //codzona: this.respuesta[0].codzona,

        //codpunto: this.respuesta[0].codpunto,
        nombre: this.respuesta[0].nombre


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

    let articulo = new Articulos();

    articulo.id_articulo=this.respuesta[0].id_articulo;   
    //articulo.id_articulo = null;
    articulo.activofijo = this.firstFormGroup.value.activofijo;
    articulo.marca = this.firstFormGroup.value.marca;
    articulo.modelo = this.firstFormGroup.value.modelo;
    articulo.imei = this.firstFormGroup.value.imei;
    articulo.serialsimcar = this.firstFormGroup.value.serialsimcard;
    articulo.numerocel = this.firstFormGroup.value.numerocel;

   // articulo.contrasena_sim = this.firstFormGroup.value.contrasena_sim;
    //articulo.ip = this.firstFormGroup.value.ip;
    articulo.cod_operador = this.firstFormGroup.value.cod_operador;

    //articulo.puerto = this.firstFormGroup.value.puerto;

    articulo.estado = this.firstFormGroup.value.estado;
    /*this.fecha_creacion=formModel.fecha_creacion;
    this.fecha_creacion=moment(this.fecha_creacion).format('DD/MM/YYYY');
    */

    this.fecha_asignacion = this.firstFormGroup.value.fecha_asignacion;

    let date = new Date();
    console.log(date);

    this.fecha_asignacion = moment(this.fecha_asignacion).format('yyyy-MM-DD');
    let hora = moment(date).format('HH:mm');

    this.fecha_asignacion = this.fecha_asignacion + ' ' + hora;

    console.log(this.fecha_asignacion);

    articulo.fecha_asignacion = this.fecha_asignacion;




    articulo.login_registro = 'CPkely';

    articulo.cod_tipoarticulo = this.firstFormGroup.value.cod_tipoarticulo;
    articulo.descripcion = this.firstFormGroup.value.descripcion;

    //articulo.codzona = this.firstFormGroup.value.codzona;
    //articulo.codpunto = this.firstFormGroup.value.codpunto;
    articulo.nombre = this.firstFormGroup.value.nombre;
    articulo.fechasys = this.fechasys;


    console.log(this.fecha_asignacion)


    /*this.rutass.actualizararticulo(this.activofijo,this.marca,this.modelo,this.imei,this.serialsimcard,this.numerocel,this.contrasena_sim,this.ip,this.cod_operador,this.puerto,this.estado,this.fecha_asignacion,this.login_registro,this.cod_tipoarticulo,this.descripcion,this.codzona,this.codpunto,this.nombre,this.id).subscribe (r =>{
    this.respuesta = r;
    
    console.log('hola'+this.respuesta)
    
    });*/
    //creararticulo   actualizararticulo
    this.rutass.actualizararticulo(articulo).subscribe(r => {

    //this.rutass.creararticulo(articulo).subscribe(r => {


      console.log(this.respuesta)

    });
    this.confirmacion();


  }
  confirmacion() {

    //this.loading=true
    //setTimeout(() => {
    this._snackBar.open('Informacion Editada...', '', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',

    })
    this.dialogRef.close();
    this.limpia()
    //}, 2000);

  }

  cerra() {
    this.dialogRef.close();


  }
  limpia() {

    this.firstFormGroup.reset();
    
  }


  operar(){

    if(this.disabled==false){
      this.disabled=true;
      this.firstFormGroup.controls['descripcion'].disable();
      
    }else{
      this.disabled=false;
      this.firstFormGroup.controls['descripcion'].enable();
      
      
    }
  }
  
  op(){

    if(this.disabled==false){
      this.disabled=true;
      this.firstFormGroup.controls['nombre'].disable();
      
    }else{
      this.disabled=false;
      this.firstFormGroup.controls['nombre'].enable();
      
      
    }
  }
}