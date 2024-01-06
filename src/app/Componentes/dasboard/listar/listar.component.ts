
import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService} from 'src/app/services/menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
/*import{ MostrarComponent } from  '../mostrar/mostrar.component';*/
import { EditarComponent } from '../editar/editar.component';
import { AsignacionComponent } from '../asignacion/asignacion.component';
import* as moment from 'moment';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  /*columnas: string[] = ['id_articulo','activofijo','imei','serialsimcard','numerocel','cod_operador',
  'fecha_asignacion','login_registro','codzona','codpunto','nombre','nombre_zona','nombre_cda','editar','asignar'];*/
  
  columnas: string[] = ['id_articulo','imei','operadores','serial','estado','cod_tipoarticulo','fecha_asignacion','editar','asignar'];
  respuesta : any = [];
  respuesta2 : any = [];
  
  dispositivos : any = []
  operadores : any = []
  sacar:any;

  moment: any = moment;  
  dataSource:any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor(private router: Router, private  rutass: MenuService,private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.rutass.getArticulo().subscribe (r =>{
      this.respuesta = r;
  
     this.dataSource = new MatTableDataSource<any>(this.respuesta);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
  
            console.log(this.respuesta);
    });
 
   /* this.rutass.getArticulo().subscribe (r =>{
      this.respuesta = r;
      this.sacar= this.respuesta[0].cod_tipoarticulo;
                console.log(this.respuesta);
    });
 
    this.rutass.getobtenerdis(this.sacar).subscribe (r =>{
      this.respuesta2 = r;
      this.sacar= this.respuesta2[0].descripcion;
                console.log("resultado"+this.sacar);
    });
    */
     //traemmos dispositivos
    this.rutass.listardispositivos().subscribe (r=>{
      this.dispositivos = r;
      
      console.log(this.dispositivos);
      
      });
      //traemmos operadores
      this.rutass.listaroperadores().subscribe(r => {
        this.operadores = r;
      
        console.log(this.operadores);
      
      });
    
  } 

    filtrar(event: Event) {
      const filtro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filtro.trim().toLowerCase();
    }
  
    /*mostrar(id:any){

      const modalRef = this.dialogService.open(MostrarComponent, {
        width: '700px',
        height: '500px',
       data: { asignId: id }
      });
     
      this.rutass.getArticulopunto(id).subscribe (r=> {
        //this.rutass.getArticuloid(id).subscribe (r=> {
      this.respuesta = r;
    console.log(this.respuesta);
      });
    
  
      }*/


    editar(id:any){
     
      const modalRef = this.dialogService.open(EditarComponent, {
        width: '900px',
        height: '600px',
       data: { asignId: id }
      });
     
      this.rutass.getArticuloid(id).subscribe (r=> {
      this.respuesta = r;
    console.log(this.respuesta);
      });
    
    
    }
    asignar(id:any){
    
      const modalRef = this.dialogService.open(AsignacionComponent, {
        width: '700px',
        height: '600px',
       data: { asignId: id }
    
      });
      
    /*this.rutass.getArticuloid(id).subscribe (r=> {
      this.respuesta = r;
    console.log(this.respuesta);
      });*/
    
    
    }
    
    
  

}
