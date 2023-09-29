class Calendar {
  
    constructor(x, y, name){
        this.list = []
        this.width = 200;
        this.x = x
        this.y = y;

        
        //read from a file and for each row add to list
        this.getList();
        this.name = name;
        this.height = this.list.length * 50 + 50;

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

    getList(){
        this.list = ["Event 1", "Event 2", "Event 3"]
    }


    // getTodoList(){
    //     fetch('./todo.txt')
    //     .then(response => response.text())
    //     .then(data => {
    //         // console.log(data)
    //         this.list = data.split("\n")
    //         this.height = this.list.length * 50 + 50;
    //     }
    //     //handle error
    //     ).catch(err => {
    //         // console.log(err)
    //         this.list = ["Error loading todo list"]
    //     }
        
    //     )
    // }

    
  }