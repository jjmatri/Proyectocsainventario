import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


//angular material

//import { RegistroComponent } from './componentes/registro/registro.component';


//import {ServicioService} from 'src/app/service/servicio.service';
import{HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './Componentes/login/login.component';
import { SharedModule } from './Componentes/shared/shared.module';
import { EditarComponent } from './Componentes/dasboard/editar/editar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    SharedModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
