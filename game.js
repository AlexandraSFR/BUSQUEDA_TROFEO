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



$map.addEventListener('click', function (e) {

  if (clicks > 30) { // Si se han hecho más de 30 clics
    window.location.href = "perdedor.html"; // Redireccionar a otra página
    return; // Terminar la función
  }
    
  console.log('click');
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
    alert(`Found the treasure in ${clicks} clicks!`);
    location.reload();
    window.location.href = "ganador.html";
  }
});

// PREGUNTAS FUNCIONALIDAD
escogerPregunta()
function escogerPregunta(n) {
  pregunta = interprete_bp[n];
  select_id("pregunta").innerHTML = pregunta.pregunta;
  select_id("numero").innerHTML = n;
  let pc = preguntas_correctas;
  if (preguntas_hechas > 1) {
    select_id("puntaje").innerHTML = pc + "/" + (preguntas_hechas - 1);
  } else {
    select_id("puntaje").innerHTML = "";
  }

  desordenarRespuestas(pregunta);
  
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
