import { Component, OnInit,Inject } from '@angular/core';
import* as moment from 'moment';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Articulos } from 'src/app/Model/Articulos';
import { Articulosasignados } from 'src/app/Model/Articulosasignados';
import { Territorio } from 'src/app/Model/Territorio';

import { MatSnackBar } from '@angular/material/snack-bar';
import { CDK_CONNECTED_OVERLAY_SCROLL_STRATEGY_PROVIDER_FACTORY } from '@angular/cdk/overlay/overlay-directives';
import { CompileShallowModuleMetadata } from '@angular/compiler';
import { typeWithParameters } from '@angular/compiler/src/render3/util';



@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrls: ['./asignacion.component.css']
  
})
export class AsignacionComponent implements OnInit {

  //value : any;
  texto: string="";
  texto2: string="";
  
 //onEnter(value: string) { this.value = value; }

 buttonDisabled:boolean | undefined;
  id_activo:any;
  activofijo:any;
  asignado:any;
  nombre:any;
  imei:any;
  serialsimcard:any;
  estado:any;
  fecha:any;
  fecha2:any;
  fechasys2:any;
  fechasys:any;
  fecha_asignacion:any;
  descripcion:any;
  elemento:any;
  nombrecda:any
  nombrepunto:any;
  buscarpu:any;
  firstFormGroup!: FormGroup;
  respuesta : any = [];
  respuestate : any = [];
  respuestausua : any = [];
   cedula?:string=""; 
   
  
  loading=false;
  

  constructor( public dialogRef: MatDialogRef<AsignacionComponent>,private  rutass: MenuService, @Inject(MAT_DIALOG_DATA) public data: any,private router: Router, private _formBuilder : FormBuilder,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.buttonDisabled = true;

    this.firstFormGroup = this._formBuilder.group({

      id_activo:[,Validators.required],
     // activofijo:[,Validators.required],
      imei:[,Validators.required] ,
      serialsimcard:[,Validators.required] ,
      //numerocel: [,Validators.required] ,
      estado:[,Validators.required],
      fecha_asignacion:[,Validators.required],
      asignado:['',Validators.required],
      nombre:['',Validators.required],
      
      //codzona:['',Validators],
    codpunto:['',Validators.required],
    nombrecda:[''],
    nombrepunto:[''],
      
      descripcion:['']
      //cod_tipoarticulo:[,Validators.required],
      //descripcion:[,Validators.required],
      //nombre:[,Validators.required],
      
    
    });
    this.getFecha();
    this.cargar();
    
  }
  cargar(){

    this.rutass.getArticuloid(this.data.asignId).subscribe (r =>{
      this.respuesta = r;
      
      this.id_activo=''+this.respuesta[0].id_articulo;
      this.activofijo=''+this.respuesta[0].activofijo;
      this.imei =''+this.respuesta[0].imei;
      this.serialsimcard= ''+this.respuesta[0].serialsimcar;
      
      this.estado = ''+this.respuesta[0].estado;
      this.fecha_asignacion = ''+this.respuesta[0].fecha_asignacion;
      this.fecha_asignacion = moment(this.fecha_asignacion).format('MM/DD/YYYY');
      //this.CurrentDate.getDate();
     //this.fecha_asignacion= moment(this.CurrentDate).format('DD/MM/YYYY');
      
     
      /* this.fecha = ''+this.respuesta[0].fecha;
      this.fecha = moment(this.fecha).format('DD/MM/YYYY');
      this.zona = ''+this.respuesta[0].zona;*/
      console.log("respuestas"+this.respuesta);

  })


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

    const formModel = this.firstFormGroup.value;
    var tipo_solicitud = 0;
  
      let articuloas = new Articulosasignados();
       
       //articuloas.id_asignacion=null;   
       articuloas.id_articulo=this.id_activo;   
       if ( this.firstFormGroup.value.asignado !=""){
       articuloas.documento_a_quien_asignado =formModel.asignado; 
      
       }else{       
       articuloas.documento_a_quien_asignado =formModel.codpunto; 
       //articuloas.codzona =formModel.codzona; 
      }
       
       
       this.fecha_asignacion = this.fecha_asignacion; 
       
       let date = new Date();
       console.log(date);
     
       this.fecha_asignacion = moment(this.fecha_asignacion).format('yyyy-MM-DD');
       let hora = moment(date).format('HH:mm');
     
       this.fecha_asignacion= this.fecha_asignacion +' '+hora;
     
       console.log(this.fecha_asignacion);
     
       articuloas.fecha_asignacion = this.fecha_asignacion; 
       
       
       articuloas.login_registro = 'CPkely';
       articuloas.imei= this.imei;
       articuloas.activo_fijo =this.activofijo;
       articuloas.serial = this.serialsimcard;
       articuloas.estado = this.estado;
       /*this.fecha_creacion=formModel.fecha_creacion;
       this.fecha_creacion=moment(this.fecha_creacion).format('DD/MM/YYYY');
       */
       /*articuloas.id_asignacion=null;   
       articuloas.id_articulo=this.idactivo;   
       articuloas.documento_a_asignado = formModel.documento_a_asignado; 
       articuloas.fecha_asignacion =this.fecha_asignacion; 
       articuloas.login_registro = 'CPkevin';
       articuloas.imei=this.imei;
       articuloas.activo_fijo =this.activofijo;
       articuloas.serial =this.serialsimcard;
       articuloas.estado =this.estado;*/
       articuloas.fechasys =this.fechasys;
       articuloas.codpunto=formModel.codpunto;
       articuloas.descripcion = formModel.descripcion;
       articuloas.nombre_cda=this.nombrecda;
       articuloas.nombre_punto=this.nombrepunto; 
       articuloas.nombre_asignado=this.nombre; 
  
       
       console.log('nsd'+this.fecha_asignacion)
       console.log('ajaaj'+this.fechasys)
                     
  
  /*this.rutass.actualizararticulo(this.activofijo,this.marca,this.modelo,this.imei,this.serialsimcard,this.numerocel,this.contrasena_sim,this.ip,this.cod_operador,this.puerto,this.estado,this.fecha_asignacion,this.login_registro,this.cod_tipoarticulo,this.descripcion,this.codzona,this.codpunto,this.nombre,this.id).subscribe (r =>{
  this.respuesta = r;
  
  console.log('hola'+this.respuesta)
  
  });*/
  //creararticulo   actualizararticulo
  
  this.rutass.creararticuloasignado(articuloas).subscribe (r =>{
  
  
  console.log(this.respuesta)
  
  });
  
  this.confirmacion();

  }


