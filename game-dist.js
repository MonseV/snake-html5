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
      this.width = 10;
      this.height = 10;
    } //dibuja en el canvas


    _createClass(Food, [{
      key: "draw",
      value: function draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);
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
      this.y = y;
      this.width = 10;
      this.height = 10; //cuadrado de atras

      this.back = null;
    }

    _createClass(Square, [{
      key: "draw",
      value: function draw() {
        ctx.fillRect(this.x, this.y, this.width, this.height);

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
    }, {
      key: "hit",
      value: function hit(head) {
        var segundo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        //primer elemento es la cabeza
        if (this == head && !this.hasBack()) return false; //primer elemento y si hay algo atrás

        if (this == head) return this.back.hit(head, true); // si el segundo elemento y no tiene algo atras

        if (segundo && !this.hasBack()) return false; //segundo elemento y si hay algo atrás

        if (segundo) return this.back.hit(head); //No es ni la cabea, ni el segundo

        if (this.hasBack()) {
          return squareHit(this, head) || this.back.hit(head);
        } //No es la cabeza, ni el segundo y es el ultimo


        return squareHit(this, head);
      }
    }, {
      key: "hitBorder",
      value: function hitBorder() {
        return this.x > 490 || this.x < 0 || this.y > 290 || this.y < 0;
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
        if (this.direction === "left") return;
        this.direction = "right";
      } // izquierda

    }, {
      key: "left",
      value: function left() {
        if (this.direction === "right") return;
        this.direction = "left";
      } // arriba

    }, {
      key: "up",
      value: function up() {
        if (this.direction === "down") return;
        this.direction = "up";
      } //abajo

    }, {
      key: "down",
      value: function down() {
        if (this.direction === "up") return;
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
    }, {
      key: "eat",
      value: function eat() {
        this.head.add();
      }
    }, {
      key: "dead",
      value: function dead() {
        // si hay un choque estamos muertos
        //chocar conmigo mismo               //chocar con los bordes
        return this.head.hit(this.head) || this.head.hitBorder();
      }
    }]);

    return Snake;
  }();

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var snake = new Snake(); //arreglo de comidas

  var foods = [];
  window.addEventListener("keydown", function (ev) {
    if (ev.keyCode > 36 && ev.keyCode < 41) ev.preventDefault(); //izquierda

    if (ev.keyCode == 37) return snake.left(); //arriba

    if (ev.keyCode == 38) return snake.up(); //derecha

    if (ev.keyCode == 39) return snake.right(); //abajo

    if (ev.keyCode == 40) return snake.down();
    return false;
  }); // intervalo de tiempo(función anonima,cuanto va a ejecutar la función)

  var animacion = setInterval(function () {
    snake.move(); // limpiamos el canvas(x,y,ancho,alto)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw(); //dibuja toda la comida que se creo

    drawFood();

    if (snake.dead()) {
      console.log("Se acabo");
      window.clearInterval(animacion);
    }
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

      if (typeof food !== "undefined") {
        food.draw(); //si choca la cabeza de vibora con la comida

        if (hit(food, snake.head)) {
          snake.eat(); //elimina la comida que comio la vibora

          removeFromFoods(food);
        }
      }
    }
  }

  function removeFromFoods(food) {
    // itera el arreglo de comida
    foods = foods.filter(function (f) {
      // si retorna verdadero lo sacamos del arreglo
      return food !== f;
    });
  }

  function squareHit(cuadrado_uno, cuadrado_dos) {
    //evalua si la cabeza choca con algun cuadrado
    return cuadrado_uno.x == cuadrado_dos.x && cuadrado_uno.y == cuadrado_dos.y;
  }

  function hit(a, b) {
    var hit = false; //Colsiones horizontales

    if (b.x + b.width >= a.x && b.x < a.x + a.width) {
      //Colisiones verticales
      if (b.y + b.height >= a.y && b.y < a.y + a.height) hit = true;
    } //Colisión de a con b


    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
      if (b.y <= a.y && b.y + b.height >= a.y + a.height) hit = true;
    } //Colisión b con a


    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
      if (a.y <= b.y && a.y + a.height >= b.y + b.height) hit = true;
    }

    return hit;
  }
})();