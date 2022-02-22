"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

/* console.log('Hola mundo'); */
;

(function () {
  var Square = /*#__PURE__*/function () {
    function Square(x, y) {
      _classCallCheck(this, Square);

      this.x = x;
      this.y = y;
    }

    _createClass(Square, [{
      key: "draw",
      value: function draw() {
        ctx.fillRect(this.x, this.y, 10, 10);
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
        this.head.x += 10;
      } // izquierda

    }, {
      key: "left",
      value: function left() {
        this.head.y -= 10;
      } // arriba

    }, {
      key: "up",
      value: function up() {
        this.head.y -= 10;
      } //abajo

    }, {
      key: "down",
      value: function down() {
        this.head.x += 10;
      }
    }]);

    return Snake;
  }();

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
  var snake = new Snake(); // intervalo de tiempo(función anonima,cuanto va a ejecutar la función)

  setInterval(function () {
    snake.right(); // limpiamos el canvas(x,y,ancho,alto)

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.draw();
  }, 1000 / 5);
})();