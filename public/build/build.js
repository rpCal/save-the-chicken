/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/app.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-loader */ "./src/image-loader.ts");
/* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./keyboard */ "./src/keyboard.ts");
/* harmony import */ var _engine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./engine */ "./src/engine.ts");
/* harmony import */ var _game_game__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./game/game */ "./src/game/game.ts");




window.addEventListener("load", function () {
    window.addEventListener("keydown", function (button) { return _keyboard__WEBPACK_IMPORTED_MODULE_1__["default"].setPressed(button.keyCode); }, false);
    window.addEventListener("keyup", function (button) { return _keyboard__WEBPACK_IMPORTED_MODULE_1__["default"].setReleased(button.keyCode); }, false);
    var canvas = document.getElementById("canvas");
    var context2D = canvas.getContext("2d");
    var G = new _engine__WEBPACK_IMPORTED_MODULE_2__["default"](context2D);
    _image_loader__WEBPACK_IMPORTED_MODULE_0__["default"].load().then(function () {
        context2D.scale(2, 2);
        context2D.imageSmoothingEnabled = false;
        var game = new _game_game__WEBPACK_IMPORTED_MODULE_3__["default"](canvas.width, canvas.height);
        G.start(game);
    }).catch(function (error) {
        console.error("Assets load error!", error);
    });
}, false);


/***/ }),

/***/ "./src/engine.ts":
/*!***********************!*\
  !*** ./src/engine.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Engine = (function () {
    function Engine(context2D) {
        this.acumulator = 0;
        this.lastTime = 0;
        this.context2D = context2D;
        this.game = null;
    }
    Engine.prototype.start = function (game) {
        this.game = game;
        this.lastTime = Engine.getTime();
        window.requestAnimationFrame(this.loop.bind(this));
    };
    Engine.prototype.loop = function () {
        this.tick();
        window.requestAnimationFrame(this.loop.bind(this));
    };
    Engine.prototype.tick = function () {
        var FRAME_TIME = Engine.FRAME_TIME;
        var time = Engine.getTime();
        var delta = time - this.lastTime;
        if (delta > 1000) {
            delta = FRAME_TIME;
        }
        this.acumulator += delta;
        while (this.acumulator >= FRAME_TIME) {
            this.update(FRAME_TIME);
            this.acumulator -= FRAME_TIME;
        }
        var interpolation = this.acumulator / FRAME_TIME;
        this.draw(this.context2D, interpolation);
        this.lastTime = time;
    };
    Engine.prototype.update = function (delta) {
        if (this.game) {
            this.game.update(delta);
        }
    };
    Engine.prototype.draw = function (context2D, interpolation) {
        if (this.game) {
            this.game.draw(context2D, interpolation);
        }
    };
    Engine.getTime = function () {
        return window.performance.now();
    };
    Engine.UPS = 60;
    Engine.FRAME_TIME = 1000 / Engine.UPS;
    return Engine;
}());
/* harmony default export */ __webpack_exports__["default"] = (Engine);


/***/ }),

/***/ "./src/game/base-object.ts":
/*!*********************************!*\
  !*** ./src/game/base-object.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var BaseObject = (function () {
    function BaseObject(x, y, width, height) {
        this.collisionBounds = null;
        this.canvasHeight = 600;
        this.canvasWidth = 600;
        this.id = undefined;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isRecycled = false;
    }
    BaseObject.prototype.getId = function () {
        return this.id;
    };
    BaseObject.prototype.setId = function (id) {
        this.id = id;
    };
    BaseObject.prototype.isCollided = function (object) {
        if (this.collisionBounds) {
            var cb = object.getCollistionBounds();
            if (cb) {
                return !(this.x + this.collisionBounds.right <= object.getX() + cb.left ||
                    this.x + this.collisionBounds.left >= object.getX() + cb.right ||
                    this.y + this.collisionBounds.botttom <= object.getY() + cb.top ||
                    this.y + this.collisionBounds.top >= object.getY() + cb.botttom);
            }
            else {
                return !(this.x + this.collisionBounds.right <= object.getX() ||
                    this.x + this.collisionBounds.left >= object.getX() + object.getWidth() ||
                    this.y + this.collisionBounds.botttom <= object.getY() ||
                    this.y + this.collisionBounds.top >= object.getY() + object.getHeight());
            }
        }
        else {
            var cb = object.getCollistionBounds();
            if (cb) {
                return !(this.x + this.width <= object.getX() + cb.left ||
                    this.x >= object.getX() + cb.right ||
                    this.y + this.height <= object.getY() + cb.top ||
                    this.y >= object.getY() + cb.botttom);
            }
            else {
                return !(this.x + this.width <= object.getX() ||
                    this.x >= object.getX() + object.getWidth() ||
                    this.y + this.height <= object.getY() ||
                    this.y >= object.getY() + object.getHeight());
            }
        }
    };
    BaseObject.prototype.onCollided = function (object) {
    };
    BaseObject.prototype.recycle = function () {
        this.isRecycled = true;
    };
    BaseObject.prototype.shouldBeRecycled = function () {
        return this.isRecycled;
    };
    BaseObject.prototype.getX = function () {
        return this.x;
    };
    BaseObject.prototype.getY = function () {
        return this.y;
    };
    BaseObject.prototype.getWidth = function () {
        return this.width;
    };
    BaseObject.prototype.getHeight = function () {
        return this.height;
    };
    BaseObject.prototype.getCollistionBounds = function () {
        return this.collisionBounds;
    };
    BaseObject.prototype.drawDebugLines = function (context2D) {
        var cb = this.collisionBounds;
        if (cb) {
            context2D.save();
            context2D.strokeStyle = "red";
            context2D.strokeRect(this.x + cb.left, this.y + cb.top, cb.width(), cb.height());
            context2D.strokeStyle = "green";
            context2D.strokeRect(this.x, this.y, this.width, this.height);
            context2D.restore();
        }
    };
    return BaseObject;
}());
/* harmony default export */ __webpack_exports__["default"] = (BaseObject);


/***/ }),

/***/ "./src/game/car.ts":
/*!*************************!*\
  !*** ./src/game/car.ts ***!
  \*************************/
/*! exports provided: Car */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Car", function() { return Car; });
/* harmony import */ var _base_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-object */ "./src/game/base-object.ts");
/* harmony import */ var _image_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../image-loader */ "./src/image-loader.ts");
/* harmony import */ var _move_direction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./move-direction */ "./src/game/move-direction.ts");
/* harmony import */ var _math_bounds__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./math/bounds */ "./src/game/math/bounds.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();




var Car = (function (_super) {
    __extends(Car, _super);
    function Car(x, y, speed, type, direction) {
        if (type === void 0) { type = 0; }
        if (direction === void 0) { direction = _move_direction__WEBPACK_IMPORTED_MODULE_2__["MoveDirection"].LEFT; }
        var _this = _super.call(this, x, y, 48, 32) || this;
        _this.direction = _move_direction__WEBPACK_IMPORTED_MODULE_2__["MoveDirection"].LEFT;
        _this.speed = 1;
        _this.direction = direction;
        _this.speed = speed;
        _this.images = [];
        if (type == 1) {
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-left-1"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-left-2"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-left-3"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-left-4"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-left-5"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-left-6"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-right-1"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-right-2"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-right-3"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-right-4"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-right-5"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-gray-right-6"));
        }
        else if (type == 2) {
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-left-1"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-left-2"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-left-3"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-left-4"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-left-5"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-left-6"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-right-1"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-right-2"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-right-3"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-right-4"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-right-5"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-orange-right-6"));
        }
        else {
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-left-1"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-left-2"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-left-3"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-left-4"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-left-5"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-left-6"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-right-1"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-right-2"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-right-3"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-right-4"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-right-5"));
            _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite("car-green-right-6"));
        }
        _this.collisionBounds = new _math_bounds__WEBPACK_IMPORTED_MODULE_3__["default"](_this.getWidth() * 0.15, _this.getHeight() * 0.45, _this.getWidth() * 0.85, _this.getHeight());
        return _this;
    }
    Car.prototype.setX = function (x) {
        this.x = x;
    };
    Car.prototype.setY = function (y) {
        this.y = y;
    };
    Car.prototype.update = function (game, delta) {
        this.x += this.speed * delta * (this.direction == _move_direction__WEBPACK_IMPORTED_MODULE_2__["MoveDirection"].LEFT ? -1 : 1);
    };
    Car.prototype.draw = function (context2D) {
        var off = this.direction == _move_direction__WEBPACK_IMPORTED_MODULE_2__["MoveDirection"].LEFT ? 0 : 6;
        for (var y = 0; y < 2; y++) {
            for (var x = 0; x < 3; x++) {
                var sprite = this.images[off + y * 3 + x];
                if (sprite) {
                    context2D.drawImage(sprite.getImage(), sprite.getX(), sprite.getY(), sprite.getWidht(), sprite.getHeight(), this.x + x * 16, this.y + y * 16, 16, 16);
                }
            }
        }
    };
    Car.prototype.isCollided = function (object) {
        return !(object instanceof Car) && _super.prototype.isCollided.call(this, object);
    };
    Car.prototype.onCollided = function (object) {
    };
    return Car;
}(_base_object__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/game/chicken.ts":
/*!*****************************!*\
  !*** ./src/game/chicken.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-object */ "./src/game/base-object.ts");
/* harmony import */ var _keyboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../keyboard */ "./src/keyboard.ts");
/* harmony import */ var _image_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../image-loader */ "./src/image-loader.ts");
/* harmony import */ var _move_direction__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./move-direction */ "./src/game/move-direction.ts");
/* harmony import */ var _math_bounds__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./math/bounds */ "./src/game/math/bounds.ts");
/* harmony import */ var _math_vector2d__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./math/vector2d */ "./src/game/math/vector2d.ts");
/* harmony import */ var _car__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./car */ "./src/game/car.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();







var Chicken = (function (_super) {
    __extends(Chicken, _super);
    function Chicken(x, y) {
        var _this = _super.call(this, x, y, 32, 32) || this;
        _this.animaitonCounter = 0;
        _this.singleFrameDuration = 0;
        _this.animationFrames = [1, 2, 1, 0];
        _this.pressed = false;
        _this.isInFinalPosition = false;
        _this.winCount = 0;
        _this.lostCount = 0;
        _this.setId("Chicken");
        _this.isExitFound = false;
        _this.isDead = false;
        _this.startX = x;
        _this.startY = y;
        _this.images = [];
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-top-1"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-top-2"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-top-3"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-right-1"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-right-2"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-right-3"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-bottom-1"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-bottom-2"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-bottom-3"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-left-1"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-left-2"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("chicken-left-3"));
        _this.images.push(_image_loader__WEBPACK_IMPORTED_MODULE_2__["default"].getSprite("feathers"));
        _this.direction = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].BOTTOM;
        _this.speed = 0.2;
        _this.isMoving = false;
        _this.cb1 = new _math_bounds__WEBPACK_IMPORTED_MODULE_4__["default"](_this.getWidth() * 0.25, _this.getHeight() * 0.2, _this.getWidth() * 0.75, +_this.getHeight() * 0.8);
        _this.cb2 = new _math_bounds__WEBPACK_IMPORTED_MODULE_4__["default"](_this.getWidth() * 0.25, _this.getHeight() * 0.5, _this.getWidth() * 0.75, +_this.getHeight());
        _this.collisionForce = new _math_vector2d__WEBPACK_IMPORTED_MODULE_5__["default"]();
        return _this;
    }
    Chicken.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Chicken.prototype.update = function (game, delta) {
        var LEFT = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].LEFT, TOP = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].TOP, RIGHT = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].RIGHT, BOTTOM = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].BOTTOM;
        var isPressed = _keyboard__WEBPACK_IMPORTED_MODULE_1__["default"].isPressed, SPACE = _keyboard__WEBPACK_IMPORTED_MODULE_1__["default"].SPACE, ARROW_LEFT = _keyboard__WEBPACK_IMPORTED_MODULE_1__["default"].ARROW_LEFT, ARROW_RIGHT = _keyboard__WEBPACK_IMPORTED_MODULE_1__["default"].ARROW_RIGHT, ARROW_UP = _keyboard__WEBPACK_IMPORTED_MODULE_1__["default"].ARROW_UP, ARROW_DOWN = _keyboard__WEBPACK_IMPORTED_MODULE_1__["default"].ARROW_DOWN;
        if (this.isDead) {
            if (isPressed(SPACE)) {
                this.x = this.startX;
                this.y = this.startY;
                this.isDead = false;
            }
            return;
        }
        if (this.isInFinalPosition) {
            if (isPressed(SPACE)) {
                this.x = this.startX;
                this.y = this.startY;
                this.isInFinalPosition = false;
            }
        }
        var moveDir = new _math_vector2d__WEBPACK_IMPORTED_MODULE_5__["default"]();
        this.isMoving = false;
        var tempDirection = this.direction;
        if (isPressed(ARROW_LEFT)) {
            moveDir.x -= this.speed;
            this.direction = LEFT;
            this.isMoving = true;
        }
        else if (isPressed(ARROW_RIGHT)) {
            moveDir.x += this.speed;
            this.direction = RIGHT;
            this.isMoving = true;
        }
        if (isPressed(ARROW_UP)) {
            moveDir.y -= this.speed;
            this.direction = TOP;
            this.isMoving = true;
        }
        else if (isPressed(ARROW_DOWN)) {
            moveDir.y += this.speed;
            this.direction = BOTTOM;
            this.isMoving = true;
        }
        this.x += moveDir.x * this.speed * delta;
        this.y += moveDir.y * this.speed * delta;
        if (this.y < 130) {
            if (this.isInFinalPosition == false) {
                this.winCount = this.winCount + 1;
            }
            this.isInFinalPosition = true;
        }
        this.singleFrameDuration = 20 / this.speed;
        if (!this.isMoving) {
            this.animaitonCounter = 0;
        }
        else {
            this.animaitonCounter += delta;
            if (this.animaitonCounter > this.singleFrameDuration * this.animationFrames.length) {
                this.animaitonCounter = 0;
            }
        }
        if (this.direction != tempDirection) {
            this.animaitonCounter = 0;
        }
        if (this.direction == _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].LEFT || this.direction == _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].RIGHT) {
            this.collisionBounds = this.cb2;
        }
        else {
            this.collisionBounds = this.cb1;
        }
    };
    Chicken.prototype.draw = function (context2D) {
        if (this.isDead) {
            var sprite = this.images[12];
            if (sprite) {
                context2D.drawImage(sprite.getImage(), sprite.getX(), sprite.getY(), sprite.getWidht(), sprite.getHeight(), this.x, this.y, this.width, this.height);
            }
        }
        else {
            var index = this.animationFrames[Math.floor(this.animaitonCounter / this.singleFrameDuration)];
            var sprite = void 0;
            var LEFT = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].LEFT, TOP = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].TOP, RIGHT = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].RIGHT, BOTTOM = _move_direction__WEBPACK_IMPORTED_MODULE_3__["MoveDirection"].BOTTOM;
            switch (this.direction) {
                case LEFT:
                    sprite = this.images[index + 9];
                    break;
                case RIGHT:
                    sprite = this.images[index + 3];
                    break;
                case TOP:
                    sprite = this.images[index + 0];
                    break;
                case BOTTOM:
                    sprite = this.images[index + 6];
                    break;
            }
            if (sprite) {
                context2D.drawImage(sprite.getImage(), sprite.getX(), sprite.getY(), sprite.getWidht(), sprite.getHeight(), this.x, this.y, this.width, this.height);
            }
        }
    };
    Chicken.prototype.onCollided = function (object) {
        if (object instanceof _car__WEBPACK_IMPORTED_MODULE_6__["Car"]) {
            if (this.isDead == false) {
                this.lostCount = this.lostCount + 1;
            }
            this.isDead = true;
        }
    };
    Chicken.prototype.getIsDead = function () {
        return this.isDead;
    };
    Chicken.prototype.getIsInFinalPosition = function () {
        return this.isInFinalPosition;
    };
    return Chicken;
}(_base_object__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Chicken);


