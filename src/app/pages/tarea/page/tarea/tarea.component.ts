import { Component, OnInit } from '@angular/core';
import { tareaModel } from './../../../../models/tarea.model';
import { TareaService } from '@services/tarea.service';
import { TareaListComponent } from './../../../../pages/tarea/componets/tarea-list/tarea-list.component'
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.scss']
})
export class TareaComponent implements OnInit {


  protected showModalTarea = false;
  protected formTitle: string;
  protected showResultadoBusqueda: boolean = false;
  protected resultadoBusqueda: tareaModel = null;

  nombre: string = '';
  descripcion: string = '';
  estado: boolean = true;

  guardar: boolean = true;

  tarea: tareaModel = {
    id:0,
    nombre: '',
    descripcion: '',
    estado: true,
  }

  Tarea: tareaModel = null;
  tareas: tareaModel[] = [];


  constructor(
    private _tareaService: TareaService,
    private _notificationService: UINotificationService
  ) { }

  ngOnInit(): void {
    this.getTarea()
 }
  
  getTarea() {
    this._tareaService.traerTareas().subscribe(tareas => {
      console.log(tareas);
      
      this.tareas = tareas;
    });
  }


  deleteTarea(id: number): void {
    this._tareaService.borarTareas(id).subscribe(() => {
      this.getTarea();
    });
  }

  actualizarTarea(tarea: tareaModel) {
    this.tarea = tarea;
    this.showModalTarea = true;
  }

  createTarea() {
    this.tarea = null;
    this.showModalTarea = true;
  }
  
  postTarea(tarea: tareaModel) {
    if (tarea.id) {
      console.log('actualizando');
      this._tareaService.actualizarTareas(tarea).subscribe(tarea => {
        console.log(tarea,'hola');

        this.getTarea();
        this.reset();
      });
    } else {
      console.log('creando');
      this._tareaService.crearTarea(tarea).subscribe(rol => {
        // this.showModalTarea = false;
        // this._notificationService.success('Tarea gurdada con exito');
        this.getTarea();
        this.reset();
      });
    }

  }
  reset() {
    this.Tarea=null;
    this.tareas=[];
    this.showModalTarea=false;
  }
}

