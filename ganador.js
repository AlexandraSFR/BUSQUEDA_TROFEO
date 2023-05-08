let valor = localStorage.getItem('equipoGanador');
const modal = document.getElementById("ganador");

if (valor == 0){ //si el equipo es uno poner a la monita rosa
  modal.src = 'img/LA1.png';
}else{
    modal.src = 'img/LF1.png';
}