import { createAction, props } from "@ngrx/store";

export const crear = createAction('[TODO] Crear todo', props<{texto:string}>());
export const toggleCompletado = createAction('[TODO] Toggle Todo', props<{id:number}>());
//Toggle quiere decir que si está en falso lo pone a true y si está en tru lo pone a falso

export const editar = createAction('[TODO] Editar Todo', props<{id:number, texto:string}>());

export const borrar = createAction('[TODO] Borrar Todo', props<{id:number}>());

export const toggleAllTodos = createAction('[TODO] Toggle All Todo', props<{completado:boolean}>());

export const borrarCompletados = createAction('[TODO] Borrar Completados');