import { Action, createReducer, on } from '@ngrx/store';
import { crear, editar, toggleCompletado, borrar, toggleAllTodos, borrarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

//export const initialState:Todo[] = []; Inicialmente tenemos un array vacío de tipo ToDo (el modelo que creamos)
export const initialState: Todo[] = [   //Posteriormente decidió inicializar con un ToDo
  new Todo('Ser millonaria'),
  new Todo('Ser multi'),
  new Todo('Ser mega'),
  new Todo('Ser ultra'),
  new Todo('Ser supra')
];
const _todoReducer = createReducer(
  initialState,
  //on(crear, (state,{texto}) => state.push(texto)) //No se recomienda hacer push directamente al estado porque lo podría mutar
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  //Le estás diciendo que cree un nuevo array donde meta de forma individual cada uno de los todos que haya en el state,
  //y además añada al final en nuevo todo  

  on(toggleCompletado, (state, { id }) => {

    return state.map(todo => {

      if (todo.id === id) {
        //todo.completado = !todo.completado
        //Si ponemos esto en vez de lo que está, estaríamos manipulando el estado en vez de crear un nuevo estado
        return {
          ...todo, //Con esto creamos un nuevo objeto igual, pero cambiando lo de completado
          completado: !todo.completado
        }
      }
      else {
        return todo;
      }
    })
  }),

  on(editar, (state, { id, texto }) => {

    return state.map(todo => {

      if (todo.id === id) {

        return {
          ...todo,
          texto: texto
        }
      }
      else {
        return todo;
      }
    })
  }),
  on(borrar, (state, { id }) => state.filter(todo => todo.id !== id)), //Le dices que devuelva un array con todos los elementos cuyo ID sea diferente al que le envías (así se elimina del nuevo estado)

  on(toggleAllTodos, (state, { completado }) => {

    return state.map(todo => {

      if (todo.completado !== completado) {
        //todo.completado = !todo.completado
        //Si ponemos esto en vez de lo que está, estaríamos manipulando el estado en vez de crear un nuevo estado
        return {
          ...todo, //Con esto creamos un nuevo objeto igual, pero cambiando lo de completado
          completado: completado
        }
      }
      else {
        return todo;
      }
    })
  }),
  //VERSIÓN REDUCIDA: 
  // on(toggleAllTodos,(state,{completado}) => state.map(todo =>{
  //   return{
  //     ...todo,
  //     completado:completado
  //   }
  // }))

  //ESTAS DOS FORMAS SON LO MISMO
  // => state.map(todo =>{return{ bla bla bla }})
  // =>{ return state.map(todo=>{ bla bla bla })}

  on(borrarCompletados, (state) => state.filter(todo=> !todo.completado))
)
export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
} 