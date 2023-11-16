// Write your helper functions here!

require('cross-fetch/polyfill');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    // Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById('missionTarget');
    missionTarget.innerHTML= `
    
                 <h2>Mission Destination</h2>
                 <ol>
                     <li>Name: ${name} </li>
                     <li>Diameter:${diameter} </li>
                     <li>Star: ${star}</li>
                     <li>Distance from Earth: ${distance} </li>
                     <li>Number of Moons: ${moons} </li>
                 </ol>
                 <img src=${imageUrl}>
                `
 }
 
 function validateInput(testInput) {
    if (testInput === '' || testInput === 0 || testInput === null){
        return "Empty"; 
    } else if (!isNaN(testInput)){
        return "Is a Number";
    }else {
        return "Not a Number"
    }
    
 }

 
 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {

    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');
    // let launchStatus = document.getElementById('launchStatus');

    let validatePilot = validateInput(pilot);
    let validateCopilot = validateInput(copilot);
    let validatefuelLevel = validateInput(fuelLevel);
    let validatecargoMass = validateInput(cargoLevel);
    let button = document.getElementById('formSubmit');
   
    
   

    // button.addEventListener("click", function(event){
         
    if (validatePilot === `Empty`|| validateCopilot === `Empty`|| 
    fuelLevel === `Empty`||cargoLevel === `Empty`) {
        
        alert("All fields are required");
        return;
         
    }  else if ( validatefuelLevel === 'Not a Number' || validatecargoMass === 'Not a Number') {
       
        alert("Please enter numerical values for Fuel Level and Cargo Mass");
        return;
         
    }  else if (validatePilot ===`Is a Number`|| validateCopilot ===`Is a Number`) {
       
        alert("Please do not enter numbers for name of pilot or co-pilot");
        return;
       
    }  

// });


pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

list.style.visibility = 'hidden';

   if ( fuelLevel < 10000) {
        document.getElementById("fuelStatus").innerHTML = "Fuel level too low for launch";
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible";
    } else {
        document.getElementById("fuelStatus").innerHTML = "Fuel level high enough for launch";
    }
    if (cargoLevel > 10000) {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass too heavy for launch";
        document.getElementById("launchStatus").innerHTML = "Shuttle Not Ready for Launch";
        document.getElementById("launchStatus").style.color = "red";
        list.style.visibility = "visible";
    } else {
        document.getElementById("cargoStatus").innerHTML = "Cargo mass low enough for launch";
    }
    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        document.getElementById("launchStatus").innerHTML = "Shuttle is Ready for Launch";
        document.getElementById("launchStatus").style.color = "green";
        cargoStatus.style.visibility = "hidden";
        fuelStatus.style.visibility = "hidden";
        pilotStatus.style.visibility = "hidden";
        copilotStatus.style.visibility = "hidden";
        list.style.visibility = "visible";

    }

    
 }

 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json()
         });
 
     return planetsReturned;
 }
 
 
 function pickPlanet(planets) {
    let planet = Math.floor(Math.random() * planets.length);
    return planets[planet];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;