/***/ }),

/***/ "./src/game/game.ts":
/*!**************************!*\
  !*** ./src/game/game.ts ***!
  \**************************/
/*! exports provided: default, canvasSize, Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "canvasSize", function() { return canvasSize; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _chicken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./chicken */ "./src/game/chicken.ts");
/* harmony import */ var _map__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./map */ "./src/game/map.ts");
/* harmony import */ var _move_direction__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./move-direction */ "./src/game/move-direction.ts");
/* harmony import */ var _traffic_lane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./traffic_lane */ "./src/game/traffic_lane.ts");
/* harmony import */ var _info_dialog__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./info-dialog */ "./src/game/info-dialog.ts");





var canvasSize = {
    'canvasWidth': 400,
    'canvasHeight': 600,
};
var Game = (function () {
    function Game(canvasWidth, canvasHeight) {
        canvasSize.canvasWidth = canvasWidth / 2;
        canvasSize.canvasHeight = canvasHeight / 2;
        this.objects = [];
        this.addObject(new _map__WEBPACK_IMPORTED_MODULE_1__["default"](25, 19));
        var chicken = new _chicken__WEBPACK_IMPORTED_MODULE_0__["default"](184, 288);
        this.addObject(chicken);
        var lane1 = new _traffic_lane__WEBPACK_IMPORTED_MODULE_3__["TrafficLane"](0, 230, 400, 32, _move_direction__WEBPACK_IMPORTED_MODULE_2__["MoveDirection"].RIGHT, 0.05, 100);
        lane1.addCar(this, 0, 1000);
        lane1.addCar(this, 1, 3500);
        lane1.addCar(this, 2, 6500);
        this.addObject(lane1);
        var lane2 = new _traffic_lane__WEBPACK_IMPORTED_MODULE_3__["TrafficLane"](0, 200, 400, 32, _move_direction__WEBPACK_IMPORTED_MODULE_2__["MoveDirection"].RIGHT, 0.1, 100);
        lane2.addCar(this, 0, 0);
        lane2.addCar(this, 0, 500);
        lane2.addCar(this, 0, 1000);
        lane2.addCar(this, 1, 3000);
        lane2.addCar(this, 1, 4000);
        lane2.addCar(this, 2, 6000);
        lane2.addCar(this, 2, 7000);
        this.addObject(lane2);
        var lane3 = new _traffic_lane__WEBPACK_IMPORTED_MODULE_3__["TrafficLane"](0, 165, 400, 32, _move_direction__WEBPACK_IMPORTED_MODULE_2__["MoveDirection"].LEFT, 0.2, 100);
        lane3.addCar(this, 0, 1000);
        lane3.addCar(this, 1, 4000);
        lane3.addCar(this, 2, 6000);
        lane3.addCar(this, 2, 7000);
        this.addObject(lane3);
        var lane4 = new _traffic_lane__WEBPACK_IMPORTED_MODULE_3__["TrafficLane"](0, 135, 400, 32, _move_direction__WEBPACK_IMPORTED_MODULE_2__["MoveDirection"].LEFT, 0.1, 100);
        lane4.addCar(this, 0, 0);
        lane4.addCar(this, 0, 1000);
        lane4.addCar(this, 1, 3000);
        lane4.addCar(this, 1, 3500);
        lane4.addCar(this, 1, 4000);
        lane4.addCar(this, 2, 6000);
        lane4.addCar(this, 2, 6500);
        lane4.addCar(this, 2, 7000);
        this.addObject(lane4);
        this.addObject(new _info_dialog__WEBPACK_IMPORTED_MODULE_4__["default"](50, 50, 200, 200, chicken));
    }
    Game.prototype.draw = function (context2D, interpolator) {
        context2D.fillStyle = "#525252";
        context2D.fillRect(0, 0, 640, 480);
        this.objects.forEach(function (object) {
            object.draw(context2D);
        });
    };
    Game.prototype.update = function (delta) {
        var _this = this;
        var objectsList = this.objects;
        objectsList.forEach(function (o1) {
            objectsList.forEach(function (o2) {
                if (o1 != o2 && o1.isCollided(o2)) {
                    o1.onCollided(o2);
                    o2.onCollided(o1);
                }
            });
        });
        this.objects.forEach(function (object) {
            object.update(_this, delta);
        });
        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            if (object.shouldBeRecycled()) {
                this.objects.splice(i, 1);
                --i;
            }
        }
    };
    Game.prototype.addObject = function (object) {
        this.objects.push(object);
    };
    Game.prototype.getObjectById = function (id) {
        for (var i = 0; i < this.objects.length; i++) {
            var object = this.objects[i];
            if (object.getId() && object.getId() == id) {
                return object;
            }
        }
        return undefined;
    };
    return Game;
}());
/* harmony default export */ __webpack_exports__["default"] = (Game);



/***/ }),

/***/ "./src/game/info-dialog.ts":
/*!*********************************!*\
  !*** ./src/game/info-dialog.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-object */ "./src/game/base-object.ts");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./src/game/game.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var InfoDialog = (function (_super) {
    __extends(InfoDialog, _super);
    function InfoDialog(x, y, width, height, chicken) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.text = "Win";
        _this.isVisible = false;
        _this.animationDelta = 0;
        _this.animationMaxDelta = 400;
        _this.winTitle = "Winner winner chicken dinner!";
        _this.winSubtitle = "click SPACE to play again";
        _this.lostTitle = "You have lost!";
        _this.lostSubtitle = "click SPACE to play again";
        _this.title = "";
        _this.subtitle = "";
        _this.chicken = chicken;
        return _this;
    }
    InfoDialog.prototype.update = function (game, delta) {
        this.title = "";
        this.subtitle = "";
        if (this.chicken.getIsDead()) {
            this.title = this.lostTitle;
            this.subtitle = this.lostSubtitle;
            this.animationDelta = this.animationDelta + delta;
            if (this.animationDelta > this.animationMaxDelta) {
                this.animationDelta = 0;
            }
            if (this.animationDelta < this.animationMaxDelta / 2) {
                this.isVisible = true;
            }
            else {
                this.isVisible = false;
            }
        }
        if (this.chicken.getIsInFinalPosition()) {
            this.title = this.winTitle;
            this.subtitle = this.winSubtitle;
            this.animationDelta = this.animationDelta + delta;
            if (this.animationDelta > this.animationMaxDelta) {
                this.animationDelta = 0;
            }
            if (this.animationDelta < this.animationMaxDelta / 2) {
                this.isVisible = true;
            }
            else {
                this.isVisible = false;
            }
        }
    };
    InfoDialog.prototype.draw = function (context2D) {
        if (this.isVisible) {
            var w = 200;
            var h = 100;
            var x = _game__WEBPACK_IMPORTED_MODULE_1__["canvasSize"].canvasWidth / 2 - w / 2;
            var y = 30;
            if (this.title.length > 0) {
                context2D.font = "25px Comic Sans MS";
                context2D.fillStyle = "red";
                context2D.textAlign = "center";
                context2D.textBaseline = "bottom";
                context2D.fillText(this.title, x + w / 2, y + h / 2 - 10);
            }
            if (this.subtitle.length > 0) {
                context2D.font = "14px Comic Sans MS";
                context2D.fillStyle = "black";
                context2D.textAlign = "center";
                context2D.textBaseline = "bottom";
                context2D.fillText(this.subtitle, x + w / 2, y + h / 2 + 15);
            }
        }
        context2D.font = "14px Comic Sans MS";
        context2D.fillStyle = "black";
        context2D.textAlign = "center";
        context2D.textBaseline = "top";
        context2D.fillText(this.chicken.winCount.toString(), 10, 20);
        context2D.font = "10px Comic Sans MS";
        context2D.fillStyle = "black";
        context2D.textAlign = "center";
        context2D.textBaseline = "top";
        context2D.fillText("win", 10, 10);
        context2D.font = "14px Comic Sans MS";
        context2D.fillStyle = "black";
        context2D.textAlign = "center";
        context2D.textBaseline = "top";
        context2D.fillText(this.chicken.lostCount.toString(), 35, 20);
        context2D.font = "10px Comic Sans MS";
        context2D.fillStyle = "black";
        context2D.textAlign = "center";
        context2D.textBaseline = "top";
        context2D.fillText("lost", 35, 10);
    };
    return InfoDialog;
}(_base_object__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (InfoDialog);


/***/ }),

/***/ "./src/game/map.ts":
/*!*************************!*\
  !*** ./src/game/map.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _base_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-object */ "./src/game/base-object.ts");
/* harmony import */ var _image_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../image-loader */ "./src/image-loader.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();


var Map = (function (_super) {
    __extends(Map, _super);
    function Map(width, height) {
        var _this = _super.call(this, 0, 0, width, height) || this;
        _this.singleTileSize = 16;
        _this.images = [];
        var _getSprite = _image_loader__WEBPACK_IMPORTED_MODULE_1__["default"].getSprite;
        _this.images = [
            _getSprite("grass-center"),
            _getSprite("grass-center"),
            _getSprite("grass-dirty-top"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-center"),
            _getSprite("grass-dirty-bottom"),
            _getSprite("grass-center"),
            _getSprite("road-black-top"),
            _getSprite("road-black-line-bottom"),
            _getSprite("road-black-line-top"),
            _getSprite("road-black-line-bottom"),
            _getSprite("road-black-line-top"),
            _getSprite("road-black-line-bottom"),
            _getSprite("road-black-line-top"),
            _getSprite("road-black-bottom"),
            _getSprite("grass-center"),
        ];
        return _this;
    }
    Map.prototype.draw = function (context2D) {
        var _this = this;
        this.images.forEach(function (sprite, heightIndex) {
            if (sprite) {
                for (var i = 0; i < _this.width; i++) {
                    context2D.drawImage(sprite.getImage(), sprite.getX(), sprite.getY(), sprite.getWidht(), sprite.getHeight(), _this.singleTileSize * i, _this.singleTileSize * heightIndex, _this.singleTileSize, _this.singleTileSize);
                }
            }
        });
    };
    Map.prototype.update = function (game, delta) {
    };
    return Map;
}(_base_object__WEBPACK_IMPORTED_MODULE_0__["default"]));
/* harmony default export */ __webpack_exports__["default"] = (Map);


/***/ }),

/***/ "./src/game/math/bounds.ts":
/*!*********************************!*\
  !*** ./src/game/math/bounds.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Bounds = (function () {
    function Bounds(left, top, right, bottom) {
        if (left === void 0) { left = 0; }
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = 0; }
        if (bottom === void 0) { bottom = 0; }
        this.left = left;
        this.top = top;
        this.right = right;
        this.botttom = bottom;
    }
    Bounds.prototype.width = function () {
        return this.right - this.left;
    };
    Bounds.prototype.height = function () {
        return this.botttom - this.top;
    };
    Bounds.prototype.isEmpty = function () {
        return this.left >= this.right || this.top >= this.botttom;
    };
    Bounds.prototype.inset = function (dx, dy) {
        this.left += dx;
        this.right -= dx;
        this.top += dy;
        this.botttom -= dy;
    };
    return Bounds;
}());
/* harmony default export */ __webpack_exports__["default"] = (Bounds);


