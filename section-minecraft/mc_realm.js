
// Detectar si es dispositivo móvil
const is_mobile = window.matchMedia("(hover: none)").matches;

// Detectar conexión estable en dispositivos móviles
const connection = navigator.connection;

const lowPower =
    is_mobile && (
        connection?.saveData ||
        connection?.effectiveType === "2g" ||
        connection?.effectiveType === "slow-2g" ||
        navigator.hardwareConcurrency <= 4 ||
        navigator.deviceMemory <= 2 ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );

// Audio de confirmacion al dar a descargar mapa
audio_confirm = new Audio("../misc/snd_confirm.mp3");

// Funciones boton de descarga
function onHover() {
    $("#download_button")
        .attr('src',"../misc/download_minecraft_select.png");
  }
  
function offHover() {
    $("#download_button")
        .attr('src', "../misc/download_minecraft.png");
  }

function onHover_back() {
    $("#back_button")
        .attr('src',"../misc/back_button_selected.png");
  }
  
function offHover_back() {
    $("#back_button")
        .attr('src', "../misc/back_button.png");
  }

function clickImage() {
    audio_confirm.play();
  }

// Comprobar si renderizar galería de fotos optimizada

const file_ext = optimize ? ".webp" : ".png";
root = optimize ? root+"webp/": root;


// Anim. Fade-in de la gallería
const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");

        observer.unobserve(entry.target);

    });

}, {
    threshold: 0.15
});


// Renderizar galería de fotos
function render_gallery(){
  const gallery=document.getElementById("gallery");

  for(let i=0;i<fotos.length;i++){
    const img=document.createElement("img");
    img.src=root+fotos[i].src+file_ext;
    img.className="picture";
    img.loading="lazy";
	img.decoding="async";
    img.onclick=()=>abrir(i);
    gallery.appendChild(img);
	if (!lowPower) {
		observer.observe(img);
	}
  }
}

const track = document.querySelector(".track");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

const lightbox = document.querySelector(".lightbox");
const lbImage = document.getElementById("lightbox-image");
const description = document.getElementById("description");

const lbPrev = document.querySelector(".lb-prev");
const lbNext = document.querySelector(".lb-next");

const close = document.querySelector(".close");

let index = 0;

function siguiente(){
	if(index>fotos.length) return;
	index++;
	render_gallery();
}

function anterior(){
	if(index<=0) return;
	index--;
	render_gallery();
}

function abrir(i){
	index=i;

	lbImage.src=root+fotos[index].src+file_ext;
  description.textContent = fotos[index].text;

	lightbox.classList.add("show");
 	document.body.classList.add("no-scroll");
	

	precargar();
}

function cerrar(){
	lightbox.classList.remove("show");
  	document.body.classList.remove("no-scroll");
	description.textContent = "";
}

function lbSiguiente(){
	if(index>=fotos.length-1) return;
	index++;
	lbImage.src=root+fotos[index].src+file_ext;
  	description.textContent = fotos[index].text;
	
	precargar();
}

function lbAnterior(){
	if(index<=0) return;
	index--;
	lbImage.src = root+fotos[index].src+file_ext;
  	description.textContent = fotos[index].text;
  
	precargar();
}

function precargar(){

if(index+1<fotos.length){
	new Image().src = root+fotos[index+1].src+file_ext;
}

if(index-1>=0){
	new Image().src = root+fotos[index-1].src+file_ext;
}

}

next.onclick=siguiente;

prev.onclick=anterior;

lbNext.onclick=lbSiguiente;

lbPrev.onclick=lbAnterior;

close.onclick=cerrar;


// Detectar clic fuera de imagen en lightbox para cerrarlo
lightbox.onclick=e=>{
	if(e.target===lightbox && is_mobile){
		cerrar();
	}
};

// Controles lightbox
document.addEventListener("keydown",e=>{
	if(e.key==="ArrowRight"){
		lightbox.classList.contains("show") ? lbSiguiente() : siguiente();
	}
	if(e.key==="ArrowLeft"){
		lightbox.classList.contains("show") ? lbAnterior() : anterior();
	}
	if(e.key==="Escape"){
		cerrar();
	}
});

// Actualizar pos botón cerrar en móviles
function update_pos() {

    const vv = window.visualViewport;

    if (!vv) return;

    close.style.left =
        (vv.offsetLeft + vv.width - 100) + "px";

    close.style.top =
        (vv.offsetTop + 20) + "px";

}

if (window.visualViewport) {

    visualViewport.addEventListener("scroll", update_pos);
    visualViewport.addEventListener("resize", update_pos);

    update_pos();

}


/*
document.querySelectorAll(".picture").forEach(picture => {
    observer.observe(picture);
});
*/
