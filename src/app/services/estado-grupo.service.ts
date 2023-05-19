import { Injectable } from '@angular/core';
import { EstadoGrupoModel } from '@models/estado-grupo.model';
import { CoreService } from './core.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoGrupoService {
  
  private headerCustom?: HttpHeaders;
  permisos: number;
  grupos: any[];
  url = `http://127.0.0.1:8000/api/`;

  constructor(private http: HttpClient, private _coreService: CoreService) { }

  public traerEstadoGrupos() {
    return this._coreService.get<EstadoGrupoModel[]>('estado_grupos');
  }

}
