import { Component, OnInit,ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MenuService} from 'src/app/services/menu.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import {MatDialogModule} from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-articulosasignados',
  templateUrl: './articulosasignados.component.html',
  styleUrls: ['./articulosasignados.component.css']
})
export class ArticulosasignadosComponent implements OnInit {

  columnas: string[] = ['id_articulo','documento_a_quien_asignado','fecha_asignacion','imei','activo_fijo','serial','estado','codpunto','descripcion','nombre_cda','nombre_punto','nombre_asignado'
];
  respuesta : any = [];
  dataSource:any;


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  
  constructor(private  rutass: MenuService) { }

  ngOnInit(): void {
    this.rutass.getArticulosAsignados().subscribe (r =>{
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
