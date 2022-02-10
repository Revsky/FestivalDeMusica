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
const { src,dest,watch,parallel } = require('gulp')
// Importamos la dependencia que nos permite compilar a SASS
// Usamos require('gulp--sass') para operar archivos sass desde gulp
// E indicamos (requiere('sass')) para que use el paquete principal de sass que es el que contiene toda la logica necesaria para hacer la conversión
const sass = require('gulp-sass')(require('sass'));
const plumber = require('gulp-plumber')

const autoprefixer = require('autoprefixer') // Permite que funcioenen las ultimas caracteristicas de CSS en cualquier navegador
const cssnano = require('cssnano') // Reduce y optimiza nuestro código CSS
const postcss = require('gulp-postcss')


// Paquetes para imagenes

const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const cache = require('gulp-cache');

// Paquetes para imagenes avif
const avif = require('gulp-avif');

function css(callback){
    console.log("Compilano SASS");

    // Identificar el archivo .SCSS a compilar

    // La funcion src recibe la ruta de donde esta nustro archivo app.scss
    /* 
        - pipe nos permite pasar el resultado de una función a otra a forma de argumento y ademas de esto ejecuta las funciónes envueltas por ella de manera serial una despues de otra
    */
    src('src/scss/**/*.scss') // La sintaxis de **/*.scss busca todos los archivos que tengan.scss dentro de la carpeta scss
        .pipe(plumber()) // Evita que en caso de error detenga el código de watch
        .pipe( sass({
            outputStyle:'compressed' // EStilo de salida del archivo compilado
        }) ) // Compilarlo
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( dest('build/css') ) // Almacenarlo en el disco duro, por defecto crea el archivo app.scss


    callback()
}
/* Genera una versión optimizada de imagenes jpg */
function imagenes( callback ){

    const opciones = {
        optimizationLevel: 3
    }

    src('src/img/**/*.{png,jpg}') 
        .pipe( cache( imagemin ( opciones ) ) )
        .pipe( dest('build/img') )

    callback();
}

function versionWebp( callback ){

    /* Generamos las configuraciónes para la función webp */
    const opciones = {
        quality:50
    };
    /* La sintaxis de .{} <- Nos permite indicarle a gulp las extenciones de imagenes que debe buscar */
    src('src/img/**/*.{png,jpg}') 
        .pipe(webp( opciones )) // Realizamos la conversion
        .pipe( dest( 'build/img' ) ) // Guardamos las versiones convertidas

    callback();
}

function versionAvif( callback ){

    const opciones = {
        quality:50
    };
    src('src/img/**/*.{png,jpg}') 
        .pipe(avif( opciones ))
        .pipe( dest( 'build/img' ) )

    callback();
}

function javascript( callback ){

    src('src/js/**/*.js')
        .pipe(dest('build/js'))

    callback()
}

function dev(callback) {
    // La función de watch espera dos parametros 
        /*
            - La ruta del archivo SCSS de donde escuchara los cambios
            - La función que va a ejecutar cada vez que se ejecuten los cambios 
        */
    watch('src/scss/**/*.scss',css);
    // Escuchamos los camnios en los archivos js
    watch('src/js/**/*.js',javascript);

    callback();
}

// Exportación de funciones

exports.css1 = css;
exports.javascript = javascript;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif
exports.imagenes = imagenes;
/* La funcion parallel permite ejecutar de manera paralela diversas funciones */
exports.dev = parallel(imagenes,versionWebp,versionAvif,javascript,dev);

exports.watch = dev;