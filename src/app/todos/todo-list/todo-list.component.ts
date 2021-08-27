import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { filtrosValidos } from 'src/app/filtro/filtro.actions';
import { AppState } from '../../app.reducer';
import { Todo } from '../models/todo.model';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  //Este componente muestra la lista de todos que se guarda en el state, por ello necesitamos un objeto de tipo 
  //todo donde se meterán todos los toDos que tengamos. Para obtenerlos metemos en el constructor la store
  //dado que nos vamos a suscribir a ella para obtener esos todos
  //En el html hacemos un ngFor para que por cada elemento del objeto toDos cree un componente todo-item

  todos: Todo[] =[];

  filtroActual: filtrosValidos = "Todos";

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    // this.store.select('todos').subscribe(todos => this.todos = todos);
    //Ahora usaremos de la store no solo los todos sino el filtro, por eso necesitamos todo el estado:
    // this.store.subscribe(state =>{
    //   this.todos = state.todos;
    //   this.filtroActual = state.filtro;
    // });
    //el state recibido se puede desestructurar: 
    this.store.subscribe( ({todos,filtro}) =>{
      this.todos = todos;
      this.filtroActual = filtro;
    });
  }
}