/***/ }),

/***/ "./src/game/math/vector2d.ts":
/*!***********************************!*\
  !*** ./src/game/math/vector2d.ts ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Vector2d = (function () {
    function Vector2d(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vector2d.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
    };
    Vector2d.prototype.clear = function () {
        this.x = 0;
        this.y = 0;
    };
    Vector2d.prototype.normalize = function () {
        var mag = this.magnitude();
        if (mag != 0) {
            this.x = this.x / mag;
            this.y = this.y / mag;
        }
    };
    Vector2d.prototype.magnitude = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    return Vector2d;
}());
/* harmony default export */ __webpack_exports__["default"] = (Vector2d);


/***/ }),

/***/ "./src/game/move-direction.ts":
/*!************************************!*\
  !*** ./src/game/move-direction.ts ***!
  \************************************/
/*! exports provided: MoveDirection */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoveDirection", function() { return MoveDirection; });
var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["LEFT"] = 0] = "LEFT";
    MoveDirection[MoveDirection["TOP"] = 1] = "TOP";
    MoveDirection[MoveDirection["RIGHT"] = 2] = "RIGHT";
    MoveDirection[MoveDirection["BOTTOM"] = 3] = "BOTTOM";
})(MoveDirection || (MoveDirection = {}));


/***/ }),

/***/ "./src/game/traffic_lane.ts":
/*!**********************************!*\
  !*** ./src/game/traffic_lane.ts ***!
  \**********************************/
/*! exports provided: TrafficLane */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TrafficLane", function() { return TrafficLane; });
/* harmony import */ var _base_object__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base-object */ "./src/game/base-object.ts");
/* harmony import */ var _move_direction__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./move-direction */ "./src/game/move-direction.ts");
/* harmony import */ var _car__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./car */ "./src/game/car.ts");
var __extends = (undefined && undefined.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();



var TrafficLane = (function (_super) {
    __extends(TrafficLane, _super);
    function TrafficLane(x, y, width, height, direction, speed, startOffset) {
        var _this = _super.call(this, x, y, width, height) || this;
        _this.laneDistance = 0;
        _this.startOffset = 0;
        _this.cars = [];
        _this.direction = direction;
        _this.speed = speed;
        _this.startOffset = startOffset;
        return _this;
    }
    TrafficLane.prototype.addCar = function (game, carType, startDelay) {
        this.laneDistance = this.startOffset + this.speed * startDelay;
        var x = this.leftDirection() ? this.laneDistance : this.getWidth() - this.laneDistance;
        var y = this.y + this.getHeight() / 2 + (Math.random() - 0.5) * 10;
        var car = new _car__WEBPACK_IMPORTED_MODULE_2__["Car"](x, y, this.speed, carType, this.direction);
        this.cars.push(car);
        game.addObject(car);
    };
    TrafficLane.prototype.update = function (game, delta) {
        var _this = this;
        this.cars.forEach(function (car) {
            if (_this.leftDirection()) {
                if (car.getX() + car.getWidth() < 0) {
                    var x = car.getX() + Math.max(_this.laneDistance, _this.getWidth() + car.getWidth());
                    var y = _this.y + _this.getHeight() / 2 + (Math.random() - 0.5) * 10;
                    car.setX(x);
                    car.setY(y);
                }
            }
            else {
                if (car.getX() > _this.getWidth()) {
                    var x = car.getX() - Math.max(_this.laneDistance, _this.getWidth() + car.getWidth());
                    var y = _this.y + _this.getHeight() / 2 + (Math.random() - 0.5) * 10;
                    car.setX(x);
                    car.setY(y);
                }
            }
        });
    };
    TrafficLane.prototype.leftDirection = function () {
        return this.direction == _move_direction__WEBPACK_IMPORTED_MODULE_1__["MoveDirection"].LEFT;
    };
    TrafficLane.prototype.draw = function (context2D) {
    };
    return TrafficLane;
}(_base_object__WEBPACK_IMPORTED_MODULE_0__["default"]));



/***/ }),

/***/ "./src/image-loader.ts":
/*!*****************************!*\
  !*** ./src/image-loader.ts ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sprite */ "./src/sprite.ts");

var ImageLoader = (function () {
    function ImageLoader() {
    }
    ImageLoader.load = function () {
        return Promise.all([
            ImageLoader.loadAsset("assets/duck.png", "assets/duck.json"),
            ImageLoader.loadAsset("assets/map.png", "assets/map.json"),
            ImageLoader.loadAsset("assets/feathers.png", "assets/feathers.json")
        ]);
    };
    ImageLoader.loadAsset = function (imageFilePath, jsonFilePath) {
        return Promise.all([
            ImageLoader.loadJSON(jsonFilePath),
            ImageLoader.loadImage(imageFilePath)
        ])
            .then(function (response) {
            var json = response[0], images = response[1];
            Object.keys(json).forEach(function (id) {
                var _a = json[id], x = _a[0], y = _a[1], w = _a[2], h = _a[3];
                var sprite = new _sprite__WEBPACK_IMPORTED_MODULE_0__["default"](id, images, x, y, w, h);
                ImageLoader.sprites.set(id, sprite);
            });
        });
    };
    ImageLoader.loadImage = function (filePath) {
        return new Promise(function (resolve, reject) {
            var image = new Image();
            image.addEventListener("load", function () {
                resolve(image);
            }, false);
            image.addEventListener("error", function (error) {
                reject(error);
            }, false);
            image.src = filePath;
        });
    };
    ImageLoader.loadJSON = function (filePath) {
        return fetch(filePath).then(function (response) { return response.json(); });
    };
    ImageLoader.getSprite = function (id) {
        return ImageLoader.sprites.get(id);
    };
    ImageLoader.sprites = new Map();
    return ImageLoader;
}());
/* harmony default export */ __webpack_exports__["default"] = (ImageLoader);


/***/ }),

/***/ "./src/keyboard.ts":
/*!*************************!*\
  !*** ./src/keyboard.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Keyboard = (function () {
    function Keyboard() {
    }
    Keyboard.isPressed = function (key) {
        return Keyboard.keys[key];
    };
    Keyboard.setPressed = function (key) {
        Keyboard.keys[key] = true;
    };
    Keyboard.setReleased = function (key) {
        Keyboard.keys[key] = false;
    };
    Keyboard.SPACE = 32;
    Keyboard.ARROW_UP = 38;
    Keyboard.ARROW_DOWN = 40;
    Keyboard.ARROW_LEFT = 37;
    Keyboard.ARROW_RIGHT = 39;
    Keyboard.keys = [];
    return Keyboard;
}());
/* harmony default export */ __webpack_exports__["default"] = (Keyboard);


/***/ }),

