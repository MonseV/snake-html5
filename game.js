/* console.log('Hola mundo'); */

;(function(){

  class Square{
    constructor(x,y){
      this.x = x
      this.y = y
    }

    draw(){
      ctx.fillRect(this.x,this.y,10,10);
    }
  }

  class Snake{
    constructor(){
      /* this.draw() */
      this.head = new Square(100,0);
      this.draw()
    }

    draw(){
      /* ctx.fillRect(20,20,10,10) */
      this.head.draw();
    }

    // derecha
    right(){
      this.head.x += 10
    }

    // izquierda
    left(){
      this.head.y -= 10
    }

    // arriba
    up(){
      this.head.y -=10
    }

    //abajo
    down(){
      this.head.x += 10
    }

  }

  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')


  const snake = new Snake()

  // intervalo de tiempo(función anonima,cuanto va a ejecutar la función)
  setInterval(function(){
    snake.right()
    // limpiamos el canvas(x,y,ancho,alto)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    snake.draw()
  },1000 / 5)

})()