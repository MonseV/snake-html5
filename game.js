/* console.log('Hola mundo'); */

; (function () {

  class Random {
    //metodo estatico que se manda desde la clase
    static get(inicio, final) {
      return Math.floor(Math.random() * final) + inicio;
    }
  }

  class Food {
    constructor(x, y) {
      this.x = x
      this.y = y
    }

    //dibuja en el canvas
    draw() {
      ctx.fillRect(this.x, this.y, 10, 10)
    }

    static generate() {
      return new Food(Random.get(0, 500), Random.get(0, 300));
    }
  }

  class Square {
    constructor(x, y) {
      this.x = x
      this.y = y
      //cuadrado de atras
      this.back = null
    }

    draw() {
      ctx.fillRect(this.x, this.y, 10, 10);
      if (this.hasBack()) {
        this.back.draw()
      }
    }

    add() {
      // el ultimo cuadrado agrega otro cuadrado
      if (this.hasBack()) return this.back.add()

      // si no, crea un cuadrado
      this.back = new Square(this.x, this.y)
    }

    // devuelve true si tiene un cuadrado atras y false si no
    hasBack() {
      return this.back != null
    }

    copy() {
      if (this.hasBack()) {
        this.back.copy()
        this.back.x = this.x
        this.back.y = this.y
      }
    }

    // derecha
    right() {
      //el de atrás copia la dirección, es decir, sigue al de adelante
      this.copy()
      this.x += 10
    }

    // izquierda
    left() {
      this.copy()
      this.x -= 10
    }

    // arriba
    up() {
      this.copy()
      this.y -= 10
    }

    //abajo
    down() {
      this.copy()
      this.y += 10
    }
  }

  class Snake {
    constructor() {
      /* this.draw() */
      this.head = new Square(100, 0);
      this.draw()
      this.direction = "right"
      this.head.add()
      this.head.add()
      this.head.add()
      this.head.add()
      this.head.add()
      this.head.add()
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
      if (this.direction == "up") return this.head.up()
      if (this.direction == "down") return this.head.down()
      if (this.direction == "left") return this.head.left()
      if (this.direction == "right") return this.head.right()

    }


  }

  const canvas = document.getElementById('canvas')
  const ctx = canvas.getContext('2d')


  const snake = new Snake()
  //arreglo de comidas
  let foods = [];

  window.addEventListener("keydown", function (ev) {
    //eliminamos los comportamientos default de la ventana
    ev.preventDefault()

    //izquierda
    if (ev.keyCode == 37) return snake.left();

    //arriba
    if (ev.keyCode == 38) return snake.up();

    //derecha
    if (ev.keyCode == 39) return snake.right();

    //abajo
    if (ev.keyCode == 40) return snake.down();

    return false
  })

  // intervalo de tiempo(función anonima,cuanto va a ejecutar la función)
  setInterval(function () {
    snake.move()
    // limpiamos el canvas(x,y,ancho,alto)
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    snake.draw()
    //dibuja toda la comida que se creo
    drawFood()
  }, 1000 / 5)

  // ejecuta cada cierto tiempo
  setInterval(function () {
    const food = Food.generate()
    // agrega al arreglo las comidas que se generaron
    foods.push(food)

    //ejecuta una sola vez pero cada cierto tiempo
    setTimeout(function () {
      // Elimina la comida
      removeFromFoods(food)
    }, 10000)

  }, 4000)

  function drawFood() {
    for (const index in foods) {
      const food = foods[index]
      food.draw()
    }
  }

  function removeFromFoods(food) {
    // itera el arreglo de comida
    foods = foods.filter(function (f) {
      // si retorna verdadero lo sacamos del arreglo
      return food !== f
    })
  }

})()