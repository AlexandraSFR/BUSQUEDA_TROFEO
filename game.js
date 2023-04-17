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
    if (distance < 30) {
      return "ESTAS MUY MUY CERCA!";
    } else if (distance < 60) {
      return "ESTAS MUY CERCA";
    } else if (distance < 80) {
      return "ESTAS CERCA";
    } else if (distance < 120) {
      return "CERCA";
    } else if (distance < 180) {
      return "ESTAS LEJOS";
    } else if (distance < 360) {
      return "ESTAS MUY LEJOS";
    } else {
      return "ESTAS LEJISIMOS!";
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

  if (distance < 25 ) {
    alert(`Found the treasure in ${clicks} clicks!`);
    location.reload();
    window.location.href = "ganador.html";
  }
});