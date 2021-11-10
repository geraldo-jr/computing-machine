// Program developed by Geraldo A. Pereira Junior as a final project of Programming Fundamentals class of December 2020. Student at CVTC attending the Software Developer associated course. Under the guidance of Eric Wackwitz. 

function main() {
  animationStart();
}

function animationStart() {
  var visualAnimation = false; 
  var calculataingText;
  var counting = 0;

  // To make the animation gif visible
  if (visualAnimation == false) {
    visualAnimation = true;
    document.querySelector('#res').style = "display: inline";
    
    document.querySelector('#showImg').style = "display: inline";
    
    // Cleaning the content for the main area
    document.querySelector('main p').style = "display: none";
    document.querySelector('#calcButton').style = "display: none";
    document.querySelector('#finalRes').style = "display: none";
  }

  // timer to call the calculation and result content after the animation time is fininshed
  calculataingText = setInterval(function(){
    if(counting >= 7){
      clearInterval(calculataingText);
      document.querySelector('figcaption').innerHTML = "Calculating...";
      validatingResults();
    } else if (counting >= 5) {
      document.querySelector('figcaption').innerHTML = "Calculation Finished. Printing results.";
    } else if (counting >= 2){
      document.querySelector('figcaption').innerHTML = "Finishing last details...";
    }
    counting++;
  }, 980)
}

function calculateDistance() {
  var cityTo;
  var destinyOptions;
  var destinyChosen;
  var distance;
  var mapGraphicLocation;
  
  // Fetching and storing the selector information of the city chosed
  destinyOptions = document.querySelector('#toSelector');
  destinyChosen = destinyOptions.value;
  cityTo = destinyOptions.options[destinyOptions.selectedIndex].text;

  // Adding data about distance based on the chosen city of destination
  switch (destinyChosen) {
    case "to1":
      distance = 92.7;
      mapGraphicLocation = "EauclaireToMinneapolis";
      break;
    case "to2":
      distance = 191.3;
      mapGraphicLocation = "EauclaireToLambeauField";
      break;
    case "to3":
      distance = 317; 
      mapGraphicLocation = "EauclaireToChicago";
      break;
    case "to4" :
      distance = 1953.2;
      mapGraphicLocation = "LosAngeles";
      break;
    case "to5":
      distance = 1105.6;
      mapGraphicLocation = "EauclaireToNewYork";
      break;
    case "to6":
      distance = 1671.2;
      mapGraphicLocation = "Miami";
      break;
    }

  return [cityTo, distance, mapGraphicLocation];
}

function calculateTimeTravel() {
  let distance = calculateDistance()[1];
  let timeTravel;

  timeTravel = ((distance/760)*60) + 5;

  return timeTravel;
}

function validatingResults() {
  let destination = calculateDistance();
  let distance = destination[1];
  let cityOfDestination = destination[0];
  let timeTravel = calculateTimeTravel();
  let messageText;

  // Store message based on the distance. If it's a long over 1500 miles distance it stores an negative message. Less than 1500 miles stores a positive message
  if (distance < 1500) {
    messageText = cityOfDestination + " is " + distance + " miles (" + (distance*1.60934).toFixed(0) + " km) away from Eau Claire, WI. The time to travel this distance using a Hyperloop technology would be " + timeTravel.toFixed(2) + " minutes.";
  } else {
    messageText = cityOfDestination + " is " + distance + " miles (" + (distance*1.60934).toFixed(0) + " km) is too far apart. Hyperloop transportation technology isn't worth traveling this distance. \n\n <h2>Please, go by bike!</h2>";
  }

  displayingResults(messageText, cityOfDestination);
}

function displayingResults(messageText, cityOfDestination) {
  let textResult = document.querySelector('#textResult');
  let mapResult = document.querySelector('#mapResult');
  let createImg = document.createElement('img');
  let map = calculateDistance()[2];

  // Cleaning up to display results content
  document.querySelector('#finalRes').style = "display: inline";
  document.querySelector('#showImg').style = "display: none";
  document.querySelector('#calcButton').style = "display: inline";
  mapResult.innerHTML = "";

  // Display valid distance message in the #res div 
  textResult.innerHTML = messageText;

  // Creating map image on the page
  createImg.src = `images/maps_images/${map}.png`;
  createImg.alt = `graphic map of distance between Eau Claire, WI to ${cityOfDestination}.`;
  mapResult.appendChild(createImg);
}
