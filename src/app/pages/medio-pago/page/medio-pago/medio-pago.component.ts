import { Component, OnInit } from '@angular/core';
import { MedioPagoModel } from '@models/medio-pago.model';
import { MedioPagoService } from '@services/medio-pago.service';
import { UINotificationService } from '@services/uinotification.service';

@Component({
  selector: 'app-medio-pago',
  templateUrl: './medio-pago.component.html',
  styleUrls: ['./medio-pago.component.scss']
})
export class MedioPagoComponent implements OnInit {

  private showModalMedioPago = false;

  medioPago: MedioPagoModel = null;
  medioPagos: MedioPagoModel[] = [];

  constructor(
    private _uiNotificationService: UINotificationService,
    private _medioPagoService: MedioPagoService
  ) { }

  ngOnInit(): void {
    this.getMedioPago();
  }

  getMedioPago() {
    this._medioPagoService.traerMedioPagos()
      .subscribe(medioPago => {
        this.medioPagos = medioPago;
      }, error => {
        this._uiNotificationService.error("Error de conexión");
    });
  }

  eliminarMedioPago(medioPagoId: number) {
    this._medioPagoService.eliminarMedioPago(medioPagoId).subscribe(() => {
      this.getMedioPago();
    })
  }

  actualizarMedioPago(medioPago: MedioPagoModel) {
    this.medioPago = medioPago;
    this.showModalMedioPago = true;
  }

  createMedioPago() {
    this.medioPago = null;
    this.showModalMedioPago = true;
  }

  guardarMedioPago(medioPago: MedioPagoModel) {
    if (medioPago.id) {
      this._medioPagoService.actualizarMedioPago(medioPago).subscribe(medioPago => {
        this.getMedioPago();
        this.reset();
      });
    } else {
      this._medioPagoService.crearMedioPago(medioPago).subscribe(rol => {
        this.getMedioPago();
        this.reset();
      })
    }
  }

  reset() {
    this.medioPago = null;
    this.showModalMedioPago = false;
  }

}
