import { Component, EventEmitter, Input,Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { tareaModel } from '@models/tarea.model';



@Component({
  selector: 'app-tarea-list',
  templateUrl: './tarea-list.component.html',
  styleUrls: ['./tarea-list.component.scss']
})
export class TareaListComponent {
  //este es el de mostrar
  @Input() tareas: tareaModel[] = [];
  @Input() tarea: tareaModel ;

  @Output() delete = new EventEmitter<number>();
  @Output() update = new EventEmitter<tareaModel>();
  @Output() create = new EventEmitter<tareaModel>();

  numReg = 5;
  pageActual = 0;

  tar:tareaModel=null;
  tare:tareaModel[]=[];
  formTarea:UntypedFormGroup;


  constructor() {
    this.tarea={
      id:0,
      nombre:'',
      descripcion:'',
      estado:false,
    }
  }

  ngOnInit(): void {}

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  deleteItem(id: number): void {
    this.delete.emit(id);
  }
  updateItem(tarea: tareaModel) {
    this.update.emit(tarea);
  }
  agregar() {
    this.create.emit();
  }
}

