import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { tareaModel } from '@models/tarea.model';
import { debounceTime } from 'rxjs/operators';




@Component({
  selector: 'app-tarea-item',
  templateUrl: './tarea-item.component.html',
  styleUrls: ['./tarea-item.component.scss']
})
export class TareaItemComponent {
  @Output() update=new EventEmitter<tareaModel>();
  @Output() create: EventEmitter<tareaModel>= new EventEmitter();
  @Output() cancel: EventEmitter<tareaModel>=new EventEmitter();
  @Input() tarea:tareaModel=null;
  @Input() tareas: tareaModel[] = [];
  
  formTarea: UntypedFormGroup;

  constructor(
    private formBuilder:FormBuilder
  ){
    this.tarea={
      id:null,
      nombre:'',
      descripcion:'',
      estado:null,
    };
    this.builForm();
  }

  ngOnInit(): void {
    
    this.setTarea();
  }
    //  @Output() delete=new EventEmitter<number>();
  
    get nombreTareaField(){
      return this.formTarea.get('nombre');
    }
    get descripcionField(){
      return this.formTarea.get('descripcion');
    }
    get estadoField(){
      return this.formTarea.get('estado');
    }
    closeModal(){
      this.cancel.emit();
    }
    setTarea() {
      if (this.tarea) {
        this.formTarea.patchValue({
          nombre: this.tarea.nombre,
          descripcion: this.tarea.descripcion,
          estado: this.tarea.estado,
        })
      }
    }

    private builForm(){
      this.formTarea= this.formBuilder.group({
        id:[0],
        nombre:[''],
        descripcion:[''],
        estado:[1],
      });
      this.formTarea.valueChanges.pipe(
        debounceTime(350),
      )
      .subscribe(data=>{
        console.log(data);
      });
    }
  
  
  //  deleteItem():void{
  //    this.delete.emit(this.tarea.id);
  //  }
   updateItem(){
     this.update.emit(this.tarea);
   }
 
  
 
   guardarTarea(){
    this.create.emit(this.getTarea());
   }

   getTarea():tareaModel{
    return{
      id: this.getControl('id').value,
      nombre: this.getControl('nombre').value,
      descripcion:this.getControl('descripcion').value,
      estado:this.getControl('estado').value
      
    }
   }
   private getControl(name:string){
    return this.formTarea.controls[name];
   }
   

}
