"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* console.log('Hola mundo'); */
;

(function () {
  var Random = /*#__PURE__*/function () {
    function Random() {
      _classCallCheck(this, Random);
    }

    _createClass(Random, null, [{
      key: "get",
      value: //metodo estatico que se manda desde la clase
      function get(inicio, final) {
        return Math.floor(Math.random() * final) + inicio;
      }
    }]);

    return Random;
  }();

  var Food = /*#__PURE__*/function () {
    function Food(x, y) {
      _classCallCheck(this, Food);

      this.x = x;
      this.y = y;
    } //dibuja en el canvas


    _createClass(Food, [{
      key: "draw",
      value: function draw() {
        ctx.fillRect(this.x, this.y, 10, 10);
      }
    }], [{
      key: "generate",
      value: function generate() {
        return new Food(Random.get(0, 500), Random.get(0, 300));
      }
    }]);

    return Food;
  }();

  var Square = /*#__PURE__*/function () {
    function Square(x, y) {
      _classCallCheck(this, Square);

      this.x = x;
      this.y = y; //cuadrado de atras

      this.back = null;
    }

    _createClass(Square, [{
      key: "draw",
      value: function draw() {
        ctx.fillRect(this.x, this.y, 10, 10);

        if (this.hasBack()) {
          this.back.draw();
        }
      }
    }, {
      key: "add",
      value: function add() {
        // el ultimo cuadrado agrega otro cuadrado
        if (this.hasBack()) return this.back.add(); // si no, crea un cuadrado

        this.back = new Square(this.x, this.y);
      } // devuelve true si tiene un cuadrado atras y false si no

    }, {
      key: "hasBack",
      value: function hasBack() {
        return this.back != null;
      }
    }, {
      key: "copy",
      value: function copy() {
        if (this.hasBack()) {
          this.back.copy();
          this.back.x = this.x;
          this.back.y = this.y;
        }
      } // derecha

    }, {
      key: "right",
      value: function right() {
        //el de atrás copia la dirección, es decir, sigue al de adelante
        this.copy();
        this.x += 10;
      } // izquierda

    }, {
      key: "left",
      value: function left() {
        this.copy();
        this.x -= 10;
      } // arriba

    }, {
      key: "up",
      value: function up() {
        this.copy();
        this.y -= 10;
      } //abajo

    }, {
      key: "down",
      value: function down() {
        this.copy();
        this.y += 10;
      }
    }]);

    return Square;
  }();

  var Snake = /*#__PURE__*/function () {
    function Snake() {
      _classCallCheck(this, Snake);

      /* this.draw() */
      this.head = new Square(100, 0);
      this.draw();
      this.direction = "right";
      this.head.add();
      this.head.add();
      this.head.add();
      this.head.add();
      this.head.add();
      this.head.add();
    }

    _createClass(Snake, [{
      key: "draw",
      value: function draw() {
        /* ctx.fillRect(20,20,10,10) */
        this.head.draw();
      } // derecha

    }, {
      key: "right",
      value: function right() {
        this.direction = "right";
      } // izquierda

    }, {
      key: "left",
      value: function left() {
        this.direction = "left";
      } // arriba

    }, {
      key: "up",
      value: function up() {
        this.direction = "up";
      } //abajo

    }, {
      key: "down",
      value: function down() {
        this.direction = "down";
      }
    }, {
      key: "move",
      value: function move() {
        if (this.direction == "up") return this.head.up();
        if (this.direction == "down") return this.head.down();
        if (this.direction == "left") return this.head.left();
        if (this.direction == "right") return this.head.right();
      }
    }]);

    return Snake;
  }();

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var snake = new Snake(); //arreglo de comidas

  var foods = [];
  window.addEventListener("keydown", function (ev) {
    //eliminamos los comportamientos default de la ventana
    ev.preventDefault(); //izquierda

    if (ev.keyCode == 37) return snake.left(); //arriba

    if (ev.keyCode == 38) return snake.up(); //derecha

    if (ev.keyCode == 39) return snake.right(); //abajo

    if (ev.keyCode == 40) return snake.down();
    return false;
  }); // intervalo de tiempo(función anonima,cuanto va a ejecutar la función)

  setInterval(function () {
    snake.move(); // limpiamos el canvas(x,y,ancho,alto)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw(); //dibuja toda la comida que se creo

    drawFood();
  }, 1000 / 5); // ejecuta cada cierto tiempo

  setInterval(function () {
    var food = Food.generate(); // agrega al arreglo las comidas que se generaron

    foods.push(food); //ejecuta una sola vez pero cada cierto tiempo

    setTimeout(function () {
      // Elimina la comida
      removeFromFoods(food);
    }, 10000);
  }, 4000);

  function drawFood() {
    for (var index in foods) {
      var food = foods[index];
      food.draw();
    }
  }

  function removeFromFoods(food) {
    // itera el arreglo de comida
    foods = foods.filter(function (f) {
      // si retorna verdadero lo sacamos del arreglo
      return food !== f;
    });
  }
})();