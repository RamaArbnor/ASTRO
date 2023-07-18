class Node {
  
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.color;
    this.length = random(20, 100)
    this.cpd = [random(50, 200), random(50, 200), random(50, 200), random(50, 200)]
    this.angle = 0;
  }
  
  show(){
    strokeWeight(3)
    stroke(this.color)
    point(this.x, this.y);
  }
  
  update(){
    let cpx = 1
    let cpy = 1
    
    this.angle++
    
    if(this.x < astro.x)
      cpx = -1
    if(this.y > astro.y)
      cpy = -1
    

    
    
    if(dist(this.x, this.y, astro.x, astro.y) <= this.length){
      this.color = color(66, 215, 245)
      strokeWeight(1)
      noFill()
      // line(this.x, this.y, astro.x, astro.y)
      curve(
            this.x + this.cpd[0] * cpx, this.y + this.cpd[0] * cpy, 
            this.x, this.y, 
            astro.x, astro.y, 
            astro.x + this.cpd[0] * cpx , astro.y + this.cpd[0] * cpy
      )
      
        }else {
      this.color = color(156, 248, 255, 100)
      
    }
  }
  
}