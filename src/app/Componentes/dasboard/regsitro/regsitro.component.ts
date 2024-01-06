import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulos } from 'src/app/Model/Articulos';
import { MenuService } from 'src/app/services/menu.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import* as moment from 'moment';

@Component({
  selector: 'app-regsitro',
  templateUrl: './regsitro.component.html',
  styleUrls: ['./regsitro.component.css']
})
export class RegsitroComponent implements OnInit {

  id:any;
  activofijo:any;
  marca:any;
  modelo:any;
  imei:any;
  serialsimcard:any;
  numerocel:any;
  contrasena_sim:any;
  ip:any;
  cod_operador:any;
  puerto:any;
  estado:any;
  fecha:any;
  fecha_creacion:any;
  login_registro:any;
  cod_tipoarticulo:any;    
  descripcion:any;
  codzona:any;
  codpunto:any;
  nombre:any;
  fechasys:any;

  CurrentDate = new Date();

  respuesta : any = [];
  dispositivos : any = []
  operadores: any = [];
  

  firstFormGroup!: FormGroup;
  constructor(private _formBuilder : FormBuilder,private  rutass: MenuService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {


    this.firstFormGroup = this._formBuilder.group({

      activofijo:['',Validators.required],
      marca:['', Validators.required],
      modelo:['', Validators.required],
      imei:['',Validators.required] ,
      serialsimcard:[''] ,
      numerocel: [''] ,
      contrasena_sim: [''] ,
      ip:[''],
      cod_operador:['',Validators.required],
      puerto:[''],
      estado:['',Validators.required],
      fecha_creacion:['',Validators.required],
      login_registro:['',Validators.required],
      cod_tipoarticulo:['',Validators.required],
      descripcion:['',Validators.required],
      codzona:['',[Validators.required,Validators.minLength(4)]],
      codpunto:['',[Validators.required,Validators.minLength(4)]],
      nombre:['',Validators.required],
      
    
    });

    /*this.CurrentDate.getDate();
    this.fecha_creacion= moment(this.CurrentDate).format('DD/MM/YYYY');
 */
//traemos los opreradores    
this.rutass.listaroperadores().subscribe(r => {
  this.operadores = r;

  console.log(this.operadores);

});
    this.rutass.listardispositivos().subscribe (r=>{
      this.dispositivos = r;
      
      console.log(this.dispositivos);
      
      });
this.getFecha();

  }

  getFecha() {
    let date = new Date();
    console.log(date);

    this.fecha = moment(date).format('yyyy-MM-DD');
    let hora = moment(date).format('HH:mm');
  
    this.fechasys = this.fecha +' '+hora;

    console.log(this.fechasys);


  }
  onSubmit(){
  if ( this.firstFormGroup.value.activofijo !="" && this.firstFormGroup.value.marca != "" && this.firstFormGroup.value.modelo != "" && this.firstFormGroup.value.imei != "" &&
   this.firstFormGroup.value.estado !=""&& this.firstFormGroup.value.fecha_creacion !=""&& this.firstFormGroup.value.cod_operador !=""&&
   this.firstFormGroup.value.cod_tipoarticulo !="" && this.firstFormGroup.value.descripcion!="" ) {    
 console.log('entro')
    
  const formModel = this.firstFormGroup.value;
  var tipo_solicitud = 0;

    let articulo = new Articulos();
     
     articulo.id_articulo=null;   
     articulo.activofijo = formModel.activofijo ; 
     articulo.marca = formModel.marca; 
     articulo.modelo= formModel.modelo;
     articulo.imei= formModel.imei;
     articulo.serialsimcar =formModel.serialsimcard;
     articulo.numerocel = formModel.numerocel;
     
     articulo.contrasena_sim= formModel.contrasena_sim ; 
     articulo.ip = formModel.ip; 
     articulo.cod_operador= formModel.cod_operador;
     
     articulo.puerto = formModel.puerto;
     
     articulo.estado = formModel.estado;
     
     this.fecha_creacion = formModel.fecha_creacion; 
   
   let date = new Date();
   console.log(date);
 
   this.fecha_creacion = moment(this.fecha_creacion).format('yyyy-MM-DD');
   let hora = moment(date).format('HH:mm');
 
   this.fecha_creacion= this.fecha_creacion +' '+hora;
 
   console.log(this.fecha_creacion);
 
   articulo.fecha_asignacion = this.fecha_creacion; 



     articulo.login_registro = 'CPkely';
       
     articulo.cod_tipoarticulo= formModel.cod_tipoarticulo;
     articulo.descripcion = formModel.descripcion;
     
     /*articulo.codzona = formModel.codzona;
     articulo.codpunto=formModel.codpunto;
     articulo.nombre = formModel.nombre;*/
     articulo.fechasys = this.fechasys;
     
                   

//this.rutass.actualizararticulo(this.activofijo,this.marca,this.modelo,this.imei,this.serialsimcard,this.numerocel,this.contrasena_sim,this.ip,this.cod_operador,this.puerto,this.estado,this.fecha_asignacion,this.login_registro,this.cod_tipoarticulo,this.descripcion,this.codzona,this.codpunto,this.nombre,this.id).subscribe (r =>{
//this.respuesta = r;

this.rutass.creararticulo(articulo).subscribe (r =>{


console.log(this.respuesta)

});

this.limpiar();
  }else{

    this._snackBar.open('A DEJADO UN CAMPO VACIO','',{
      duration: 3000,
      horizontalPosition:'center',
      verticalPosition:'bottom',

    })
    
  }

  }

  limpiar(){

    this.firstFormGroup.reset();
  }
}
