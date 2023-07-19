let nodes = [];
let astro;

function setup() {
  angleMode(DEGREES);
  createCanvas(displayWidth, displayHeight);
  speech = new p5.Speech(voiceReady); //callback, speech synthesis object
  // speech.onLOad = voiceReady;
  speech.started(startSpeaking);
  // speech.ended(endSpeaking);
  // noCursor();
  astro = new Astro(width/2, height/2)
  // getWeather();
  for(let i = 0; i < 300; i++){
    nodes.push(new Node(random(width), random(height)))
  }
  
  function startSpeaking() {
    background(0,255,0, 50);
  }
  
  function voiceReady() {
    // console.log(speech.voices);
  }




}

function draw() {
  background(51);

  astro.update()
  astro.show()
  

  for(let i = 0; i < nodes.length; i++){
    nodes[i].update();
    nodes[i].show();

  }
  
  // print(sin(nodes[0].angle) * 10)
  
  // noLoop()
  
}

function mouseClicked(){
  astro.clicked = true;
  astro.lastClick = millis();
  //check if mouse is double clicked
  if (mouseClicked && millis() - astro.lastClick < 500) {
    doubleClicked();
    print("double clicked")
  }

}

function getWeather(){
  fetch('http://api.weatherapi.com/v1/current.json?key=a9d28bcbad244885ac5123042231707&q=Mitrovice&aqi=no')
  .then(response => response.json())
  .then(data => {
    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let dt = new Date();
    // console.log()

    astro.text += "\nToday is : " + weekdays[dt.getDay()] + ". \nThe weather is : " + data.current.condition.text + ". \nTemperature : " + data.current.temp_c + "°C" 
    + ".\n You have " + astro.todoList.list.length + " things to do today."
    speech.setVoice("Google UK English Male");
    speech.speak(astro.text); // say something
  }
  );
}


function doubleClicked(){
  astro.moveable = !astro.moveable;
}

// async function getWeather() {
//   const response = await fetch('http://api.weatherapi.com/v1/current.json?key=a9d28bcbad244885ac5123042231707&q=Mitrovice&aqi=no');
//   const data = await response.json();

//   const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
//   let dt = new Date();

//   astro.text += "\nToday is: " + weekdays[dt.getDay()] + ".\nWeather: " + data.current.condition.text + ".\nTemperature: " + data.current.temp_c + "°C" + ".\nYou have " + astro.todoList.list.length + " things to do today.";

//   speech.onLoad = () => {
//     speech.setVoice("Google UK English Male");
//     setTimeout(() => {
//       speech.speak(astro.text);
//     }, 1000); // Adjust the delay as needed
//   };
// }