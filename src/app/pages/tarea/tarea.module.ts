import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TareaRoutingModule } from './tarea-routing.module';
import { TareaListComponent } from './componets/tarea-list/tarea-list.component';
import { TareaItemComponent } from './componets/tarea-item/tarea-item.component';
import { TareaComponent } from './page/tarea/tarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComunModule } from '@components/comun.module';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';




@NgModule({
  declarations: [
    TareaComponent,
    TareaItemComponent,
    TareaListComponent
  ],
  imports: [
    CommonModule,
    TareaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ComunModule,
    SweetAlert2Module.forChild(),
    
  ]
})
export class TareaModule { }
