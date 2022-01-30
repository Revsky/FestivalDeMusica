function tarea( callback ){
    /* 
        - Callback es un parametro que debe ser indicado obligatoriamente este se encarga de decir a gulp que una tarea a finalizado.

        - Pude tener el nombre de callback o bien done o fn, el nombre es representativo, ya que lo que importa es indicarlo y llamarlo al final de la tarea
    */
    console.log("Desde la primer tarea")
    // Callback debe ser llamada al final de todo el código de la tarea
    callback();
}

// Exports nos permite ejecutar una tarea desde la consola de comandos usando el comando gulp tarea_a_ejecutar

// Podemos usar el mismo nombre para la asignación y para la tarea que va a ejecutar para no complicar mas el código
exports.tarea = tarea;