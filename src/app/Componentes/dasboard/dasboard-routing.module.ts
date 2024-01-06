import { ListKeyManager } from '@angular/cdk/a11y';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticulosasignadosComponent } from './articulosasignados/articulosasignados.component';
import { DasboardComponent } from './dasboard.component';
import { HistorialComponent } from './historial/historial.component';
import { ListarComponent } from './listar/listar.component';
import { RegsitroComponent } from './regsitro/regsitro.component';
import { UsuarioComponent } from './usuario/usuario.component';

const routes: Routes = [
  {path:'',component:DasboardComponent,children:[
    {path:'listar',component:ListarComponent},
    {path:'regsitro',component:RegsitroComponent},
    {path:'historial',component:HistorialComponent},
    {path:'usuario',component:UsuarioComponent},
    {path:'articulosasignados',component:ArticulosasignadosComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DasboardRoutingModule { }