/***/ "./src/sprite.ts":
/*!***********************!*\
  !*** ./src/sprite.ts ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Sprite = (function () {
    function Sprite(id, image, x, y, width, height) {
        this.id = id;
        this.image = image;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    Sprite.prototype.getId = function () {
        return this.id;
    };
    Sprite.prototype.getImage = function () {
        return this.image;
    };
    Sprite.prototype.getX = function () {
        return this.x;
    };
    Sprite.prototype.getY = function () {
        return this.y;
    };
    Sprite.prototype.getWidht = function () {
        return this.width;
    };
    Sprite.prototype.getHeight = function () {
        return this.height;
    };
    return Sprite;
}());
/* harmony default export */ __webpack_exports__["default"] = (Sprite);


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL3NyYy9DOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9zYXZlLXRoZS1jaGlja2VuL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vL3NyYy9DOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9zYXZlLXRoZS1jaGlja2VuL3NyYy9lbmdpbmUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9DOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9zYXZlLXRoZS1jaGlja2VuL3NyYy9nYW1lL2Jhc2Utb2JqZWN0LnRzIiwid2VicGFjazovLy9zcmMvQzovd29ya3NwYWNlL2phdmFzY3JpcHQvc2F2ZS10aGUtY2hpY2tlbi9zcmMvZ2FtZS9jYXIudHMiLCJ3ZWJwYWNrOi8vL3NyYy9DOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9zYXZlLXRoZS1jaGlja2VuL3NyYy9nYW1lL2NoaWNrZW4udHMiLCJ3ZWJwYWNrOi8vL3NyYy9DOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9zYXZlLXRoZS1jaGlja2VuL3NyYy9nYW1lL2dhbWUudHMiLCJ3ZWJwYWNrOi8vL3NyYy9DOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9zYXZlLXRoZS1jaGlja2VuL3NyYy9nYW1lL2luZm8tZGlhbG9nLnRzIiwid2VicGFjazovLy9zcmMvQzovd29ya3NwYWNlL2phdmFzY3JpcHQvc2F2ZS10aGUtY2hpY2tlbi9zcmMvZ2FtZS9tYXAudHMiLCJ3ZWJwYWNrOi8vL3NyYy9DOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9zYXZlLXRoZS1jaGlja2VuL3NyYy9nYW1lL21hdGgvYm91bmRzLnRzIiwid2VicGFjazovLy9zcmMvQzovd29ya3NwYWNlL2phdmFzY3JpcHQvc2F2ZS10aGUtY2hpY2tlbi9zcmMvZ2FtZS9tYXRoL3ZlY3RvcjJkLnRzIiwid2VicGFjazovLy9zcmMvQzovd29ya3NwYWNlL2phdmFzY3JpcHQvc2F2ZS10aGUtY2hpY2tlbi9zcmMvZ2FtZS9tb3ZlLWRpcmVjdGlvbi50cyIsIndlYnBhY2s6Ly8vc3JjL0M6L3dvcmtzcGFjZS9qYXZhc2NyaXB0L3NhdmUtdGhlLWNoaWNrZW4vc3JjL2dhbWUvdHJhZmZpY19sYW5lLnRzIiwid2VicGFjazovLy9zcmMvQzovd29ya3NwYWNlL2phdmFzY3JpcHQvc2F2ZS10aGUtY2hpY2tlbi9zcmMvaW1hZ2UtbG9hZGVyLnRzIiwid2VicGFjazovLy9zcmMvQzovd29ya3NwYWNlL2phdmFzY3JpcHQvc2F2ZS10aGUtY2hpY2tlbi9zcmMva2V5Ym9hcmQudHMiLCJ3ZWJwYWNrOi8vL3NyYy9DOi93b3Jrc3BhY2UvamF2YXNjcmlwdC9zYXZlLXRoZS1jaGlja2VuL3NyYy9zcHJpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakZ5QztBQUNQO0FBQ0o7QUFDQztBQUUvQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0lB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QUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRzNCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRXRCLElBQUksS0FBSyxHQUFHLElBQUkseURBQVcsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsNkRBQWEsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUN4QixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDMUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUUzQixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTNCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBR3RCLElBQUksS0FBSyxHQUFHLElBQUkseURBQVcsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsNkRBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBR3pFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUczQixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTNCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBR3RCLElBQUksS0FBSyxHQUFHLElBQUkseURBQVcsQ0FBQyxDQUFDLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsNkRBQWEsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pFLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV4QixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQzNCLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQztRQUMzQixLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUd0QixJQUFJLENBQUMsU0FB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SSxHQUFYO1FBQ0ksT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFTSx5QkFBUSxHQUFmO1FBQ0ksT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3RCLENBQUM7SUFFTSwwQkFBUyxHQUFoQjtRQUNJLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0wsYUFBQztBQUFELENBQUMiLCJmaWxlIjoiYnVpbGQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hcHAudHNcIik7XG4iLCJcclxuaW1wb3J0IEltYWdlTG9hZGVyIGZyb20gJy4vaW1hZ2UtbG9hZGVyJztcclxuaW1wb3J0IEtleWJvYXJkIGZyb20gJy4va2V5Ym9hcmQnO1xyXG5pbXBvcnQgRW5naW5lIGZyb20gJy4vZW5naW5lJztcclxuaW1wb3J0IEdhbWUgZnJvbSAnLi9nYW1lL2dhbWUnO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCAoYnV0dG9uKSA9PiBLZXlib2FyZC5zZXRQcmVzc2VkKGJ1dHRvbi5rZXlDb2RlKSwgZmFsc2UpO1xyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLCAoYnV0dG9uKSA9PiBLZXlib2FyZC5zZXRSZWxlYXNlZChidXR0b24ua2V5Q29kZSksIGZhbHNlKTtcclxuXHJcbiAgICBsZXQgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2FudmFzXCIpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xyXG4gICAgbGV0IGNvbnRleHQyRDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSBhcyBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQ7XHJcblxyXG4gICAgbGV0IEc6IEVuZ2luZSA9IG5ldyBFbmdpbmUoY29udGV4dDJEKTtcclxuXHJcbiAgICBJbWFnZUxvYWRlci5sb2FkKCkudGhlbigoKSA9PiB7XHJcbiAgICAgICAgY29udGV4dDJELnNjYWxlKDIsMik7XHJcbiAgICAgICAgY29udGV4dDJELmltYWdlU21vb3RoaW5nRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgIGxldCBnYW1lOiBHYW1lID0gbmV3IEdhbWUoY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcclxuICAgICAgICBHLnN0YXJ0KGdhbWUpO1xyXG4gICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XHJcbiAgICAgICAgLy9UT0RPIGVycm9yXHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIkFzc2V0cyBsb2FkIGVycm9yIVwiLGVycm9yKTtcclxuICAgIH0pO1xyXG59LCBmYWxzZSk7XHJcblxyXG5cclxuXHJcbiIsImltcG9ydCBLZXlib2FyZCBmcm9tICcuL2tleWJvYXJkJztcclxuaW1wb3J0IEltYWdlTG9hZGVyIGZyb20gJy4vaW1hZ2UtbG9hZGVyJztcclxuaW1wb3J0IEJhc2VHYW1lIGZyb20gJy4vYmFzZS1nYW1lJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEVuZ2luZSB7XHJcbiAgICBwcml2YXRlIGNvbnRleHQyRDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIFVQUzogbnVtYmVyID0gNjA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBGUkFNRV9USU1FOiBudW1iZXIgPSAxMDAwIC8gRW5naW5lLlVQUztcclxuXHJcbiAgICBwcml2YXRlIGFjdW11bGF0b3I6IG51bWJlciA9IDA7XHJcbiAgICBwcml2YXRlIGxhc3RUaW1lOiBudW1iZXIgPSAwO1xyXG5cclxuICAgIHByaXZhdGUgZ2FtZTpCYXNlR2FtZXxudWxsO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGNvbnRleHQyRDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKSB7XHJcbiAgICAgICAgdGhpcy5jb250ZXh0MkQgPSBjb250ZXh0MkQ7XHJcbiAgICAgICAgdGhpcy5nYW1lID0gbnVsbDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgcHVibGljIHN0YXJ0KGdhbWU6QmFzZUdhbWUpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgdGhpcy5nYW1lID0gZ2FtZTtcclxuICAgICAgICB0aGlzLmxhc3RUaW1lID0gRW5naW5lLmdldFRpbWUoKTtcclxuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMubG9vcC5iaW5kKHRoaXMpKTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxvb3AoKSB7XHJcbiAgICAgICAgdGhpcy50aWNrKCk7XHJcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmxvb3AuYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSB0aWNrKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyBDb29sIHN0dWZmXHJcbiAgICAgICAgbGV0IHsgRlJBTUVfVElNRSB9ID0gRW5naW5lO1xyXG5cclxuICAgICAgICBsZXQgdGltZSA9IEVuZ2luZS5nZXRUaW1lKCk7XHJcbiAgICAgICAgbGV0IGRlbHRhID0gdGltZSAtIHRoaXMubGFzdFRpbWU7XHJcblxyXG4gICAgICAgIGlmIChkZWx0YSA+IDEwMDApIHtcclxuICAgICAgICAgICAgZGVsdGEgPSBGUkFNRV9USU1FO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5hY3VtdWxhdG9yICs9IGRlbHRhO1xyXG5cclxuICAgICAgICB3aGlsZSAodGhpcy5hY3VtdWxhdG9yID49IEZSQU1FX1RJTUUpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGUoRlJBTUVfVElNRSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN1bXVsYXRvciAtPSBGUkFNRV9USU1FO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGludGVycG9sYXRpb246IG51bWJlciA9IHRoaXMuYWN1bXVsYXRvciAvIEZSQU1FX1RJTUU7XHJcblxyXG4gICAgICAgIHRoaXMuZHJhdyh0aGlzLmNvbnRleHQyRCwgaW50ZXJwb2xhdGlvbik7XHJcblxyXG4gICAgICAgIHRoaXMubGFzdFRpbWUgPSB0aW1lO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgdXBkYXRlKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmdhbWUpe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUudXBkYXRlKGRlbHRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBkcmF3KGNvbnRleHQyRDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBpbnRlcnBvbGF0aW9uOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICBpZih0aGlzLmdhbWUpe1xyXG4gICAgICAgICAgICB0aGlzLmdhbWUuZHJhdyhjb250ZXh0MkQsIGludGVycG9sYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRUaW1lKCk6IG51bWJlciB7XHJcbiAgICAgICAgLy8gVE9ETyB0aGlzIG15IG5vdCB3b3JrIGluIHNvbWUgYnJvd3NlcnNcclxuICAgICAgICByZXR1cm4gd2luZG93LnBlcmZvcm1hbmNlLm5vdygpO1xyXG4gICAgfVxyXG59XHJcblxyXG4iLCJpbXBvcnQgR2FtZSBmcm9tICcuL2dhbWUnO1xyXG5pbXBvcnQgQm91bmRzIGZyb20gJy4vbWF0aC9ib3VuZHMnO1xyXG5cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIEJhc2VPYmplY3Qge1xyXG4gICAgcHJvdGVjdGVkIHg6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCB5OiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgd2lkdGg6IG51bWJlcjtcclxuICAgIHByb3RlY3RlZCBoZWlnaHQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcclxuICAgIHByb3RlY3RlZCBsYXllcjogbnVtYmVyIHwgdW5kZWZpbmVkO1xyXG4gICAgcHJvdGVjdGVkIGNvbGxpc2lvbkJvdW5kczogQm91bmRzIHwgbnVsbCA9IG51bGw7XHJcbiAgICBcclxuICAgIHByb3RlY3RlZCBpc1JlY3ljbGVkOiBib29sZWFuO1xyXG4gICAgcHVibGljIGNhbnZhc0hlaWdodDpudW1iZXIgPSA2MDA7XHJcbiAgICBwdWJsaWMgY2FudmFzV2lkdGg6bnVtYmVyID0gNjAwO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWQgPSB1bmRlZmluZWQ7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgICAgICB0aGlzLmlzUmVjeWNsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SWQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgc2V0SWQoaWQ6IHN0cmluZyk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWJzdHJhY3QgdXBkYXRlKGdhbWU6IEdhbWUsIGRlbHRhOiBudW1iZXIpOiB2b2lkO1xyXG4gICAgcHVibGljIGFic3RyYWN0IGRyYXcoY29udGV4dDJEOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkO1xyXG5cclxuICAgIHB1YmxpYyBpc0NvbGxpZGVkKG9iamVjdDogQmFzZU9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbGxpc2lvbkJvdW5kcykge1xyXG4gICAgICAgICAgICBsZXQgY2I6IEJvdW5kcyB8IG51bGwgPSBvYmplY3QuZ2V0Q29sbGlzdGlvbkJvdW5kcygpO1xyXG4gICAgICAgICAgICBpZiAoY2IpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiAhKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCArIHRoaXMuY29sbGlzaW9uQm91bmRzLnJpZ2h0IDw9IG9iamVjdC5nZXRYKCkgKyBjYi5sZWZ0IHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICsgdGhpcy5jb2xsaXNpb25Cb3VuZHMubGVmdCA+PSBvYmplY3QuZ2V0WCgpICsgY2IucmlnaHQgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKyB0aGlzLmNvbGxpc2lvbkJvdW5kcy5ib3R0dG9tIDw9IG9iamVjdC5nZXRZKCkgKyBjYi50b3AgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKyB0aGlzLmNvbGxpc2lvbkJvdW5kcy50b3AgPj0gb2JqZWN0LmdldFkoKSArIGNiLmJvdHR0b21cclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gIShcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnggKyB0aGlzLmNvbGxpc2lvbkJvdW5kcy5yaWdodCA8PSBvYmplY3QuZ2V0WCgpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICsgdGhpcy5jb2xsaXNpb25Cb3VuZHMubGVmdCA+PSBvYmplY3QuZ2V0WCgpICsgb2JqZWN0LmdldFdpZHRoKCkgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKyB0aGlzLmNvbGxpc2lvbkJvdW5kcy5ib3R0dG9tIDw9IG9iamVjdC5nZXRZKCkgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKyB0aGlzLmNvbGxpc2lvbkJvdW5kcy50b3AgPj0gb2JqZWN0LmdldFkoKSArIG9iamVjdC5nZXRIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxldCBjYjogQm91bmRzIHwgbnVsbCA9IG9iamVjdC5nZXRDb2xsaXN0aW9uQm91bmRzKCk7XHJcbiAgICAgICAgICAgIGlmIChjYikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICsgdGhpcy53aWR0aCA8PSBvYmplY3QuZ2V0WCgpICsgY2IubGVmdCB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueCA+PSBvYmplY3QuZ2V0WCgpICsgY2IucmlnaHQgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgKyB0aGlzLmhlaWdodCA8PSBvYmplY3QuZ2V0WSgpICsgY2IudG9wIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy55ID49IG9iamVjdC5nZXRZKCkgKyBjYi5ib3R0dG9tXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICEoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ICsgdGhpcy53aWR0aCA8PSBvYmplY3QuZ2V0WCgpIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy54ID49IG9iamVjdC5nZXRYKCkgKyBvYmplY3QuZ2V0V2lkdGgoKSB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0IDw9IG9iamVjdC5nZXRZKCkgfHxcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnkgPj0gb2JqZWN0LmdldFkoKSArIG9iamVjdC5nZXRIZWlnaHQoKVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyByZXR1cm4gIShcclxuICAgICAgICAvLyAgICAgdGhpcy54ICsgdGhpcy53aWR0aCA8IG9iamVjdC54IHx8XHJcbiAgICAgICAgLy8gICAgIHRoaXMueCA+IG9iamVjdC54ICsgb2JqZWN0LndpZHRoIHx8XHJcbiAgICAgICAgLy8gICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0IDwgb2JqZWN0LnkgfHxcclxuICAgICAgICAvLyAgICAgdGhpcy55ID4gb2JqZWN0LnkgKyBvYmplY3QuaGVpZ2h0XHJcbiAgICAgICAgLy8gKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgb25Db2xsaWRlZChvYmplY3Q6IEJhc2VPYmplY3QpOiB2b2lkIHtcclxuICAgICAgICAvLztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgcmVjeWNsZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmlzUmVjeWNsZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzaG91bGRCZVJlY3ljbGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzUmVjeWNsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRZKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2lkdGgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRDb2xsaXN0aW9uQm91bmRzKCk6IEJvdW5kcyB8IG51bGwge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbGxpc2lvbkJvdW5kcztcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhd0RlYnVnTGluZXMoY29udGV4dDJEOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOnZvaWR7XHJcbiAgICAgICAgbGV0IGNiID0gdGhpcy5jb2xsaXNpb25Cb3VuZHM7XHJcbiAgICAgICAgaWYgKGNiKSB7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5zYXZlKCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5zdHJva2VTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5zdHJva2VSZWN0KHRoaXMueCArIGNiLmxlZnQsIHRoaXMueSArIGNiLnRvcCwgY2Iud2lkdGgoKSwgY2IuaGVpZ2h0KCkpO1xyXG4gICAgICAgICAgICBjb250ZXh0MkQuc3Ryb2tlU3R5bGUgPSBcImdyZWVuXCI7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5zdHJva2VSZWN0KHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIGNvbnRleHQyRC5yZXN0b3JlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vVE9ETyBkcmF3IHNwcml0ZSBvbiBzY3JlZW4geHkgbm90IG9iai54eSwgYWRkIGFic3RyYWN0aW9uIGZvciBkcmF3IHNwcml0ZSBvbiBjYW52YXNcclxufSIsImltcG9ydCBCYXNlT2JqZWN0IGZyb20gXCIuL2Jhc2Utb2JqZWN0XCI7XHJcbmltcG9ydCBHYW1lIGZyb20gXCIuL2dhbWVcIjtcclxuaW1wb3J0IFNwcml0ZSBmcm9tIFwiLi4vc3ByaXRlXCI7XHJcbmltcG9ydCBJbWFnZUxvYWRlciBmcm9tIFwiLi4vaW1hZ2UtbG9hZGVyXCI7XHJcbmltcG9ydCB7IE1vdmVEaXJlY3Rpb24gfSBmcm9tIFwiLi9tb3ZlLWRpcmVjdGlvblwiO1xyXG5pbXBvcnQgQm91bmRzIGZyb20gXCIuL21hdGgvYm91bmRzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIENhciBleHRlbmRzIEJhc2VPYmplY3Qge1xyXG5cclxuICAgIHByaXZhdGUgaW1hZ2VzOiBBcnJheTxTcHJpdGUgfCB1bmRlZmluZWQ+O1xyXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb246IE1vdmVEaXJlY3Rpb24gPSBNb3ZlRGlyZWN0aW9uLkxFRlQ7XHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXIgPSAxO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgc3BlZWQ6IG51bWJlciwgdHlwZTogbnVtYmVyID0gMCwgZGlyZWN0aW9uOiBNb3ZlRGlyZWN0aW9uID0gTW92ZURpcmVjdGlvbi5MRUZUKSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgNDgsIDMyKTtcclxuXHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG5cclxuICAgICAgICB0aGlzLmltYWdlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0eXBlID09IDEpIHtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JheS1sZWZ0LTFcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNhci1ncmF5LWxlZnQtMlwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyYXktbGVmdC0zXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JheS1sZWZ0LTRcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNhci1ncmF5LWxlZnQtNVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyYXktbGVmdC02XCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JheS1yaWdodC0xXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JheS1yaWdodC0yXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JheS1yaWdodC0zXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JheS1yaWdodC00XCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JheS1yaWdodC01XCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JheS1yaWdodC02XCIpKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT0gMikge1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNhci1vcmFuZ2UtbGVmdC0xXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItb3JhbmdlLWxlZnQtMlwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLW9yYW5nZS1sZWZ0LTNcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNhci1vcmFuZ2UtbGVmdC00XCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItb3JhbmdlLWxlZnQtNVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLW9yYW5nZS1sZWZ0LTZcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNhci1vcmFuZ2UtcmlnaHQtMVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLW9yYW5nZS1yaWdodC0yXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItb3JhbmdlLXJpZ2h0LTNcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNhci1vcmFuZ2UtcmlnaHQtNFwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLW9yYW5nZS1yaWdodC01XCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItb3JhbmdlLXJpZ2h0LTZcIikpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyZWVuLWxlZnQtMVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyZWVuLWxlZnQtMlwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyZWVuLWxlZnQtM1wiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyZWVuLWxlZnQtNFwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyZWVuLWxlZnQtNVwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyZWVuLWxlZnQtNlwiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyZWVuLXJpZ2h0LTFcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNhci1ncmVlbi1yaWdodC0yXCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JlZW4tcmlnaHQtM1wiKSk7XHJcbiAgICAgICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2FyLWdyZWVuLXJpZ2h0LTRcIikpO1xyXG4gICAgICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNhci1ncmVlbi1yaWdodC01XCIpKTtcclxuICAgICAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjYXItZ3JlZW4tcmlnaHQtNlwiKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmNvbGxpc2lvbkJvdW5kcyA9IG5ldyBCb3VuZHMoXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0V2lkdGgoKSAqIDAuMTUsIHRoaXMuZ2V0SGVpZ2h0KCkgKiAwLjQ1LFxyXG4gICAgICAgICAgICB0aGlzLmdldFdpZHRoKCkgKiAwLjg1LCB0aGlzLmdldEhlaWdodCgpKTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgc2V0WCh4OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzZXRZKHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyB1cGRhdGUoZ2FtZTogR2FtZSwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICB0aGlzLnggKz0gdGhpcy5zcGVlZCAqIGRlbHRhICogKHRoaXMuZGlyZWN0aW9uID09IE1vdmVEaXJlY3Rpb24uTEVGVCA/IC0xIDogMSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY29udGV4dDJEOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuXHJcbiAgICAgICAgbGV0IG9mZiA9IHRoaXMuZGlyZWN0aW9uID09IE1vdmVEaXJlY3Rpb24uTEVGVCA/IDAgOiA2O1xyXG4gICAgICAgIGZvciAobGV0IHkgPSAwOyB5IDwgMjsgeSsrKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgMzsgeCsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ByaXRlID0gdGhpcy5pbWFnZXNbb2ZmICsgeSAqIDMgKyB4XTtcclxuICAgICAgICAgICAgICAgIGlmIChzcHJpdGUpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZHJhd0ltYWdlKHNwcml0ZS5nZXRJbWFnZSgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzcHJpdGUuZ2V0WCgpLCBzcHJpdGUuZ2V0WSgpLCBzcHJpdGUuZ2V0V2lkaHQoKSwgc3ByaXRlLmdldEhlaWdodCgpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnggKyB4ICogMTYsIHRoaXMueSArIHkgKiAxNiwgMTYsIDE2KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vVE9ETyByZW1vdmVcclxuICAgICAgICAgICAgLy8gdGhpcy5kcmF3RGVidWdMaW5lcyhjb250ZXh0MkQpO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBpc0NvbGxpZGVkKG9iamVjdDogQmFzZU9iamVjdCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhKG9iamVjdCBpbnN0YW5jZW9mIENhcikgJiYgc3VwZXIuaXNDb2xsaWRlZChvYmplY3QpO1xyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpZGVkKG9iamVjdDogQmFzZU9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIC8vO1xyXG4gICAgfVxyXG5cclxufSIsIlxyXG5pbXBvcnQgQmFzZU9iamVjdCBmcm9tICcuL2Jhc2Utb2JqZWN0J1xyXG5pbXBvcnQgU3ByaXRlIGZyb20gJy4uL3Nwcml0ZSc7XHJcbmltcG9ydCBLZXlib2FyZCBmcm9tICcuLi9rZXlib2FyZCc7XHJcbmltcG9ydCBJbWFnZUxvYWRlciBmcm9tICcuLi9pbWFnZS1sb2FkZXInXHJcbmltcG9ydCBHYW1lIGZyb20gJy4vZ2FtZSc7XHJcbmltcG9ydCB7IE1vdmVEaXJlY3Rpb24gfSBmcm9tICcuL21vdmUtZGlyZWN0aW9uJztcclxuaW1wb3J0IEJvdW5kcyBmcm9tICcuL21hdGgvYm91bmRzJztcclxuaW1wb3J0IFZlY3RvcjJkIGZyb20gJy4vbWF0aC92ZWN0b3IyZCc7XHJcbmltcG9ydCB7IENhciB9IGZyb20gJy4vY2FyJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENoaWNrZW4gZXh0ZW5kcyBCYXNlT2JqZWN0IHtcclxuXHJcbiAgICBwcml2YXRlIGltYWdlczogQXJyYXk8U3ByaXRlIHwgdW5kZWZpbmVkPjtcclxuICAgIHByaXZhdGUgYW5pbWFpdG9uQ291bnRlcjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgc2luZ2xlRnJhbWVEdXJhdGlvbjogbnVtYmVyID0gMDtcclxuICAgIHByaXZhdGUgYW5pbWF0aW9uRnJhbWVzOiBudW1iZXJbXSA9IFsxLCAyLCAxLCAwXTtcclxuXHJcbiAgICBwcml2YXRlIGRpcmVjdGlvbjogTW92ZURpcmVjdGlvbjtcclxuICAgIHByaXZhdGUgaXNNb3Zpbmc6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXI7XHJcblxyXG4gICAgcHJpdmF0ZSBjYjE6IEJvdW5kcztcclxuICAgIHByaXZhdGUgY2IyOiBCb3VuZHM7XHJcblxyXG4gICAgcHJpdmF0ZSBwcmVzc2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGNvbGxpc2lvbkZvcmNlOiBWZWN0b3IyZDtcclxuICAgIHByaXZhdGUgaXNFeGl0Rm91bmQ6IGJvb2xlYW47XHJcbiAgICBwcml2YXRlIGlzRGVhZDogYm9vbGVhbjtcclxuICAgIHByaXZhdGUgaXNJbkZpbmFsUG9zaXRpb246IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBwcml2YXRlIHN0YXJ0WDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBzdGFydFk6IG51bWJlcjtcclxuXHJcbiAgICBwdWJsaWMgd2luQ291bnQ6bnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBsb3N0Q291bnQ6bnVtYmVyID0gMDtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgICAgIHN1cGVyKHgsIHksIDMyLCAzMik7XHJcbiAgICAgICAgdGhpcy5zZXRJZChcIkNoaWNrZW5cIik7XHJcbiAgICAgICAgdGhpcy5pc0V4aXRGb3VuZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNEZWFkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIHRoaXMuc3RhcnRYID0geDtcclxuICAgICAgICB0aGlzLnN0YXJ0WSA9IHk7XHJcblxyXG4gICAgICAgIHRoaXMuaW1hZ2VzID0gW107XHJcblxyXG4gICAgICAgICBcclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjaGlja2VuLXRvcC0xXCIpKTtcclxuICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNoaWNrZW4tdG9wLTJcIikpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2hpY2tlbi10b3AtM1wiKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2hpY2tlbi1yaWdodC0xXCIpKTtcclxuICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNoaWNrZW4tcmlnaHQtMlwiKSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjaGlja2VuLXJpZ2h0LTNcIikpO1xyXG5cclxuICAgICAgICB0aGlzLmltYWdlcy5wdXNoKEltYWdlTG9hZGVyLmdldFNwcml0ZShcImNoaWNrZW4tYm90dG9tLTFcIikpO1xyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiY2hpY2tlbi1ib3R0b20tMlwiKSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjaGlja2VuLWJvdHRvbS0zXCIpKTtcclxuXHJcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjaGlja2VuLWxlZnQtMVwiKSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjaGlja2VuLWxlZnQtMlwiKSk7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMucHVzaChJbWFnZUxvYWRlci5nZXRTcHJpdGUoXCJjaGlja2VuLWxlZnQtM1wiKSk7XHJcblxyXG4gICAgICAgIHRoaXMuaW1hZ2VzLnB1c2goSW1hZ2VMb2FkZXIuZ2V0U3ByaXRlKFwiZmVhdGhlcnNcIikpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIHRoaXMuZGlyZWN0aW9uID0gTW92ZURpcmVjdGlvbi5CT1RUT007XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDAuMjtcclxuICAgICAgICB0aGlzLmlzTW92aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jYjEgPSBuZXcgQm91bmRzKFxyXG4gICAgICAgICAgICB0aGlzLmdldFdpZHRoKCkgKiAwLjI1LCB0aGlzLmdldEhlaWdodCgpICogMC4yLFxyXG4gICAgICAgICAgICB0aGlzLmdldFdpZHRoKCkgKiAwLjc1LCArIHRoaXMuZ2V0SGVpZ2h0KCkgKiAwLjgpO1xyXG4gICAgICAgIHRoaXMuY2IyID0gbmV3IEJvdW5kcyhcclxuICAgICAgICAgICAgdGhpcy5nZXRXaWR0aCgpICogMC4yNSwgdGhpcy5nZXRIZWlnaHQoKSAqIDAuNSxcclxuICAgICAgICAgICAgdGhpcy5nZXRXaWR0aCgpICogMC43NSwgKyB0aGlzLmdldEhlaWdodCgpKTtcclxuICAgICAgICB0aGlzLmNvbGxpc2lvbkZvcmNlID0gbmV3IFZlY3RvcjJkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldFBvc2l0aW9uKHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy54ID0geDsgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGdhbWU6IEdhbWUsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuXHJcblxyXG4gICAgICAgIGxldCB7IExFRlQsIFRPUCwgUklHSFQsIEJPVFRPTSB9ID0gTW92ZURpcmVjdGlvbjtcclxuICAgICAgICBsZXQgeyBpc1ByZXNzZWQsIFNQQUNFLCBBUlJPV19MRUZULCBBUlJPV19SSUdIVCwgQVJST1dfVVAsIEFSUk9XX0RPV04gfSA9IEtleWJvYXJkO1xyXG5cclxuICAgICAgICBpZih0aGlzLmlzRGVhZCl7XHJcbiAgICAgICAgICAgIGlmKGlzUHJlc3NlZChTUEFDRSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5zdGFydFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLnN0YXJ0WTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNEZWFkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYodGhpcy5pc0luRmluYWxQb3NpdGlvbil7XHJcbiAgICAgICAgICAgIGlmKGlzUHJlc3NlZChTUEFDRSkpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy54ID0gdGhpcy5zdGFydFg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnkgPSB0aGlzLnN0YXJ0WTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNJbkZpbmFsUG9zaXRpb24gPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBsZXQgbW92ZURpcjogVmVjdG9yMmQgPSBuZXcgVmVjdG9yMmQoKTtcclxuXHJcbiAgICAgICAgdGhpcy5pc01vdmluZyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCB0ZW1wRGlyZWN0aW9uOiBNb3ZlRGlyZWN0aW9uID0gdGhpcy5kaXJlY3Rpb247XHJcblxyXG4gICAgICAgIGlmIChpc1ByZXNzZWQoQVJST1dfTEVGVCkpIHtcclxuICAgICAgICAgICAgbW92ZURpci54IC09IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gTEVGVDtcclxuICAgICAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNzZWQoQVJST1dfUklHSFQpKSB7XHJcbiAgICAgICAgICAgIG1vdmVEaXIueCArPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IFJJR0hUO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW92aW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc1ByZXNzZWQoQVJST1dfVVApKSB7XHJcbiAgICAgICAgICAgIG1vdmVEaXIueSAtPSB0aGlzLnNwZWVkO1xyXG4gICAgICAgICAgICB0aGlzLmRpcmVjdGlvbiA9IFRPUDtcclxuICAgICAgICAgICAgdGhpcy5pc01vdmluZyA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIGlmIChpc1ByZXNzZWQoQVJST1dfRE9XTikpIHtcclxuICAgICAgICAgICAgbW92ZURpci55ICs9IHRoaXMuc3BlZWQ7XHJcbiAgICAgICAgICAgIHRoaXMuZGlyZWN0aW9uID0gQk9UVE9NO1xyXG4gICAgICAgICAgICB0aGlzLmlzTW92aW5nID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1heWJlIG1ha2UgdGhpcyBvcHRpbWFsIDspXHJcbiAgICAgICAgdGhpcy54ICs9IG1vdmVEaXIueCAqIHRoaXMuc3BlZWQgKiBkZWx0YTtcclxuICAgICAgICB0aGlzLnkgKz0gbW92ZURpci55ICogdGhpcy5zcGVlZCAqIGRlbHRhO1xyXG5cclxuICAgICAgICBpZih0aGlzLnkgPCAxMzApe1xyXG4gICAgICAgICAgICBpZih0aGlzLmlzSW5GaW5hbFBvc2l0aW9uID09IGZhbHNlKXtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luQ291bnQgPSB0aGlzLndpbkNvdW50ICsgMTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmlzSW5GaW5hbFBvc2l0aW9uID0gdHJ1ZTtcclxuICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB0aGlzLnNpbmdsZUZyYW1lRHVyYXRpb24gPSAyMCAvIHRoaXMuc3BlZWQ7XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc01vdmluZykge1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1haXRvbkNvdW50ZXIgPSAwO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuYW5pbWFpdG9uQ291bnRlciArPSBkZWx0YTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYW5pbWFpdG9uQ291bnRlciA+IHRoaXMuc2luZ2xlRnJhbWVEdXJhdGlvbiAqIHRoaXMuYW5pbWF0aW9uRnJhbWVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYWl0b25Db3VudGVyID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlyZWN0aW9uICE9IHRlbXBEaXJlY3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5hbmltYWl0b25Db3VudGVyID0gMDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PSBNb3ZlRGlyZWN0aW9uLkxFRlQgfHwgdGhpcy5kaXJlY3Rpb24gPT0gTW92ZURpcmVjdGlvbi5SSUdIVCkge1xyXG4gICAgICAgICAgICB0aGlzLmNvbGxpc2lvbkJvdW5kcyA9IHRoaXMuY2IyO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29sbGlzaW9uQm91bmRzID0gdGhpcy5jYjE7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjb250ZXh0MkQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc0RlYWQpIHtcclxuICAgICAgICAgICAgbGV0IHNwcml0ZTogU3ByaXRlfHVuZGVmaW5lZCA9IHRoaXMuaW1hZ2VzWzEyXTtcclxuICAgICAgICAgICAgaWYgKHNwcml0ZSkge1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDJELmRyYXdJbWFnZShzcHJpdGUuZ2V0SW1hZ2UoKSwgc3ByaXRlLmdldFgoKSwgc3ByaXRlLmdldFkoKSwgc3ByaXRlLmdldFdpZGh0KCksIHNwcml0ZS5nZXRIZWlnaHQoKSwgdGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IHRoaXMuYW5pbWF0aW9uRnJhbWVzW01hdGguZmxvb3IodGhpcy5hbmltYWl0b25Db3VudGVyIC8gdGhpcy5zaW5nbGVGcmFtZUR1cmF0aW9uKV07XHJcblxyXG4gICAgICAgICAgICBsZXQgc3ByaXRlOiBTcHJpdGUgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgICAgIGxldCB7IExFRlQsIFRPUCwgUklHSFQsIEJPVFRPTSB9ID0gTW92ZURpcmVjdGlvbjtcclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmRpcmVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBMRUZUOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZSA9IHRoaXMuaW1hZ2VzW2luZGV4ICsgOV07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWtcclxuICAgICAgICAgICAgICAgIGNhc2UgUklHSFQ6XHJcbiAgICAgICAgICAgICAgICAgICAgc3ByaXRlID0gdGhpcy5pbWFnZXNbaW5kZXggKyAzXTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgVE9QOlxyXG4gICAgICAgICAgICAgICAgICAgIHNwcml0ZSA9IHRoaXMuaW1hZ2VzW2luZGV4ICsgMF07XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIEJPVFRPTTpcclxuICAgICAgICAgICAgICAgICAgICBzcHJpdGUgPSB0aGlzLmltYWdlc1tpbmRleCArIDZdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzcHJpdGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQyRC5kcmF3SW1hZ2Uoc3ByaXRlLmdldEltYWdlKCksIHNwcml0ZS5nZXRYKCksIHNwcml0ZS5nZXRZKCksIHNwcml0ZS5nZXRXaWRodCgpLCBzcHJpdGUuZ2V0SGVpZ2h0KCksIHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vVE9ETyByZW1vdmVcclxuICAgICAgICAvLyB0aGlzLmRyYXdEZWJ1Z0xpbmVzKGNvbnRleHQyRCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBvbkNvbGxpZGVkKG9iamVjdDogQmFzZU9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIGlmIChvYmplY3QgaW5zdGFuY2VvZiBDYXIpIHtcclxuICAgICAgICAgICAgaWYodGhpcy5pc0RlYWQgPT0gZmFsc2Upe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb3N0Q291bnQgPSB0aGlzLmxvc3RDb3VudCArIDE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5pc0RlYWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAvLyB0aGlzLnggPSB0aGlzLnN0YXJ0WDtcclxuICAgICAgICAgICAgLy8gdGhpcy55ID0gdGhpcy5zdGFydFk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SXNEZWFkKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0RlYWQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldElzSW5GaW5hbFBvc2l0aW9uKCk6Ym9vbGVhbntcclxuICAgICAgICByZXR1cm4gdGhpcy5pc0luRmluYWxQb3NpdGlvbjtcclxuICAgIH1cclxufSIsIlxyXG5pbXBvcnQgQmFzZUdhbWUgZnJvbSAnLi4vYmFzZS1nYW1lJztcclxuaW1wb3J0IEJhc2VPYmplY3QgZnJvbSAnLi9iYXNlLW9iamVjdCc7XHJcbmltcG9ydCBDaGlja2VuIGZyb20gJy4vY2hpY2tlbic7XHJcbmltcG9ydCBNYXAgZnJvbSAnLi9tYXAnO1xyXG5pbXBvcnQgeyBNb3ZlRGlyZWN0aW9uIH0gZnJvbSAnLi9tb3ZlLWRpcmVjdGlvbic7XHJcbmltcG9ydCB7IFRyYWZmaWNMYW5lIH0gZnJvbSAnLi90cmFmZmljX2xhbmUnO1xyXG5pbXBvcnQgSW5mb0RpYWxvZyBmcm9tICcuL2luZm8tZGlhbG9nJztcclxuXHJcbmxldCBjYW52YXNTaXplID0ge1xyXG4gICAgJ2NhbnZhc1dpZHRoJzogNDAwLFxyXG4gICAgJ2NhbnZhc0hlaWdodCc6IDYwMCxcclxufTtcclxuXHJcbmNsYXNzIEdhbWUgaW1wbGVtZW50cyBCYXNlR2FtZSB7XHJcblxyXG4gICAgcHJpdmF0ZSBvYmplY3RzOiBBcnJheTxCYXNlT2JqZWN0PjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihjYW52YXNXaWR0aDpudW1iZXIsIGNhbnZhc0hlaWdodDpudW1iZXIpIHtcclxuICAgICAgICBjYW52YXNTaXplLmNhbnZhc1dpZHRoID0gY2FudmFzV2lkdGggLyAyO1xyXG4gICAgICAgIGNhbnZhc1NpemUuY2FudmFzSGVpZ2h0ID0gY2FudmFzSGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLm9iamVjdHMgPSBbXTtcclxuICAgICAgICB0aGlzLmFkZE9iamVjdChuZXcgTWFwKDI1LCAxOSkpO1xyXG4gICAgICAgIGxldCBjaGlja2VuID0gbmV3IENoaWNrZW4oMTg0LCAyODgpO1xyXG4gICAgICAgIHRoaXMuYWRkT2JqZWN0KGNoaWNrZW4pO1xyXG5cclxuICAgICAgICBsZXQgbGFuZTEgPSBuZXcgVHJhZmZpY0xhbmUoMCwyMzAsIDQwMCwgMzIsIE1vdmVEaXJlY3Rpb24uUklHSFQsIDAuMDUsMTAwKTtcclxuICAgICAgICAvLyBsYW5lMS5hZGRDYXIodGhpcywwLCAwKTtcclxuICAgICAgICAvLyBsYW5lMS5hZGRDYXIodGhpcywwLCA1MDApO1xyXG4gICAgICAgIGxhbmUxLmFkZENhcih0aGlzLDAsIDEwMDApO1xyXG4gICAgICAgIC8vIGxhbmUxLmFkZENhcih0aGlzLDEsIDMwMDApO1xyXG4gICAgICAgIGxhbmUxLmFkZENhcih0aGlzLDEsIDM1MDApO1xyXG4gICAgICAgIC8vIGxhbmUxLmFkZENhcih0aGlzLDEsIDQwMDApO1xyXG4gICAgICAgIC8vIGxhbmUxLmFkZENhcih0aGlzLDIsIDYwMDApO1xyXG4gICAgICAgIGxhbmUxLmFkZENhcih0aGlzLDIsIDY1MDApO1xyXG4gICAgICAgIC8vIGxhbmUxLmFkZENhcih0aGlzLDIsIDcwMDApO1xyXG4gICAgICAgIHRoaXMuYWRkT2JqZWN0KGxhbmUxKTtcclxuXHJcbiAgICAgICAgbGV0IGxhbmUyID0gbmV3IFRyYWZmaWNMYW5lKDAsMjAwLCA0MDAsIDMyLCBNb3ZlRGlyZWN0aW9uLlJJR0hULCAwLjEsMTAwKTtcclxuICAgICAgICBsYW5lMi5hZGRDYXIodGhpcywwLCAwKTtcclxuICAgICAgICBsYW5lMi5hZGRDYXIodGhpcywwLCA1MDApO1xyXG4gICAgICAgIGxhbmUyLmFkZENhcih0aGlzLDAsIDEwMDApO1xyXG4gICAgICAgIGxhbmUyLmFkZENhcih0aGlzLDEsIDMwMDApO1xyXG4gICAgICAgIC8vIGxhbmUyLmFkZENhcih0aGlzLDEsIDM1MDApO1xyXG4gICAgICAgIGxhbmUyLmFkZENhcih0aGlzLDEsIDQwMDApO1xyXG4gICAgICAgIGxhbmUyLmFkZENhcih0aGlzLDIsIDYwMDApO1xyXG4gICAgICAgIC8vIGxhbmUyLmFkZENhcigydGhpcywsIDY1MDApO1xyXG4gICAgICAgIGxhbmUyLmFkZENhcih0aGlzLDIsIDcwMDApO1xyXG4gICAgICAgIHRoaXMuYWRkT2JqZWN0KGxhbmUyKTtcclxuXHJcblxyXG4gICAgICAgIGxldCBsYW5lMyA9IG5ldyBUcmFmZmljTGFuZSgwLDE2NSwgNDAwLCAzMiwgTW92ZURpcmVjdGlvbi5MRUZULCAwLjIsMTAwKTtcclxuICAgICAgICAvLyBsYW5lMy5hZGRDYXIodGhpcywwLCAwKTtcclxuICAgICAgICAvLyBsYW5lMy5hZGRDYXIodGhpcywwLCA1MDApO1xyXG4gICAgICAgIGxhbmUzLmFkZENhcih0aGlzLDAsIDEwMDApO1xyXG4gICAgICAgIC8vIGxhbmUzLmFkZENhcih0aGlzLDEsIDMwMDApO1xyXG4gICAgICAgIC8vIGxhbmUzLmFkZENhcih0aGlzLDEsIDM1MDApO1xyXG4gICAgICAgIGxhbmUzLmFkZENhcih0aGlzLDEsIDQwMDApO1xyXG4gICAgICAgIGxhbmUzLmFkZENhcih0aGlzLDIsIDYwMDApO1xyXG4gICAgICAgIC8vIGxhbmUzLmFkZENhcih0aGlzLDIsIDY1MDApO1xyXG4gICAgICAgIGxhbmUzLmFkZENhcih0aGlzLDIsIDcwMDApO1xyXG4gICAgICAgIHRoaXMuYWRkT2JqZWN0KGxhbmUzKTtcclxuXHJcbiAgICAgICAgXHJcbiAgICAgICAgbGV0IGxhbmU0ID0gbmV3IFRyYWZmaWNMYW5lKDAsMTM1LCA0MDAsIDMyLCBNb3ZlRGlyZWN0aW9uLkxFRlQsIDAuMSwxMDApO1xyXG4gICAgICAgIGxhbmU0LmFkZENhcih0aGlzLDAsIDApO1xyXG4gICAgICAgIC8vIGxhbmU0LmFkZENhcih0aGlzLDAsIDUwMCk7XHJcbiAgICAgICAgbGFuZTQuYWRkQ2FyKHRoaXMsMCwgMTAwMCk7XHJcbiAgICAgICAgbGFuZTQuYWRkQ2FyKHRoaXMsMSwgMzAwMCk7XHJcbiAgICAgICAgbGFuZTQuYWRkQ2FyKHRoaXMsMSwgMzUwMCk7XHJcbiAgICAgICAgbGFuZTQuYWRkQ2FyKHRoaXMsMSwgNDAwMCk7XHJcbiAgICAgICAgbGFuZTQuYWRkQ2FyKHRoaXMsMiwgNjAwMCk7XHJcbiAgICAgICAgbGFuZTQuYWRkQ2FyKHRoaXMsMiwgNjUwMCk7XHJcbiAgICAgICAgbGFuZTQuYWRkQ2FyKHRoaXMsMiwgNzAwMCk7XHJcbiAgICAgICAgdGhpcy5hZGRPYmplY3QobGFuZTQpO1xyXG5cclxuICAgICAgICBcclxuICAgICAgICB0aGlzLmFkZE9iamVjdChuZXcgSW5mb0RpYWxvZyg1MCwgNTAsIDIwMCwgMjAwLCBjaGlja2VuKSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBkcmF3KGNvbnRleHQyRDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELCBpbnRlcnBvbGF0b3I6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIGNvbnRleHQyRC5maWxsU3R5bGUgPSBcIiM1MjUyNTJcIjtcclxuICAgICAgICBjb250ZXh0MkQuZmlsbFJlY3QoMCwgMCwgNjQwLCA0ODApO1xyXG5cclxuXHJcbiAgICAgICAgdGhpcy5vYmplY3RzLmZvckVhY2goZnVuY3Rpb24gKG9iamVjdCkge1xyXG4gICAgICAgICAgICBvYmplY3QuZHJhdyhjb250ZXh0MkQpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGxldCBvYmplY3RzTGlzdCA9IHRoaXMub2JqZWN0cztcclxuXHJcbiAgICAgICAgb2JqZWN0c0xpc3QuZm9yRWFjaChmdW5jdGlvbiAobzEpIHtcclxuICAgICAgICAgICAgb2JqZWN0c0xpc3QuZm9yRWFjaChmdW5jdGlvbiAobzIpIHtcclxuICAgICAgICAgICAgICAgIGlmIChvMSAhPSBvMiAmJiBvMS5pc0NvbGxpZGVkKG8yKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG8xLm9uQ29sbGlkZWQobzIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG8yLm9uQ29sbGlkZWQobzEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgIHRoaXMub2JqZWN0cy5mb3JFYWNoKChvYmplY3QpID0+IHtcclxuICAgICAgICAgICAgb2JqZWN0LnVwZGF0ZSh0aGlzLCBkZWx0YSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSByZWN5Y2xlZCBvYmplY3RzXHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9iamVjdCA9IHRoaXMub2JqZWN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5zaG91bGRCZVJlY3ljbGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub2JqZWN0cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICAgICAgICAtLWk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBhZGRPYmplY3Qob2JqZWN0OiBCYXNlT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0T2JqZWN0QnlJZChpZDogc3RyaW5nKTogQmFzZU9iamVjdCB8IHVuZGVmaW5lZCB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLm9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IG9iamVjdCA9IHRoaXMub2JqZWN0c1tpXTtcclxuICAgICAgICAgICAgaWYgKG9iamVjdC5nZXRJZCgpICYmIG9iamVjdC5nZXRJZCgpID09IGlkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqZWN0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBHYW1lO1xyXG5leHBvcnQgeyBjYW52YXNTaXplLCBHYW1lIH07IiwiaW1wb3J0IEJhc2VPYmplY3QgZnJvbSBcIi4vYmFzZS1vYmplY3RcIjtcclxuaW1wb3J0IENoaWNrZW4gZnJvbSBcIi4vY2hpY2tlblwiO1xyXG5pbXBvcnQgeyBHYW1lLCBjYW52YXNTaXplIH0gZnJvbSBcIi4vZ2FtZVwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5mb0RpYWxvZyBleHRlbmRzIEJhc2VPYmplY3R7XHJcbiAgICBwcml2YXRlIGNoaWNrZW46IENoaWNrZW47XHJcbiAgICBwcml2YXRlIHRleHQ6c3RyaW5nID0gXCJXaW5cIjtcclxuICAgIHByaXZhdGUgaXNWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGFuaW1hdGlvbkRlbHRhOiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBhbmltYXRpb25NYXhEZWx0YTogbnVtYmVyID0gNDAwO1xyXG4gICAgcHJpdmF0ZSB3aW5UaXRsZTogc3RyaW5nID0gXCJXaW5uZXIgd2lubmVyIGNoaWNrZW4gZGlubmVyIVwiO1xyXG4gICAgcHJpdmF0ZSB3aW5TdWJ0aXRsZTogc3RyaW5nID0gXCJjbGljayBTUEFDRSB0byBwbGF5IGFnYWluXCI7XHJcbiAgICBwcml2YXRlIGxvc3RUaXRsZTogc3RyaW5nID0gXCJZb3UgaGF2ZSBsb3N0IVwiO1xyXG4gICAgcHJpdmF0ZSBsb3N0U3VidGl0bGU6IHN0cmluZyA9IFwiY2xpY2sgU1BBQ0UgdG8gcGxheSBhZ2FpblwiO1xyXG4gICAgcHJpdmF0ZSB0aXRsZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgc3VidGl0bGU6IHN0cmluZyA9IFwiXCI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoeDpudW1iZXIsIHk6bnVtYmVyLCB3aWR0aDpudW1iZXIsIGhlaWdodDpudW1iZXIsIGNoaWNrZW46IENoaWNrZW4pe1xyXG4gICAgICAgIHN1cGVyKHgsIHksIHdpZHRoLCBoZWlnaHQpXHJcbiAgICAgICAgdGhpcy5jaGlja2VuID0gY2hpY2tlbjtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgdXBkYXRlKGdhbWU6IEdhbWUsIGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRpdGxlID0gXCJcIjtcclxuICAgICAgICB0aGlzLnN1YnRpdGxlID0gXCJcIjtcclxuICAgICAgICBpZih0aGlzLmNoaWNrZW4uZ2V0SXNEZWFkKCkpe1xyXG4gICAgICAgICAgICB0aGlzLnRpdGxlID0gdGhpcy5sb3N0VGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuc3VidGl0bGUgPSB0aGlzLmxvc3RTdWJ0aXRsZTtcclxuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EZWx0YSA9IHRoaXMuYW5pbWF0aW9uRGVsdGEgKyBkZWx0YTtcclxuICAgICAgICAgICAgaWYodGhpcy5hbmltYXRpb25EZWx0YSA+IHRoaXMuYW5pbWF0aW9uTWF4RGVsdGEpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpb25EZWx0YSA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYodGhpcy5hbmltYXRpb25EZWx0YSA8IHRoaXMuYW5pbWF0aW9uTWF4RGVsdGEgLyAyKXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzVmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIGlmKHRoaXMuY2hpY2tlbi5nZXRJc0luRmluYWxQb3NpdGlvbigpKXtcclxuICAgICAgICAgICAgdGhpcy50aXRsZSA9IHRoaXMud2luVGl0bGU7XHJcbiAgICAgICAgICAgIHRoaXMuc3VidGl0bGUgPSB0aGlzLndpblN1YnRpdGxlO1xyXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRlbHRhID0gdGhpcy5hbmltYXRpb25EZWx0YSArIGRlbHRhO1xyXG4gICAgICAgICAgICBpZih0aGlzLmFuaW1hdGlvbkRlbHRhID4gdGhpcy5hbmltYXRpb25NYXhEZWx0YSl7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkRlbHRhID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLmFuaW1hdGlvbkRlbHRhIDwgdGhpcy5hbmltYXRpb25NYXhEZWx0YSAvIDIpe1xyXG4gICAgICAgICAgICAgICAgdGhpcy5pc1Zpc2libGUgPSB0cnVlO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIHRoaXMuaXNWaXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY29udGV4dDJEOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpIHtcclxuICAgICAgICBpZih0aGlzLmlzVmlzaWJsZSl7XHJcbiAgICAgICAgICAgIGxldCB3ID0gMjAwO1xyXG4gICAgICAgICAgICBsZXQgaCA9IDEwMDtcclxuICAgICAgICAgICAgbGV0IHggPSBjYW52YXNTaXplLmNhbnZhc1dpZHRoIC8gMiAtIHcgLyAyO1xyXG4gICAgICAgICAgICBsZXQgeSA9IDMwO1xyXG4gICAgICAgICAgICBpZih0aGlzLnRpdGxlLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDJELmZvbnQgPSBcIjI1cHggQ29taWMgU2FucyBNU1wiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDJELmZpbGxTdHlsZSA9IFwicmVkXCI7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0MkQudGV4dEFsaWduID0gXCJjZW50ZXJcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQyRC50ZXh0QmFzZWxpbmUgPSBcImJvdHRvbVwiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KHRoaXMudGl0bGUsIHggKyB3IC8gMiwgeSArIGggLyAyIC0gMTAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZih0aGlzLnN1YnRpdGxlLmxlbmd0aCA+IDApe1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDJELmZvbnQgPSBcIjE0cHggQ29taWMgU2FucyBNU1wiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDJELmZpbGxTdHlsZSA9IFwiYmxhY2tcIjtcclxuICAgICAgICAgICAgICAgIGNvbnRleHQyRC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgICAgICAgICAgY29udGV4dDJELnRleHRCYXNlbGluZSA9IFwiYm90dG9tXCI7XHJcbiAgICAgICAgICAgICAgICBjb250ZXh0MkQuZmlsbFRleHQodGhpcy5zdWJ0aXRsZSwgeCArIHcgLyAyLCB5ICsgaCAvIDIgKyAxNSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRleHQyRC5mb250ID0gXCIxNHB4IENvbWljIFNhbnMgTVNcIjtcclxuICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIGNvbnRleHQyRC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnRleHQyRC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gICAgICAgIGNvbnRleHQyRC5maWxsVGV4dCh0aGlzLmNoaWNrZW4ud2luQ291bnQudG9TdHJpbmcoKSwgMTAsIDIwKTtcclxuXHJcbiAgICAgICAgY29udGV4dDJELmZvbnQgPSBcIjEwcHggQ29taWMgU2FucyBNU1wiO1xyXG4gICAgICAgIGNvbnRleHQyRC5maWxsU3R5bGUgPSBcImJsYWNrXCI7XHJcbiAgICAgICAgY29udGV4dDJELnRleHRBbGlnbiA9IFwiY2VudGVyXCI7XHJcbiAgICAgICAgY29udGV4dDJELnRleHRCYXNlbGluZSA9IFwidG9wXCI7XHJcbiAgICAgICAgY29udGV4dDJELmZpbGxUZXh0KFwid2luXCIsIDEwLCAxMCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQyRC5mb250ID0gXCIxNHB4IENvbWljIFNhbnMgTVNcIjtcclxuICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIGNvbnRleHQyRC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnRleHQyRC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gICAgICAgIGNvbnRleHQyRC5maWxsVGV4dCh0aGlzLmNoaWNrZW4ubG9zdENvdW50LnRvU3RyaW5nKCksIDM1LCAyMCk7XHJcblxyXG4gICAgICAgIGNvbnRleHQyRC5mb250ID0gXCIxMHB4IENvbWljIFNhbnMgTVNcIjtcclxuICAgICAgICBjb250ZXh0MkQuZmlsbFN0eWxlID0gXCJibGFja1wiO1xyXG4gICAgICAgIGNvbnRleHQyRC50ZXh0QWxpZ24gPSBcImNlbnRlclwiO1xyXG4gICAgICAgIGNvbnRleHQyRC50ZXh0QmFzZWxpbmUgPSBcInRvcFwiO1xyXG4gICAgICAgIGNvbnRleHQyRC5maWxsVGV4dChcImxvc3RcIiwgMzUsIDEwKTtcclxuICAgIH1cclxufSIsImltcG9ydCBCYXNlT2JqZWN0IGZyb20gXCIuL2Jhc2Utb2JqZWN0XCI7XHJcbmltcG9ydCBTcHJpdGUgZnJvbSBcIi4uL3Nwcml0ZVwiO1xyXG5pbXBvcnQgSW1hZ2VMb2FkZXIgZnJvbSBcIi4uL2ltYWdlLWxvYWRlclwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNYXAgZXh0ZW5kcyBCYXNlT2JqZWN0IHtcclxuXHJcbiAgICBwdWJsaWMgc2luZ2xlVGlsZVNpemU6IG51bWJlciA9IDE2O1xyXG4gICAgcHVibGljIGltYWdlczogQXJyYXk8U3ByaXRlIHwgdW5kZWZpbmVkPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHdpZHRoOm51bWJlciwgaGVpZ2h0Om51bWJlcikge1xyXG5cclxuICAgICAgICBzdXBlcigwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcclxuXHJcbiAgICAgICAgbGV0IF9nZXRTcHJpdGUgPSBJbWFnZUxvYWRlci5nZXRTcHJpdGU7XHJcbiAgICAgICAgdGhpcy5pbWFnZXMgPSBbXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1jZW50ZXJcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1jZW50ZXJcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1kaXJ0eS10b3BcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1kaXJ0eS1jZW50ZXJcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1kaXJ0eS1jZW50ZXJcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1kaXJ0eS1jZW50ZXJcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1kaXJ0eS1jZW50ZXJcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1kaXJ0eS1jZW50ZXJcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1kaXJ0eS1ib3R0b21cIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJncmFzcy1jZW50ZXJcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJyb2FkLWJsYWNrLXRvcFwiKSxcclxuICAgICAgICAgICAgX2dldFNwcml0ZShcInJvYWQtYmxhY2stbGluZS1ib3R0b21cIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJyb2FkLWJsYWNrLWxpbmUtdG9wXCIpLFxyXG4gICAgICAgICAgICBfZ2V0U3ByaXRlKFwicm9hZC1ibGFjay1saW5lLWJvdHRvbVwiKSxcclxuICAgICAgICAgICAgX2dldFNwcml0ZShcInJvYWQtYmxhY2stbGluZS10b3BcIiksXHJcbiAgICAgICAgICAgIF9nZXRTcHJpdGUoXCJyb2FkLWJsYWNrLWxpbmUtYm90dG9tXCIpLFxyXG4gICAgICAgICAgICBfZ2V0U3ByaXRlKFwicm9hZC1ibGFjay1saW5lLXRvcFwiKSxcclxuICAgICAgICAgICAgX2dldFNwcml0ZShcInJvYWQtYmxhY2stYm90dG9tXCIpLFxyXG4gICAgICAgICAgICBfZ2V0U3ByaXRlKFwiZ3Jhc3MtY2VudGVyXCIpLFxyXG5cclxuICAgICAgICBdXHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGRyYXcoY29udGV4dDJEOiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmltYWdlcy5mb3JFYWNoKChzcHJpdGU6IFNwcml0ZSB8IHVuZGVmaW5lZCwgaGVpZ2h0SW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc3ByaXRlKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IobGV0IGkgPSAwOyBpIDwgdGhpcy53aWR0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0MkQuZHJhd0ltYWdlKHNwcml0ZS5nZXRJbWFnZSgpLCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgc3ByaXRlLmdldFgoKSwgc3ByaXRlLmdldFkoKSwgc3ByaXRlLmdldFdpZGh0KCksIHNwcml0ZS5nZXRIZWlnaHQoKSwgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2luZ2xlVGlsZVNpemUgKiBpLCB0aGlzLnNpbmdsZVRpbGVTaXplICogaGVpZ2h0SW5kZXgsIHRoaXMuc2luZ2xlVGlsZVNpemUsIHRoaXMuc2luZ2xlVGlsZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGUoZ2FtZTogR2FtZSwgZGVsdGE6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3VuZHMge1xyXG4gICAgcHVibGljIGxlZnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyB0b3A6IG51bWJlcjtcclxuICAgIHB1YmxpYyByaWdodDogbnVtYmVyO1xyXG4gICAgcHVibGljIGJvdHR0b206IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihsZWZ0ID0gMCwgdG9wID0gMCwgcmlnaHQgPSAwLCBib3R0b20gPSAwKSB7XHJcbiAgICAgICAgdGhpcy5sZWZ0ID0gbGVmdDtcclxuICAgICAgICB0aGlzLnRvcCA9IHRvcDtcclxuICAgICAgICB0aGlzLnJpZ2h0ID0gcmlnaHQ7XHJcbiAgICAgICAgdGhpcy5ib3R0dG9tID0gYm90dG9tO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyB3aWR0aCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJpZ2h0IC0gdGhpcy5sZWZ0O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBoZWlnaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ib3R0dG9tIC0gdGhpcy50b3A7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGVmdCA+PSB0aGlzLnJpZ2h0IHx8IHRoaXMudG9wID49IHRoaXMuYm90dHRvbTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgaW5zZXQoZHg6IG51bWJlciwgZHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMubGVmdCArPSBkeDtcclxuICAgICAgICB0aGlzLnJpZ2h0IC09IGR4O1xyXG4gICAgICAgIHRoaXMudG9wICs9IGR5O1xyXG4gICAgICAgIHRoaXMuYm90dHRvbSAtPSBkeTtcclxuICAgIH1cclxufSIsIlxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBWZWN0b3IyZCB7XHJcbiAgICBwdWJsaWMgeDogbnVtYmVyO1xyXG4gICAgcHVibGljIHk6IG51bWJlcjtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih4ID0gMCwgeSA9IDApIHtcclxuICAgICAgICB0aGlzLnggPSB4O1xyXG4gICAgICAgIHRoaXMueSA9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHNldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMueCA9IHg7XHJcbiAgICAgICAgdGhpcy55ID0geTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgY2xlYXIoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy54ID0gMDtcclxuICAgICAgICB0aGlzLnkgPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBub3JtYWxpemUoKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IG1hZyA9IHRoaXMubWFnbml0dWRlKCk7XHJcbiAgICAgICAgaWYgKG1hZyAhPSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMueCA9IHRoaXMueCAvIG1hZztcclxuICAgICAgICAgICAgdGhpcy55ID0gdGhpcy55IC8gbWFnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgbWFnbml0dWRlKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnkpO1xyXG4gICAgfVxyXG5cclxuXHJcbn0iLCJcclxuZXhwb3J0IGVudW0gTW92ZURpcmVjdGlvbiB7XHJcbiAgICBMRUZULCBUT1AsIFJJR0hULCBCT1RUT01cclxufSIsImltcG9ydCBCYXNlT2JqZWN0IGZyb20gXCIuL2Jhc2Utb2JqZWN0XCI7XHJcbmltcG9ydCB7IE1vdmVEaXJlY3Rpb24gfSBmcm9tIFwiLi9tb3ZlLWRpcmVjdGlvblwiO1xyXG5pbXBvcnQgR2FtZSBmcm9tIFwiLi9nYW1lXCI7XHJcbmltcG9ydCB7IENhciB9IGZyb20gXCIuL2NhclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyYWZmaWNMYW5lIGV4dGVuZHMgQmFzZU9iamVjdCB7XHJcblxyXG4gICAgcHJpdmF0ZSBkaXJlY3Rpb246IE1vdmVEaXJlY3Rpb247XHJcbiAgICBwcml2YXRlIHNwZWVkOiBudW1iZXI7XHJcbiAgICBwcml2YXRlIGxhbmVEaXN0YW5jZSA9IDA7XHJcbiAgICBwcml2YXRlIHN0YXJ0T2Zmc2V0OiBudW1iZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSBjYXJzOiBDYXJbXSA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZGlyZWN0aW9uOiBNb3ZlRGlyZWN0aW9uLCBzcGVlZDogbnVtYmVyLCBzdGFydE9mZnNldDogbnVtYmVyKSB7XHJcbiAgICAgICAgc3VwZXIoeCwgeSwgd2lkdGgsIGhlaWdodCk7XHJcbiAgICAgICAgdGhpcy5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG4gICAgICAgIHRoaXMuc3RhcnRPZmZzZXQgPSBzdGFydE9mZnNldDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkQ2FyKGdhbWU6R2FtZSwgY2FyVHlwZTogbnVtYmVyLCBzdGFydERlbGF5OiBudW1iZXIpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmxhbmVEaXN0YW5jZSA9IHRoaXMuc3RhcnRPZmZzZXQgKyB0aGlzLnNwZWVkICogc3RhcnREZWxheTtcclxuICAgICAgICBsZXQgeCA9IHRoaXMubGVmdERpcmVjdGlvbigpID8gdGhpcy5sYW5lRGlzdGFuY2UgOiB0aGlzLmdldFdpZHRoKCkgLSB0aGlzLmxhbmVEaXN0YW5jZTtcclxuICAgICAgICBsZXQgeSA9IHRoaXMueSArIHRoaXMuZ2V0SGVpZ2h0KCkgLyAyICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTA7XHJcbiAgICAgICAgbGV0IGNhcjpDYXIgPSBuZXcgQ2FyKHgsIHksIHRoaXMuc3BlZWQsIGNhclR5cGUsIHRoaXMuZGlyZWN0aW9uKTtcclxuICAgICAgICB0aGlzLmNhcnMucHVzaChjYXIpO1xyXG4gICAgICAgIGdhbWUuYWRkT2JqZWN0KGNhcik7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHVwZGF0ZShnYW1lOiBHYW1lLCBkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IHtcclxuICAgICAgICAgICAgLy8gY2FyLnVwZGF0ZShnYW1lLCBkZWx0YSk7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmxlZnREaXJlY3Rpb24oKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGNhci5nZXRYKCkgKyBjYXIuZ2V0V2lkdGgoKSA8IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeCA9IGNhci5nZXRYKCkgKyBNYXRoLm1heCh0aGlzLmxhbmVEaXN0YW5jZSwgdGhpcy5nZXRXaWR0aCgpICsgY2FyLmdldFdpZHRoKCkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCB5ID0gdGhpcy55ICsgdGhpcy5nZXRIZWlnaHQoKSAvIDIgKyAoTWF0aC5yYW5kb20oKSAtIDAuNSkgKiAxMDtcclxuICAgICAgICAgICAgICAgICAgICBjYXIuc2V0WCh4KTtcclxuICAgICAgICAgICAgICAgICAgICBjYXIuc2V0WSh5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChjYXIuZ2V0WCgpID4gdGhpcy5nZXRXaWR0aCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHggPSBjYXIuZ2V0WCgpIC0gTWF0aC5tYXgodGhpcy5sYW5lRGlzdGFuY2UsIHRoaXMuZ2V0V2lkdGgoKSArIGNhci5nZXRXaWR0aCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgeSA9IHRoaXMueSArIHRoaXMuZ2V0SGVpZ2h0KCkgLyAyICsgKE1hdGgucmFuZG9tKCkgLSAwLjUpICogMTA7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyLnNldFgoeCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FyLnNldFkoeSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGxlZnREaXJlY3Rpb24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uID09IE1vdmVEaXJlY3Rpb24uTEVGVDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZHJhdyhjb250ZXh0MkQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCkge1xyXG4gICAgICAgIC8vIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiB7XHJcbiAgICAgICAgLy8gICAgIGNhci5kcmF3KGNvbnRleHQyRCk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICB9XHJcbn0iLCJcclxuaW1wb3J0IFNwcml0ZSBmcm9tICcuL3Nwcml0ZSc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbWFnZUxvYWRlciB7XHJcblxyXG4gICAgcHJpdmF0ZSBzdGF0aWMgc3ByaXRlczogTWFwPHN0cmluZywgU3ByaXRlPiA9IG5ldyBNYXAoKTtcclxuXHJcbiAgICBwdWJsaWMgc3RhdGljIGxvYWQoKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICByZXR1cm4gUHJvbWlzZS5hbGwoW1xyXG4gICAgICAgICAgICBJbWFnZUxvYWRlci5sb2FkQXNzZXQoXCJhc3NldHMvZHVjay5wbmdcIiwgXCJhc3NldHMvZHVjay5qc29uXCIpLFxyXG4gICAgICAgICAgICBJbWFnZUxvYWRlci5sb2FkQXNzZXQoXCJhc3NldHMvbWFwLnBuZ1wiLCBcImFzc2V0cy9tYXAuanNvblwiKSxcclxuICAgICAgICAgICAgSW1hZ2VMb2FkZXIubG9hZEFzc2V0KFwiYXNzZXRzL2ZlYXRoZXJzLnBuZ1wiLCBcImFzc2V0cy9mZWF0aGVycy5qc29uXCIpXHJcbiAgICAgICAgXSk7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBsb2FkQXNzZXQoaW1hZ2VGaWxlUGF0aDogc3RyaW5nLCBqc29uRmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcclxuICAgICAgICAgICAgSW1hZ2VMb2FkZXIubG9hZEpTT04oanNvbkZpbGVQYXRoKSxcclxuICAgICAgICAgICAgSW1hZ2VMb2FkZXIubG9hZEltYWdlKGltYWdlRmlsZVBhdGgpXSlcclxuICAgICAgICAgICAgLnRoZW4oKHJlc3BvbnNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgW2pzb24sIGltYWdlc10gPSByZXNwb25zZTtcclxuICAgICAgICAgICAgICAgIE9iamVjdC5rZXlzKGpzb24pLmZvckVhY2goKGlkKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IFt4LCB5LCB3LCBoXSA9IGpzb25baWRdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBzcHJpdGU6IFNwcml0ZSA9IG5ldyBTcHJpdGUoaWQsIGltYWdlcywgeCwgeSwgdywgaCk7XHJcbiAgICAgICAgICAgICAgICAgICAgSW1hZ2VMb2FkZXIuc3ByaXRlcy5zZXQoaWQsIHNwcml0ZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRJbWFnZShmaWxlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxIVE1MSW1hZ2VFbGVtZW50PiB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPEhUTUxJbWFnZUVsZW1lbnQ+KGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IG5ldyBJbWFnZSgpO1xyXG5cclxuICAgICAgICAgICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShpbWFnZSk7XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCBmdW5jdGlvbiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChlcnJvcik7XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIGltYWdlLnNyYyA9IGZpbGVQYXRoO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGxvYWRKU09OKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPGFueT4ge1xyXG4gICAgICAgIHJldHVybiBmZXRjaChmaWxlUGF0aCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0U3ByaXRlKGlkOiBzdHJpbmcpOiBTcHJpdGUgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiBJbWFnZUxvYWRlci5zcHJpdGVzLmdldChpZCk7XHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4iLCJleHBvcnQgZGVmYXVsdCAgY2xhc3MgS2V5Ym9hcmQge1xyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgU1BBQ0U6IG51bWJlciA9IDMyO1xyXG4gICAgcHVibGljIHN0YXRpYyBBUlJPV19VUDogbnVtYmVyID0gMzg7XHJcbiAgICBwdWJsaWMgc3RhdGljIEFSUk9XX0RPV046IG51bWJlciA9IDQwO1xyXG4gICAgcHVibGljIHN0YXRpYyBBUlJPV19MRUZUOiBudW1iZXIgPSAzNztcclxuICAgIHB1YmxpYyBzdGF0aWMgQVJST1dfUklHSFQ6IG51bWJlciA9IDM5O1xyXG5cclxuICAgIHByaXZhdGUgc3RhdGljIGtleXM6IEFycmF5PGJvb2xlYW4+ID0gW107XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBpc1ByZXNzZWQoa2V5OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gS2V5Ym9hcmQua2V5c1trZXldO1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0UHJlc3NlZChrZXk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIEtleWJvYXJkLmtleXNba2V5XSA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIHN0YXRpYyBzZXRSZWxlYXNlZChrZXk6IG51bWJlcik6IHZvaWQge1xyXG4gICAgICAgIEtleWJvYXJkLmtleXNba2V5XSA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxufSBcclxuXHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFNwcml0ZSB7XHJcbiAgICBwcml2YXRlIGlkOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50O1xyXG4gICAgcHJpdmF0ZSB4OiBudW1iZXI7XHJcbiAgICBwcml2YXRlIHk6IG51bWJlcjtcclxuICAgIHByaXZhdGUgd2lkdGg6IG51bWJlcjtcclxuICAgIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XHJcblxyXG4gICAgY29uc3RydWN0b3IoaWQ6IHN0cmluZywgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQsIHg6IG51bWJlciwgeTogbnVtYmVyLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcikge1xyXG4gICAgICAgIHRoaXMuaWQgPSBpZDtcclxuICAgICAgICB0aGlzLmltYWdlID0gaW1hZ2U7XHJcbiAgICAgICAgdGhpcy54ID0geDtcclxuICAgICAgICB0aGlzLnkgPSB5O1xyXG4gICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcclxuICAgICAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pZDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SW1hZ2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW1hZ2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy54O1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyBnZXRZKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMueTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0V2lkaHQoKTogbnVtYmVyIHtcclxuICAgICAgICByZXR1cm4gdGhpcy53aWR0aDtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xyXG4gICAgfVxyXG59XHJcblxyXG4iXSwic291cmNlUm9vdCI6IiJ9