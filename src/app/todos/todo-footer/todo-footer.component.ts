import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/store-devtools/src/reducer';
import { AppState } from '../../app.reducer';
import { filtrosValidos, setFiltro } from '../../filtro/filtro.actions';
import { borrarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos = 'Todos';

  filtros: filtrosValidos [] = ['Todos', 'Completados', 'Pendientes'];

  pendientes:number = 0;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    // this.store.select('filtro').subscribe(filtro => {
    //   console.log(filtro);
      
    //   this.filtroActual = filtro;
    // })

    this.store.subscribe(state => {
      this.filtroActual = state.filtro;
      this.pendientes = state.todos.filter(todo => !todo.completado).length;
    })
  }

  cambiarFiltro(filtro:filtrosValidos){
    this.store.dispatch(setFiltro({filtro:filtro}));

    console.log(filtro);
  }

  borrarCompletados(){
    this.store.dispatch(borrarCompletados());
  }

}
