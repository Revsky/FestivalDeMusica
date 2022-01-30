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

///////////////////////////////////////////////////////////////////////////////////

// Realizamos la importación multiple de paquetes de una dependencia usando la sintaxis de llaves
const { src,dest,watch } = require('gulp')
// Importamos la dependencia que nos permite compilar a SASS
// Usamos require('gulp--sass') para operar archivos sass desde gulp
// E indicamos (requiere('sass')) para que use el paquete principal de sass que es el que contiene toda la logica necesaria para hacer la conversión
const sass = require('gulp-sass')(require('sass'));

function css(callback){
    console.log("Compilano SASS");

    // Identificar el archivo .SCSS a compilar

    // La funcion src recibe la ruta de donde esta nustro archivo app.scss
    /* 
        - pipe nos permite pasar el resultado de una función a otra a forma de argumento y ademas de esto ejecuta las funciónes envueltas por ella de manera serial una despues de otra
    */
    src('src/scss/app.scss')
        .pipe( sass() ) // Compilarlo
        .pipe( dest('build/css') ) // Almacenarlo en el disco duro, por defecto crea el archivo app.scss


    callback()
}
function dev(callback) {
    // La función de watch espera dos parametros 
        /*
            - La ruta del archivo SCSS de donde escuchara los cambios
            - La función que va a ejecutar cada vez que se ejecuten los cambios 
        */
    watch('src/scss/app.scss',css);

    callback();
}

// Exportación de funciones

exports.css = css;
exports.dev = dev;