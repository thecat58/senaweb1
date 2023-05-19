import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { DiaModel } from '@models/dia.model';
import { DiaService } from '@services/dia.service';
import { UINotificationService } from '@services/uinotification.service';
import { debounceTime } from 'rxjs/operators';
import { DiaJornadaModel } from '@models/dia_jornada.model';
import { JornadaModel } from '@models/jornada.model';
import { DiaJornadaService } from '@services/dia-jornada.service';

@Component({
  selector: 'app-add-jornada',
  templateUrl: './add-jornada.component.html',
  styleUrls: ['./add-jornada.component.scss'],
})
export class AddJornadaComponent implements OnInit {

  @Input() jorandas: JornadaModel[] = [];
  @Input() jorna: JornadaModel;

  @Output() store: EventEmitter<JornadaModel> = new EventEmitter();
  @Output() cancelar: EventEmitter<void> = new EventEmitter();

  diasSeman: DiaModel[] = [];
  diasInput: DiaModel[] = [];
  formJornada: UntypedFormGroup;
  jornada: JornadaModel;
  jornadaIdUpdate: number;
  public diasChecked: any[];
  showModalJornadaFrm = false;
  todosLosDias = false;

  constructor(
    private _diajornadaService: DiaJornadaService,
    private _diaService: DiaService,
    private _formBuilder: UntypedFormBuilder,
    private _uiNotificationService: UINotificationService
  ) {
    this.jornada = {
      id: null,
      horaFinal: '',
      horaInicial: null,
      descripcion: null,
      nombreJornada: '',
      numeroHoras: null,
    };
    this.buildForm();
  }

  ngOnInit(): void {
    this.setJornada();
    this.cargarDias();
    this.checkedDias();
  }

  get nombreJornadaField() {
    return this.formJornada.get('nombreJornada');
  }
  get horaInicialField() {
    return this.formJornada.get('horaInicial');
  }
  get horaFinalField() {
    return this.formJornada.get('horaFinal');
  }
  get numHorasField() {
    return this.formJornada.get('numeroHoras');
  }
  get descripcionField() {
    return this.formJornada.get('descripcion');
  }

  closeModal() {
    this.formJornada.reset();
    this.cancelar.emit();
  }

  private buildForm() {
    this.formJornada = this._formBuilder.group({
      id: [0],
      nombreJornada: ['', [Validators.nullValidator]],
      horaInicial: ['', [Validators.required]],
      horaFinal: ['', [Validators.required]],
      numeroHoras: ['', [Validators.required]],
      dataDia: this._formBuilder.array([]),
    });
    this.formJornada.valueChanges.pipe(debounceTime(350)).subscribe((data) => {
      this.calcularCantidadH();
    });
  }

  onChange(dia: DiaModel, isChecked: boolean, pos: number) {
    if (isChecked) {
      this.diasInput.push(dia);
    } else {
      this.diasInput.splice(pos, 1);
    }
  }

  guardarJornada() {
    this.store.emit(this.getJornada());
  }

  cargarDias() {
    this._diaService.traerDia().subscribe(
      (dias) => {
        this.diasSeman = dias;
      },
      (error) => {
        this._uiNotificationService.error('Error de conexión');
      }
    );
  }

  calcularCantidadH() {
    const horaInicial = this.formJornada.get('horaInicial').value;
    const horaFinal = this.formJornada.get('horaFinal').value;

    if (horaInicial && horaFinal) {
      const horaInicialDate = new Date(`01/01/2000 ${horaInicial}`);
      const horaFinalDate = new Date(`01/01/2000 ${horaFinal}`);

      let diff = horaFinalDate.getTime() - horaInicialDate.getTime();

      if (diff < 0) {
        diff += 24 * 60 * 60 * 1000;
      }
      const diffHoras = diff / (60 * 60 * 1000);
      this.formJornada.get('numeroHoras').setValue(diffHoras.toFixed(2));
    } else {
      this.formJornada.get('numeroHoras').setValue(null);
    }
  }

  get totalDiasSeleccionados() {
    return this.diasSeman.filter((d) => d['checked']).length;
  }

  setJornada() {
    if (this.jorna) {
      this.formJornada.patchValue({
        id: this.jorna?.id,
        descripcion: this.jorna.descripcion,
        horaFinal: this.jorna.horaFinal,
        horaInicial: this.jorna.horaInicial,
        nombreJornada: this.jorna.nombreJornada,
        numeroHoras: this.jorna.numeroHoras,
      });
    }
  }

  private getControl(name: string) {
    return this.formJornada.controls[name];
  }

  getJornada(): JornadaModel {
    let description = '';
    const diaJornadas: DiaJornadaModel[] = this.diasSeman
      .filter((d) => d['checked'])
      .map((d) => {
        description += d.dia + ' | | ';
        return {
          idDia: d.id,
        };
      });

    return {
      id: this.jorna?.id,
      nombreJornada: this.getControl('nombreJornada').value,
      descripcion: description,
      horaInicial: this.getControl('horaInicial').value,
      horaFinal: this.getControl('horaFinal').value,
      numeroHoras: this.getControl('numeroHoras').value,
      diaJornada: diaJornadas,
    };
  }

  changeTodosLosDias(allDays: boolean) {
    this.todosLosDias = allDays;
    if (allDays) {
      this.diasSeman.map((dia) => {
        dia['checked'] = true;
        return dia;
      });
    } else {
      this.diasSeman.map((dia) => {
        dia['checked'] = false;
        return dia;
      });
    }
  }

  changeDia(checked: boolean, index: number) {
    this.diasSeman[index]['checked'] = checked;
    this.todosLosDias = this.totalDiasSeleccionados === 7;
  }

  checkedDias() {
    this.diasChecked = [];
    this._diajornadaService.getDiaJornadaByJornada(this.jorna.id).subscribe(
      (savedData: any) => {
        if (savedData && savedData.length > 0) {
          this.diasChecked = savedData;
          this.diasSeman = this.diasSeman.map((diaSe) => {
            diaSe.checked =
              this.diasChecked.findIndex((p) => p.idDia === diaSe.id) !== -1;
            return diaSe;
          });
        } else {
          this.diasSeman.forEach((diaSe) => {
            diaSe.checked = false;
          });
        }
      },
      (error) => {
        console.log('There was an error while retrieving data !!!', error);
      }
    );
  }
}
