Tras crear los componentes, los todos van a estar centralizados en su propio módulo y en el todo-page, pero todo-page es la que se tiene que ver en app.component. Al poner la etiqueta <app-todo-page> en app.component dio error porque el componente todoPage está encapsulado en su propio todo.module, para que un componente encapsulado en su propio módulo sea visible fuera del mismo habría que hacer el export en el todo.module y desde luego tener en el app.module importado el todo.module.

El resto de componentes todo no hace falta exportarlos dado que estarán dentro de todo-page

Segmentamos el código html en sus diferentes componentes y añadimos las etiquetas de cada componente donde corresponda.


El todo debería seguir algún modelo, por ello crearemos un model

Añadimos la librería NgRx y creamos las actions y el reducer

Creamos la AppState en app.reducer.ts, que gestiona la App de forma global 

Comenzamos con la funcionalidad de añadir un ToDo a través de un formulario reactivo, para ello hay que instalar el modulo ReactiveForms. Se podría instalar en todos.module para que cuando hagamos lazyLoad, el reactiveFormsModule no se cargue hasta cargar el modulo de los ToDos, pero en este caso vamos a meterlo en el módulo global (app.module) por si quisiésemos usarlo en otras zonas de la aplicación. Sin embargo también hay que meter el import en el todo.module porque al estar los todos encerrados en su cubículo-módulo, no entiende de lo que pasa fuera de la app a no ser que se lo indiques, por ello hay que poner también el import de ReactiveForms en todo.module. No se volverá a cargar al usarse porque verá que ya lo tiene cargado cuando cargó el app.module, usará la misma instancia de ReactiveForms, pero hay que indicarle que lo use

Editamos todo-add tanto el html como el ts (ver ambos archivos) para poder agregar todos

Ver todos: añadimos más items al initialState del todo.reducer como prueba, lo que queremos es la todo-list que a su vez tiene dentro de su html un todo-item que necesitamos duplicar por cada elemento todo del array. Ver html y ts de todo-list. Al terminar se verá una lista de todos según los que hayamos puesto en el initialState, pero el texto no será el correcto.


APLICAR EL FILTRO VISUALMENTE

Se trata de modificar la lista de toDos visualmente, no queremos modificar el array de toDos, sino ver solo unos u otros. Para ello usaremos un pipe, los pipe no modifican los datos, solo visualmente los cambian. Para ello en todo-list.component