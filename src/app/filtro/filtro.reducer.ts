
import { createReducer, on, Action } from '@ngrx/store';
import { setFiltro, filtrosValidos } from './filtro.actions';


export const initialState: filtrosValidos = 'Todos';

const _filtroReducer = createReducer<filtrosValidos, Action>(initialState,
  on( setFiltro , (state, { filtro }) => filtro ),

);

export function filtroReducer(state: filtrosValidos | undefined, action: Action) {
  return _filtroReducer(state, action);
}