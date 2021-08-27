import { Todo } from './todos/models/todo.model';
import { filtrosValidos } from './filtro/filtro.actions';
import { ActionReducerMap } from '@ngrx/store';
import { todoReducer } from './todos/todo.reducer';
import { filtroReducer } from './filtro/filtro.reducer';


//Indica el AppState global de la App, aunque en este caso solo tenemos un tipo de objeto en el estado (los todos)
//se podrían tener más elementos en el estado como usuarios, notificaciones, etc, se añaden aquí a modo ilustrativo

export interface AppState{
    todos: Todo[],
    filtro: filtrosValidos
    // usuario:{},
    // notificaciones:[]  
}


//esta es la forma de centralizar los reducers y no ponerlos en listado en el app.module, evitando así hacer del app.module un archivo muy largo
//Se recomienda que el app-.module tenga lo básico de importanciones y tenga principalmente módulos
//El actionReducerMap es de tipo AppState, si hay algo en el AppState que no tiene su importación de reducer aquí, dará error
export const appReducers: ActionReducerMap<AppState> = {

    todos: todoReducer,
    filtro: filtroReducer
}