// Audio de confirmacion al dar a descargar mapa
audio_confirm = new Audio("misc/snd_confirm.mp3");

/*
const fotos = [
  {
    src: "fotos-kebabmixto/foto_1.png",
    text: "Texto 001"
  },
  {
    src: "fotos-kebabmixto/foto_2.png",
    text: "Texto 002"
  },
  {
    src: "fotos-kebabmixto/foto_3.png",
    text: "Texto 003"
  },
  {
    src: "fotos-kebabmixto/foto_4.png",
    text: "Texto 004"
  }
]*/

// Funciones boton de descarga
function onHover() {
    $("#download_button")
        .attr('src',"misc/download_minecraft_select.png");
  }
  
function offHover() {
    $("#download_button")
        .attr('src', "misc/download_minecraft.png");
  }

function onHover_back() {
    $("#back_button")
        .attr('src',"misc/back_button_selected.png");
  }
  
function offHover_back() {
    $("#back_button")
        .attr('src', "misc/back_button.png");
  }

function clickImage() {
    audio_confirm.play();
  }

function photo(_url,_msg){
    var codeBlock = "";
    codeBlock +='<a href="'+_url+'" target="_blank">' +
                '<div class="image">' +
                '<img class="image__img" src="'+_url+'" loading="lazy">';
    if (_msg !== undefined) {
        codeBlock +='<div class="image__overlay">' +
                    '<div class="image__title">'+_msg+'</div>' +
                    '</div>'
    }
    codeBlock += '</div></a>';
    document.getElementById("photos").innerHTML += codeBlock;
}

function render_gallery(){
  const gallery=document.getElementById("gallery");

  for(let i=0;i<fotos.length;i++){
    const img=document.createElement("img");
    img.src=root+fotos[i].src;
    img.className="picture";
    img.onclick=()=>abrir(i);
    gallery.appendChild(img);
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
/*
function render(){

//track.innerHTML="";

for(let i=0;i<fotos.length;i++){

	//if(i<0 || i>=fotos.length) continue;

	//const slide=document.createElement("div");

	//slide.className="slide";

	const gallery=document.createElement("img");

	img.src=fotos[i];

	//img.loading="lazy";

	

	gallery.appendChild(img);

	track.appendChild(slide);

}

//precargar();

}
*/
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

	lbImage.src=root+fotos[index].src;
  if(fotos[index].text=="") {
    description.textContent = "-";
  } else
  description.textContent = fotos[index].text;

	lightbox.classList.add("show");
	

	precargar();
}

function cerrar(){
	lightbox.classList.remove("show");
	description.textContent = "";
}

function lbSiguiente(){
	if(index>=fotos.length-1) return;
	index++;
	lbImage.src=root+fotos[index].src;
  description.textContent = fotos[index].text;
	precargar();
}

function lbAnterior(){
	if(index<=0) return;
	index--;
	lbImage.src = root+fotos[index].src;
  if(fotos[index].text=="") {
    description.textContent = "-";
  } else
  description.textContent = fotos[index].text;
  
	precargar();
}

function precargar(){

if(index+1<fotos.length){
	new Image().src = root+fotos[index+1].src;
}

if(index-1>=0){
	new Image().src = root+fotos[index-1].src;
}

}

next.onclick=siguiente;

prev.onclick=anterior;

lbNext.onclick=lbSiguiente;

lbPrev.onclick=lbAnterior;

close.onclick=cerrar;

/*lightbox.onclick=e=>{

if(e.target===lightbox){
	cerrar();
}

};*/

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


// PARA MOVILES

