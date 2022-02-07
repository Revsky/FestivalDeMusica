document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
})

function iniciarApp(){
    crearGaleria();
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1; i<=12; i++){
        const imagen = document.createElement('picture')
        imagen.innerHTML = `
            <source srcet="build/img/thumb/${i}.avif" type="image/avif">
            <source srcet="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" alt="imagen ${i}" src="build/img/thumb/${i}.jpg">
        `;

        imagen.onclick = function(){
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen( index ){
    console.log(`Mostrando.. ${index}`);

    const imagen = document.createElement('picture')
    imagen.innerHTML = `
        <source srcet="build/img/grande/${index}.avif" type="image/avif">
        <source srcet="build/img/grande/${index}.webp" type="image/webp">
        <img loading="lazy" alt="imagen ${index}" src="build/img/grande/${index}.jpg">
    `;

    // Crea el overñat con la imagen
    const overlay = document.createElement('DIV')
    overlay.appendChild(imagen)
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')

        overlay.remove();
    }

    // Boton para cerrar la ventana modal
    const cerrarModal = document.createElement('P')
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar')
    cerrarModal.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body')

        overlay.remove();
    }

    overlay.appendChild(cerrarModal);


    // Añade la imagen al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay)
    body.classList.add('fijar-body')
}