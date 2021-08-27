import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input()
  todo!: Todo;
  @ViewChild('inputFisico') txtInputFisico!: ElementRef;
  chkCompletado!: FormControl;
  txtInput!: FormControl;

  editando: boolean = false;



  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor => {
      this.store.dispatch(actions.toggleCompletado({id:this.todo.id}))
    });
  }

  editar() {

    this.editando = true;

    this.txtInput.setValue(this.todo.texto);
    //Esto lo ponemos porque sin él si le damos a editar un Todo, lo borramos y con la caja en blanco clicamos
    //fuera como si la saliésemos de la edición, aunque en el listado nos siga saliendo, cuando le volvemos a
    //dar a editar, sale la caja vacía

    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;

    if(this.txtInput.invalid){
      return; //Si el input es invalido ya no disparamos la acción
    }
    if(this.txtInput.value === this.todo.texto){return} //si el valor no cambia no dispara la acción
   
    this.store.dispatch(
      actions.editar({
        id:this.todo.id,
        texto:this.txtInput.value
      })
    )
  }

  borrar(){
    this.store.dispatch(actions.borrar({id:this.todo.id}))
  }

}