  confirmacion(){
    //this.loading=true;
     //setTimeout(() => {
      this._snackBar.open('Informacion Asignada...','',{
        duration: 3000,
        horizontalPosition:'center',
        verticalPosition:'bottom',
  
      })  
    // }, 2000);

    
  }

  cerra(){
    this.dialogRef.close();
  
  
  }

  operar(){
 
      return (this.elemento = true);
      
  }
  ocultar(){
    
    return (this.elemento = false);
    
  }
buscarpunto(){
  const formModel = this.firstFormGroup.value;
  
  console.log('jajaj'+this.texto) 
  
  console.log('entro') 
  console.log('entro hp'+this.texto) 
    
  let territorio = new Territorio();
     

     this.buscarpu =formModel.codpunto; 
     
     
      this.rutass.getterritoriopunto(this.texto).subscribe (r =>{
      this.respuestate = r;
      
      if(this.respuestate !=''){
       if(this.respuestate[0].codigo_punto == this.buscarpu){ 
      
        this.nombrecda=''+this.respuestate[0].nombre_cda;
        this.nombrepunto=''+this.respuestate[0].nombre_punto;
      
      this._snackBar.open('punto si contrada...','',{
        duration: 3000,
        horizontalPosition:'center',
        verticalPosition:'bottom',
  
      })
      this.buttonDisabled=false;

       }

      }else{
        this._snackBar.open('punto no encontrado','',{
          duration: 3000,
          horizontalPosition:'center',
          verticalPosition:'bottom',
    
        })

      }  
      console.log(this.respuestate)
      console.log(this.nombrecda)
      
      });     
    
      
}

buscar(){
  const formModel = this.firstFormGroup.value;
  
 this.cedula = formModel.asignado;
  
  console.log('jajaj'+this.texto2) 
  
  console.log('entro'+this.cedula) 
  console.log('entro a buscra'+this.texto2) 
    
 let territorio = new Territorio();
     
      
          
      this.rutass.getusuariocedula(this.texto2).subscribe (r =>{
      this.respuestausua = r;


       if(this.respuestausua != ''){
      if(this.respuestausua[0].cedula ==  this.cedula){

        this.nombre=this.respuestausua[0].nombre;
          
        this._snackBar.open('cedula si contrada...','',{
          duration: 3000,
          horizontalPosition:'center',
          verticalPosition:'bottom',
    
        })
        this.buttonDisabled=false;

      }
      
      
    }else{
      this._snackBar.open('cedula no en contrada','',{
        duration: 3000,
        horizontalPosition:'center',
        verticalPosition:'bottom',
  
      })


    }

    });
      

      
}


}
