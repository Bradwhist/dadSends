//  Simulation of Bruce's speed and time descending Eagle's Nest Road

// Constants and assumed values
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

var bruceMass = 23; // bruce's mass in kg (50 lbs estimated)
var scooterMass = 11; // scooter mass in kg (25 lbs estimated)
var rollingResistance = 0.8133; // rolling resistance in N
var totalMass = bruceMass + scooterMass; // total mass of rider and machine
var gravity = 9.81; // engineers say its 10

var dragCD = 1.1; // estimated drag coefficient of scooter rider
var frontalArea = 0.3; // estimated frontal area of bruce riding scooter in square meters (45 inches tall)
var rho = 1.225; // atmospheric pressure

var velocity = 0; // initial velocity
var kineticE = 0; // initial kinetic energy
var velocityLog = [0]; // sequence of velocity after each interval
var velocityReportLog = []; // sequence of velocity after each segment
var time = 0; // total time elapsed
var timeLog = []; // sequence of time after each interval
var timeReportLog = []; // sequence of time after each segment

var intervals = 10 ** 6; // # intervals per segment

// routine calculates work done by gravity and air drag over each interval
for (var i = 0; i < hillData.length - 1; i++) {
  // routine runs for each segment using known hill gradients
  for (var j = 0; j < intervals; j++) {
    // subroutine calculates 10 ** 6 intervals for each segment

    // accumulates kinetic energy from loss in GPE and conservation of energy
    var addKE =
      ((hillData[i] + (hillData[i + 1] - hillData[i]) * (j / intervals)) *
        gravity *
        distanceInterval *
        totalMass) /
      intervals;

    // decrements from kinetic energy according to conservation of energy and work done against drag
    var dragLoss =
      (distanceInterval / intervals) *
      0.5 *
      dragCD *
      frontalArea *
      rho *
      velocity ** 2;
    // force of drag = 0.5 * Cd * A * Rho * velocity^2

    // decrements from kinetic energy according to conservation of energy and work done against rolling resistance
    var rollingLoss = (rollingResistance * distanceInterval) / intervals;

    // sums net energy gained
    kineticE += addKE;
    kineticE -= dragLoss;
    kineticE -= rollingLoss;

    velocity = Math.sqrt((2 * kineticE) / totalMass); // calculates current velocity from kinetic energy
    velocityLog.push(velocity); // stores current velocity to sequence

    time += // accumulates time from length of interval and average of initial and final velocity for interval
      (2 * distanceInterval) /
      intervals /
      (velocityLog[i * intervals + j] + velocityLog[i * intervals + j + 1]);
    timeLog.push(time); // stores current time to sequence
  }

  velocityReportLog.push(velocity); // pushes velocity at end of each segment to reported velocity log
  timeReportLog.push(time); // pushes time at end of each segment to reported time log
}

/////////////////////////////////////////////////////////////////////////////////
// Reported Values:
console.log(velocityReportLog); // velocity at each 10% segment of hill
console.log(timeReportLog); // time at each 10% segment of hill
console.log(time); // total time
