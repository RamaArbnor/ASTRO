class Astro{
  
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color = color(133, 255, 251);
    this.r = 10;
    this.hr = 60;
    this.ur = this.r * 8;
    this.vx = 0;
    this.vy = 0;
    this.clicked = false;
    this.text = "WELCOME BACK SIR. SYSTEMS ARE ONLINE !"
    this.targetString = "";
    this.index = 0;
    this.typingSpeed = 100;
    this.moveable = true;
    this.lastClick = 0;
    this.textLife = 200;
    this.greetings = [
      "Good morning, sir.",
      "Hello, how can I assist you today ?",
      "Welcome back. How may I help you ?",
      "Greetings, Arbnor. What's on your agenda ?",
      "Hello there, ready to get things done ?",
      "Salutations! What can I do for you ?",
      "Hey, how can I make your day better ?",
      "Hello, Arbnor. I'm at your service.",
      "Welcome! What would you like me to do ?",
      "Systems online. How can I assist you today ?",
      "Hi there! What can I assist you with ?",
      "Pleasure to see you again. How may I assist ?",
      "Greetings, esteemed user. How may I be of service ?",
      "Hello, Arbnor. I'm here to help. What's up ?",
      "Good day, ready for some productive work ?",
      "Ready to take the world by storm ?",
    ];

    this.todoList = new TodoList();

  }
  
  show(){
    fill(this.color)
    circle(this.x, this.y, this.r)
    this.typeText()
    this.displayText()
    this.todoList.show()

    this.utils();

  }
  
  update(){

    if(this.moveable){
      this.x += this.vx;
      this.y += this.vy;
      this.vx = (mouseX - this.x) * 0.1;
      this.vy = (mouseY - this.y) * 0.1;
      
    }

    if(this.clicked && this.r < 15){
      this.todoList.getTodoList();
      this.pulse()
    }else if(this.r > 10){
      this.clicked = false;
      this.r -= 1;
      this.color = color(133, 255, 251);

    }

    if(this.targetString.length == this.text.length){
      this.textLife -= 1;
    }

    this.todoList.update()


    // && dist(mouseX, mouseY, this.x, this.y) < this.ur * 2
    // if ((keyIsDown(CONTROL)) ) {
    //   this.moveable = false;
    // }else{
    //   this.moveable = true;
    // }
  }


  typeText() {
    if (this.index < this.text.length) {
      if (millis() > this.typingSpeed * this.index) {
      this.targetString += this.text.charAt(this.index); // Add the next letter
      this.index++;
      }
    }
  }

  displayText(){

    if(this.textLife > 0){
      let boundingRect = { x: this.x - 150, y: this.y + 100, width: 300, height: 200 };
      textAlign(CENTER);
      fill(0)
      textSize(20);
      text(this.targetString, boundingRect.x , boundingRect.y, boundingRect.width, boundingRect.height);
    }

  }

  //on click should change color to green and grow
  pulse(){ 
    this.color = color(0, 255, 0);
    this.r += 1;

    this.text = random(this.greetings);
    this.targetString = "";
    this.index = 0;
    this.textLife = 600;
    
  }

  utils(){

    if(!this.moveable){
      //draw a circle around astro with sections like a gta wheel
      //each section has a different function

      //get the angle of the mouse from astro
      let angle = map(atan2(mouseY - this.y, mouseX - this.x), -180, 180, 0, 360) 
      // print(angle)
      // rotate(PI / 2)
      for(let i = 0; i < 360; i += 90){
        noFill()
        if(angle > i && angle < i + 90 && dist(mouseX, mouseY, this.x, this.y) > this.ur * 2 ) 
          stroke(255, 255, 255, 100)
        else{
          stroke(250, 255, 255) 
        }
        strokeWeight(1)
        text("Text", this.ur * cos(i + 45) + this.x, this.ur * sin(i + 45) + this.y) 

        strokeWeight(10)
        arc(this.x, this.y, this.ur, this.ur, i, i + 90)

      }

      //draw a letter on each arc
      

    }
  }
  
}