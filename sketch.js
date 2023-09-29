let nodes = [];
let astro;
let enableOptions;

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

  enableOptions = true;

  if(enableOptions){
    let button = createButton('Get Weather');
    let button2 = createButton('Get Events');
    let button3 = createButton('Get Todo List');
    let button4 = createButton('Get News');
    let button5 = createButton('Get Time');
    button.position(displayWidth - 5 * 150, displayHeight - 100);
    button2.position(displayWidth - 4 * 150, displayHeight - 100);
    button3.position(displayWidth - 3 * 150, displayHeight - 100);
    button4.position(displayWidth - 2 * 150, displayHeight - 100);
    button5.position(displayWidth - 1 * 150, displayHeight - 100);

    button.addClass('button');
    button2.addClass('button');
    button3.addClass('button');
    button4.addClass('button');
    button5.addClass('button');
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



  
}

function mouseClicked(){
  astro.clicked = true;
  // astro.lastClick = millis();
  // //check if mouse is double clicked
  // if (mouseClicked && millis() - astro.lastClick < 500) {
  //   doubleClicked();
  //   print("double clicked")
  // }

  // astro.clickCount++;

  // setTimeout(function() {
  //   if (astro.clickCount === 2) {
  //     // Double click action
  //     console.log('Double click detected!');
  //   }
  //   astro.clickCount = 0; // Reset the click count after the delay
  // }, 200);

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

function getEvents(){
  // api = AIzaSyBU0uZb4K3IXSm6SQGqicG8HgkIaW7Rl7g
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: '', // Your API key or OAuth 2.0 credentials
      clientId: '',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
      scope: 'https://www.googleapis.com/auth/calendar.readonly',
    }).then(() => {
      // Check if the user is already signed in, or sign them in.
      if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
        gapi.auth2.getAuthInstance().signIn();
      }
      
      // Get today's date in ISO format (e.g., "2023-09-20").
      const today = new Date().toISOString().split('T')[0];
  
      // Fetch events for today.
      gapi.client.calendar.events.list({
        calendarId: 'primary', // 'primary' represents the user's primary calendar
        timeMin: today + 'T00:00:00Z',
        timeMax: today + 'T23:59:59Z',
        singleEvents: true,
        orderBy: 'startTime',
      }).then((response) => {
        const events = response.result.items;
        if (events.length > 0) {
          console.log('Events for today:');
          events.forEach((event) => {
            console.log(`${event.summary} - ${event.start.dateTime}`);
          });
        } else {
          console.log('No events for today.');
        }
      });
    });
  });
  
}