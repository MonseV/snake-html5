/* console.log('Hola mundo'); */

; (function () {

  class Square {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    draw() {
      ctx.fillRect(this.x, this.y, 10, 10);
    }
  }

  class Snake {
    constructor() {
      /* this.draw() */
      this.head = new Square(100, 0);
      this.draw()
      this.direction = "right"
    }

    draw() {
      /* ctx.fillRect(20,20,10,10) */
      this.head.draw();
    }

    // derecha
    right() {
      this.direction = "right"
    }

    // izquierda
    left() {
      this.direction = "left"
    }

    // arriba
    up() {
      this.direction = "up"
    }

    //abajo
    down() {
      this.direction = "down"
    }

    move() {
      if (this.direction == "up") return this.head.y -= 10
      if (this.direction == "down") return this.head.y += 10
      if (this.direction == "left") return this.head.x -= 10
      if (this.direction == "right") return this.head.x += 10

    }


  }

  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')


  const snake = new Snake()

  window.addEventListener("keydown", function (ev) {
    /* console.log("Alguien presiono una tecla"); */
    console.log(ev.keyCode)

    //izquierda
    if (ev.keyCode == 37) return snake.left();

    //arriba
    if (ev.keyCode == 38) return snake.up();

    //derecha
    if (ev.keyCode == 39) return snake.right();

    //abajo
    if (ev.keyCode == 40) return snake.down();
  })

  // intervalo de tiempo(función anonima,cuanto va a ejecutar la función)
  setInterval(function () {
    snake.move()
    // limpiamos el canvas(x,y,ancho,alto)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snake.draw()
  }, 1000 / 5)

})()