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

        galeria.appendChild(imagen);
    }
}