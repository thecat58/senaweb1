import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tareaModel } from '@models/tarea.model';
import { Observable } from 'rxjs';
import { TAREA } from '../nav/permissions';
import { CoreService } from './core.service';


@Injectable({
  providedIn: 'root'
})
export class TareaService {

      constructor(
      private _httpClient: HttpClient,
      private _coreService: CoreService
    ) { }
  
   
     
    urls: string = 'http://127.0.0.1:8000/api/tareas/'
    traerTareas() {
      return this._httpClient.get<tareaModel[]>(this.urls);
    }
  
   
    borarTareas(id:number): Observable <any>{
      return this._httpClient.delete(this.urls+id);
    }
  
  
    crearTarea(tarea: tareaModel) {
      return this._coreService.post<tareaModel>('tareas', tarea);
    }
    actualizarTareas(tarea:tareaModel){
      console.log(tarea.id,'actualizadoooooooooo')
      tarea.nombre=tarea.nombre.toUpperCase();
      const url = this.urls+tarea.id;
      return this._httpClient.put<tareaModel>(url,tarea);
    }
  
  }

