import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService} from 'src/app/services/menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';

import* as moment from 'moment';
import { EditarusuarioComponent } from '../editarusuario/editarusuario.component';
import { CrarusuarioComponent } from '../crarusuario/crarusuario.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  columnas: string[] = ['cedula','nombre','correo','direccion','fecha_asignacion','login_registro','estado','perfil','contrasena','editar','crear'];
  respuesta : any = [];
  moment: any = moment;  
  dataSource:any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  

  constructor(private router: Router, private  rutass: MenuService,private dialogService: MatDialog) { }

  ngOnInit(): void {
    this.rutass.getUsuario().subscribe (r =>{
      this.respuesta = r;
  
     this.dataSource = new MatTableDataSource<any>(this.respuesta);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
  
            console.log(this.respuesta);
    });
  }

  filtrar(event: Event) {
    const filtro = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  editar(id:any){
     
    const modalRef = this.dialogService.open(EditarusuarioComponent, {
      width: '900px',
      height: '400px',
     data: { asignId: id }
    });
   
    this.rutass.getusuarioid(id).subscribe (r=> {
    this.respuesta = r;
  console.log(this.respuesta);
    });
  
  
  }

  crear(){
     
    const modalRef = this.dialogService.open(CrarusuarioComponent,{
      width: '900px',
      height: '400px',
     data: {  }
    });
   
      
  }
}
