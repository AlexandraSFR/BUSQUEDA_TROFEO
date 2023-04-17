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
    } else if (distance < 40) {
      return "ESTAS MUY CERCA";
    } else if (distance < 60) {
      return "ESTAS CERCA";
    } else if (distance < 100) {
      return "CERCA";
    } else if (distance < 180) {
      return "ESTAS LEJOS";
    } else if (distance < 360) {
      return "ESTAS MUY LEJOS";
    } else {
      return "ESTAS LEJISIMOS!";
    }
  }