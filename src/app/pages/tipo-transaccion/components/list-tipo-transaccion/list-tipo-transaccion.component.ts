import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TipoTransaccionModel } from '@models/tipo-transaccion.model';

@Component({
  selector: 'app-list-tipo-transaccion',
  templateUrl: './list-tipo-transaccion.component.html',
  styleUrls: ['./list-tipo-transaccion.component.scss']
})
export class ListTipoTransaccionComponent {

  @Input() tipoTs: TipoTransaccionModel[] = [];

  @Output() update: EventEmitter<TipoTransaccionModel> = new EventEmitter();
  @Output() delete: EventEmitter<number> = new EventEmitter();
  @Output() create: EventEmitter<void> = new EventEmitter();

  numReg = 5;
  pageActual = 0;

  constructor() {
  }

  enviarNumeroRegistros(num: number) {
    this.numReg = num;
  }

  actualizar(tipoT: TipoTransaccionModel) {
    this.update.emit(tipoT);
  }

  eliminar(idTipoT: number) {
    this.delete.emit(idTipoT);
  }

  agregar() {
    this.create.emit();
  }

}
