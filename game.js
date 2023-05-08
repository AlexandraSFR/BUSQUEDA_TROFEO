//SISTEMA DE CLICKS
// generate a random Number
let getRandomNumber = size => {
    return Math.floor(Math.random() * size);
  }
  
  // get the Distance of two points
  let getDistance = (e, target) => {
    let diffX = e.offsetX - target.x;
    let diffY = e.offsetY - target.y;
    return Math.sqrt((diffX * diffX) + (diffY * diffY));
  }
  
  // return an String depending on the distances 
  let getDistanceHint = distance => {
    if (distance < 80) {
      return "CASI LO ENCUENTRAS!";
    } else if (distance < 150) {
      return "MUY MUY CERCA";
    } else if (distance < 200) {
      return " MUY CERCA";
    } else if (distance < 280) {
      return "CERCA";
    } else if (distance < 400) {
      return "LEJOS";
    } else if (distance < 500) {
      return "MUY LEJOS";
    } else {
      return "LEJISIMOS!";
    }
  }

// treasure coordinates
const WIDTH = 750;
const HEIGH = 460;

let target = {
  x: getRandomNumber(WIDTH),
  y: getRandomNumber(HEIGH)
};

// click handler
let $map = document.querySelector('#map');
let $distance = document.querySelector('#distance');
let clicks = 0;
const imgEquipo = document.getElementById('imgEquipo');
//VARIABLE PARA LLEVAR EL CONTROL DE QUE EQUIPO VA GANANDO O PERDIENDO
const equipos = ["img/LA1", "img/LF1"];
let turno_actual = 0;
let global = 0;
const modal = document.getElementById("modal");
const modal2 = document.getElementById("modal2");
var nombreEquipo = sessionStorage.getItem('nombreEquipo');
var nombreEquipo2 = sessionStorage.getItem('nombreEquipo2');


function actualizarImagenEquipo() {
  const imagen = document.getElementById("imgEquipo");
  const nombreEquipo = equipos[turno_actual];
  imagen.src = `${nombreEquipo}.png`;
}
//FUNCIONES DE CLICKS
$map.addEventListener('click', function (e) {

  if (clicks > 30) { // Si se han hecho más de 30 clics
    window.location.href = "perdedor.html"; // Redireccionar a otra página
    return; // Terminar la función
  }

  escogerPreguntaAleatoria()
  clicks++;
  let distance = getDistance(e, target);
  let distanceHint = getDistanceHint(distance);
  $distance.innerHTML = `<h1>${distanceHint}</h1>`;

   // create and position the red circle
   let $circle = document.createElement('div');
   $circle.classList.add('circle');
   $circle.style.left = e.pageX + 'px';
   $circle.style.top = e.pageY + 'px';
   document.body.appendChild($circle);

  if (distance < 60 ) {
    localStorage.setItem('equipoGanador', turno_actual);
    alert(`Found the treasure in ${clicks} clicks!`);
    location.reload();
    window.location.href = "ganador.html";
    
  }
});

// PREGUNTAS FUNCIONALIDAD
let base_preguntas = readText("preguntas.json")
  let interprete_bp = JSON.parse(base_preguntas)
  let pregunta
  let posibles_respuestas
  let btn_correspondiente =[
    select_id("btn1"),
    select_id("btn2"),
    select_id("btn3"),
    select_id("btn4")
  ]
//

function escogerPreguntaAleatoria (){
  escogerPregunta(Math.floor(Math.random()*interprete_bp.length))
}

function escogerPregunta(n) {
  pregunta = interprete_bp[n]
  select_id("pregunta").innerHTML=pregunta.pregunta
  select_id("btn1").innerHTML= pregunta.respuesta
  select_id("btn2").innerHTML= pregunta.incorrecta1
  select_id("btn3").innerHTML= pregunta.incorrecta2
  select_id("btn4").innerHTML= pregunta.incorrecta3
  desordenarRespuestas(pregunta)
}

let btns = [
  select_id("btn1"),
  select_id("btn2"),
  select_id("btn3"),
  select_id("btn4")
]

function desordenarRespuestas(pregunta){
posibles_respuestas = [
  pregunta.respuesta,
  pregunta.incorrecta1,
pregunta.incorrecta2, 
pregunta.incorrecta3]
posibles_respuestas.sort(()=>Math.random()-0.5)
select_id("btn1").innerHTML= posibles_respuestas[0]
select_id("btn2").innerHTML= posibles_respuestas[1]
select_id("btn3").innerHTML= posibles_respuestas[2]
select_id("btn4").innerHTML= posibles_respuestas[3]
}

function oprimir_btn (i){
 if( posibles_respuestas[i]==pregunta.respuesta){
  modal.style.display = "block";
  setTimeout(function() {
    modal.style.animation = "fadeout 0.5s";
    setTimeout(function() {
      modal.style.display = "none";
      modal.style.animation = "";
    }, 500);
  }, 2000);
  document.getElementById("respuesta").play();
  btn_correspondiente[i].style.background = "lightgreen"
  if (turno_actual == 0){ //este es el primer caso, se mantiene como 0 o sea el equipo 1 
    turno_actual = 0;
    document.getElementById('nequito').textContent = nombreEquipo;
    actualizarImagenEquipo();
  }else{
    turno_actual = 1; // si el turno esta en 1 entonces se pondra el otro
    document.getElementById('nequito').textContent = nombreEquipo2;
    actualizarImagenEquipo();
  }
  
 }else{
  modal2.style.display = "block";
  setTimeout(function() {
    modal2.style.animation = "fadeout 0.5s";
    setTimeout(function() {
      modal2.style.display = "none";
      modal2.style.animation = "";
    }, 500);
  }, 2000);
  document.getElementById("respuesta2").play();
  btn_correspondiente[i].style.background = "pink"
  if (turno_actual == 0){
    turno_actual = 1;
    imgEquipo.src = 'img/LF1.png';
    document.getElementById('nequito').textContent = nombreEquipo2;
  }else{
    turno_actual = 0;
    imgEquipo.src = 'img/LA1.png';
    document.getElementById('nequito').textContent = nombreEquipo;
  }

  


 }
 setTimeout(()=>{

reiniciar()
 },2000);
}

function reiniciar(){
  for (const btn of btn_correspondiente){
    btn.style.background = "white"
  }
  escogerPreguntaAleatoria()
}

function select_id(id) {
  return document.getElementById(id);
}

function style(id) {
  return select_id(id).style;
}

function readText(ruta_local) {
  var texto = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", ruta_local, false);
  xmlhttp.send();
  if (xmlhttp.status == 200) {
    texto = xmlhttp.responseText;
  }
  return texto;
}


