import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Menu } from '../interfaces/menu';
import * as staticSettings from '../mdel/config';
import { catchError } from 'rxjs/operators';
import { Articulos } from '../Model/Articulos';
import { Articulosasignados } from '../Model/Articulosasignados';
import { Usuario } from '../Model/Usuario';


@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(private http:HttpClient) { }

 getMenu():Observable<Menu[]>{
return this.http.get<Menu[]>('./assets/data/menu.json');

 }

 getArticulo() : Observable<any[]>{
  
  //return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'todoarticulos')
  //return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'todos')
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'vistatodos')
  
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}
getUsuario() : Observable<any[]>{
  
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerusuario')
  //return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'todos')
  
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}
getHistorial() : Observable<any[]>{
  
  //return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'todoarticulos')
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerhistorial')
  
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}
getArticulosAsignados() : Observable<any[]>{
  
  //return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'todoarticulos')
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerartiasignados')
  
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}
getArticuloid(id: any) : Observable<any[]>{
  
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerarticulos/'+id)
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}
getobtenerdis(id: any) : Observable<any[]>{
  
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerdispositivo/'+id)
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}

getusuarioid(id: any) : Observable<any[]>{
  
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerusuariocedula/'+id)
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}

getterritoriopunto(id: any) : Observable<any[]>{
  
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerpuntoterritorio/'+id)
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}

getusuariocedula(id: any) : Observable<any[]>{
  
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerusuariocedula/'+id)
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}
getbuscarusuario(id: any,pass:any) : Observable<any[]>{
  
  return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtener/'+id+','+pass)
  .pipe(
    catchError(this.handleError('getRuta',[]))
  )
}
creararticulo( articulo : Articulos ){

  return this.http.post<any>(staticSettings.URL_MICROGESTION+'guardararticulo', articulo)
    
  }
 
  actualizararticulo( articulo : Articulos){

    return this.http.post<any>(staticSettings.URL_MICROGESTION+'actualizar',articulo)
    
  }
  
crearusuario( usuario : Usuario){

  return this.http.post<any>(staticSettings.URL_MICROGESTION+'guardarusuario', usuario)
    
  }


  creararticuloasignado( articuloas : Articulosasignados ){

    return this.http.post<any>(staticSettings.URL_MICROGESTION+'guardarentidad', articuloas)
      
    }

    listardispositivos() : Observable<any[]> {
  
      return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obtenerdispositivos')
      .pipe(
        catchError(this.handleError('listarRutas',[]))
      )
  
    }
    listaroperadores() : Observable<any[]> {
  
      return this.http.get<any[]>(staticSettings.URL_MICROGESTION+'obteneroperadores')
      .pipe(
        catchError(this.handleError('listarRutas',[]))
      )
  
    }

private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    console.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}




}
