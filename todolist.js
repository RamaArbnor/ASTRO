class TodoList {
  
    constructor(name){
        this.y = 100;
        this.list = []
        this.width = 200;
        
        this.height = this.list.length * 50 + 100;
        
        //read from a file and for each row add to list
        this.getTodoList();
        this.x = displayWidth - this.width - 100;
        this.name = name;

    }
    
    show(){
        text(this.name, this.x, this.y - 50, this.width, this.height)
        fill(255, 255, 255, 100)
        rect(this.x, this.y, this.width, this.height)

        for(let i = 0; i < this.list.length; i++){
            fill(0)
            textSize(20);
            text(this.list[i], this.x , this.y + 40 + i * 50, this.width, this.height);
        }


        
    }
    
    update(){
       
    }

    getTodoList(){
        fetch('./todo.txt')
        .then(response => response.text())
        .then(data => {
            // console.log(data)
            this.list = data.split("\n")
            this.height = this.list.length * 50 + 50;
        }
        //handle error
        ).catch(err => {
            // console.log(err)
            this.list = ["Error loading todo list"]
        }
        
        )
    }

    
  }