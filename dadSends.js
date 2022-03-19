//  Simulation of Bruce's speed and time descending Eagle's Nest Road

var hillData = [
  0.114,
  0.141,
  0.16,
  0.177,
  0.193,
  0.193,
  0.164,
  0.131,
  0.109,
  0.077,
  0.054
]; // slopes of hill from strava at 10% intervals of overall route
var distanceInterval = 14.83262508568872; // horizontal distance between each interval
var velocity = 0; // initial velocity
var kineticE = 0; // initial kinetic energy
var bruceMass = 23; // bruce's mass in kg (50 lbs estimated)
var scooterMass = 11; // scooter mass in kg (25 lbs estimated)
var rollingResistance = 0.8133; // rolling resistance in N
var totalMass = bruceMass + scooterMass; // total mass of rider and machine
var gravity = 9.81; // engineers say its 10
var velocityLog = []; // returned array of velocity at each segment
var dragCD = 1.1; // estimated drag coefficient of scooter rider
var frontalArea = 0.3; // estimated frontal area of bruce riding scooter in square meters (45 inches tall)
var rho = 1.225; // atmospheric pressure at STP
var time = 0;
var timeLog = [];

// function that returns slope at input interval #
var hillSlope = (distance) => {
  return hillData[distance];
};

// routine calculates work done by gravity and air drag over each interval
for (var i = 0; i < hillData.length - 1; i++) {
  var addKE =
    ((hillSlope(i) + hillSlope(i + 1)) *
      gravity *
      distanceInterval *
      totalMass) /
    2; // adds to kinetic energy according to conservation of energy and loss of GPE
  var dragLoss = 0.5 * dragCD * 5 * rho * velocity ** 2; // substracts from kinetic energy according to conservation of energy and work done against drag
  // force of drag = 0.5 * Cd * A * Rho * velocity^2
  var rollingLoss = rollingResistance * distanceInterval;
  kineticE += addKE;
  kineticE -= dragLoss;
  kineticE -= rollingLoss;
  velocity = Math.sqrt((2 * kineticE) / totalMass); // calculates current velocity from kinetic energy
  velocityLog.push(velocity); // adds current velocity to return array
  time += distanceInterval / velocity;
  timeLog.push(time);
}

console.log(velocityLog); // returns array of velocity over distance
console.log(time);
console.log(timeLog);
