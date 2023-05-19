import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JornadaRoutingModule } from './jornada-routing.module';
import { JornadaComponent } from './page/jornada/jornada.component';
import { AddJornadaComponent } from './components/add-jornada/add-jornada.component';
import { ListJornadaComponent } from './components/list-jornada/list-jornada.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  exports:[
    AddJornadaComponent
  ],
  declarations: [
    JornadaComponent,
    AddJornadaComponent,
    ListJornadaComponent
  ],
  imports: [
    CommonModule,
    JornadaRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ComunModule,
    SweetAlert2Module,
  ]
})
export class JornadaModule { }
