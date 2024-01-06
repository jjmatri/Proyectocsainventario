import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MenuService} from 'src/app/services/menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import { EditarComponent } from '../editar/editar.component';
import { AsignacionComponent } from '../asignacion/asignacion.component';
import* as moment from 'moment';


@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {

  columnas: string[] = ['id_historial','id_articulo','fecha_asignacion','cedula_responsable','imei','activo_fijo','serial','login_registro','estado','descripcion'];
  respuesta : any = [];
  dataSource:any;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  

  constructor(private router: Router, private  rutass: MenuService,private dialogService: MatDialog) { }

  ngOnInit(): void {

    this.rutass.getHistorial().subscribe (r =>{
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

}
