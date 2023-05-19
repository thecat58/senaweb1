import { Injectable } from '@angular/core';
import { PermisoModel } from '@models/permiso.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  constructor(
    private _coreService: CoreService

  ) { }


  guardar(data: any): Observable<Object[]> {
    return this._coreService
      .put('asignar_rol_permiso', data)
      .pipe(map(response => response as Object[]));
  }

  public traerPermisos() {
    return this._coreService.get<PermisoModel[]>('permisos');
  }

  // public permisosByRol() {

  //   return this._coreService.post('permisos_rol');
  // }

  public permissionsRole(idRol: number) {
    return this._coreService.get<any[]>('permisos_rol?rol=' + idRol);
  }
}
