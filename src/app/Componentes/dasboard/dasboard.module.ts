import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DasboardRoutingModule } from './dasboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DasboardComponent } from './dasboard.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ListarComponent } from './listar/listar.component';
import { RegsitroComponent } from './regsitro/regsitro.component';
import { EditarComponent } from './editar/editar.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { HistorialComponent } from './historial/historial.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { EditarusuarioComponent } from './editarusuario/editarusuario.component';
import { CrarusuarioComponent } from './crarusuario/crarusuario.component';
import { ArticulosasignadosComponent } from './articulosasignados/articulosasignados.component';


@NgModule({
  declarations: [
    DasboardComponent,
    NavbarComponent,
    ListarComponent,
    RegsitroComponent,
    EditarComponent,
    AsignacionComponent,
    HistorialComponent,
    UsuarioComponent,
    EditarusuarioComponent,
    CrarusuarioComponent,
    ArticulosasignadosComponent
  ],
  imports: [
    CommonModule,
    DasboardRoutingModule,
    SharedModule
  ]
})
export class DasboardModule { }
