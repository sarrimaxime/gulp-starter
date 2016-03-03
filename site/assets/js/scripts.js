(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Event = require('./utils/Event');

var _Event2 = _interopRequireDefault(_Event);

var _W = require('./utils/W');

var _W2 = _interopRequireDefault(_W);

var _Module = require('./modules/Module');

var _Module2 = _interopRequireDefault(_Module);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function App() {
	_classCallCheck(this, App);

	console.log('%c# --------------------o Running App', 'background: #42e34d; color: #0F0F0F;');

	this.module = new _Module2.default();

	var view = require('./../views/ViewExample.nunj');
	console.log(view.render({ data: 'coucou' }));
};

var app = new App();

},{"./../views/ViewExample.nunj":6,"./modules/Module":2,"./utils/Event":3,"./utils/W":4}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _event = require('./../utils/event');

var _event2 = _interopRequireDefault(_event);

var _W = require('./../utils/W');

var _W2 = _interopRequireDefault(_W);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Module = function (_EventEmitter) {
	_inherits(Module, _EventEmitter);

	function Module() {
		_classCallCheck(this, Module);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Module).call(this));

		_this._initContent();
		_this._initEvents();

		return _this;
	}

	// --------------------------------------------------------------o Private

	_createClass(Module, [{
		key: '_initContent',
		value: function _initContent() {}
	}, {
		key: '_initEvents',
		value: function _initEvents() {

			_W2.default.on(_event2.default.RAF, this._onUpdate.bind(this)).on(_event2.default.RESIZE, this._onResize.bind(this));
		}

		// --------------------------------------------------------------o Listeners

	}, {
		key: '_onResize',
		value: function _onResize() {}
	}, {
		key: '_onUpdate',
		value: function _onUpdate() {}

		// --------------------------------------------------------------o Getters

		// --------------------------------------------------------------o Setters

	}]);

	return Module;
}(_tinyEmitter2.default);

exports.default = Module;

},{"./../utils/W":4,"./../utils/event":5,"jquery":"jquery","tiny-emitter":"tiny-emitter"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Event = {
	RESIZE: 'window:resize',
	RAF: 'requestAnimationFrame',

	MOUSEMOVE: 'mousemove',
	MOUSEDOWN: 'mousedown',
	MOUSEUP: 'mouseup',
	MOUSEWHEEL: 'mousewheel',
	MOUSEENTER: 'mouseenter',
	MOUSELEAVE: 'mouseleave',
	CLICK: 'click',

	KEYDOWN: 'keydown',
	KEYUP: 'keyup',

	COMPLETE: 'complete',
	EACH: 'each'
};

},{}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _tinyEmitter = require('tiny-emitter');

var _tinyEmitter2 = _interopRequireDefault(_tinyEmitter);

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _event = require('./event');

var _event2 = _interopRequireDefault(_event);

var _requestAnimationFrameShim = require('request-animation-frame-shim');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var W = function (_EventEmitter) {
	_inherits(W, _EventEmitter);

	function W() {
		_classCallCheck(this, W);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(W).call(this));

		_this.window = (0, _jquery2.default)(window);
		_this.body = (0, _jquery2.default)('body');

		_this.scrollTop = {
			real: 0,
			calc: 0
		};

		_this.ww = (0, _jquery2.default)(window).width();
		_this.wh = (0, _jquery2.default)(window).height();
		_this.sw = screen.width;
		_this.sh = screen.height;

		_this._initContent();
		_this._initEvents();

		return _this;
	}

	// ------------------------------------------------------------o Private

	_createClass(W, [{
		key: '_initContent',
		value: function _initContent() {
			var _this2 = this;

			this._onResize();

			this.rAF = (0, _requestAnimationFrameShim.requestAnimationFrame)(function () {
				_this2._onUpdate(_this2);
			});
		}
	}, {
		key: '_initEvents',
		value: function _initEvents() {
			var _this3 = this;

			this.window.on('load resize', function (e) {
				_this3._onResize(e);
			});
		}
	}, {
		key: '_onResize',
		value: function _onResize() {

			this.ww = this.window.width();
			this.wh = this.window.height();
			this.sw = screen.width;
			this.sh = screen.height;

			this.emit(_event2.default.RESIZE);
		}
	}, {
		key: '_onUpdate',
		value: function _onUpdate(that) {
			var _this4 = this;

			this.emit(_event2.default.RAF);

			this.rAF = (0, _requestAnimationFrameShim.requestAnimationFrame)(function () {
				_this4._onUpdate(_this4);
			});
		}
	}]);

	return W;
}(_tinyEmitter2.default);

exports.default = new W();

},{"./event":5,"jquery":"jquery","request-animation-frame-shim":"request-animation-frame-shim","tiny-emitter":"tiny-emitter"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = Event = {
	RESIZE: 'window:resize',
	RAF: 'requestAnimationFrame',

	MOUSEMOVE: 'mousemove',
	MOUSEDOWN: 'mousedown',
	MOUSEUP: 'mouseup',
	MOUSEWHEEL: 'mousewheel',
	MOUSEENTER: 'mouseenter',
	MOUSELEAVE: 'mouseleave',
	CLICK: 'click',

	KEYDOWN: 'keydown',
	KEYUP: 'keyup',

	COMPLETE: 'complete',
	EACH: 'each'
};

},{}],6:[function(require,module,exports){
module.exports = "<p>{{ data }}</p>";

},{}]},{},[1]);

//# sourceMappingURL=maps/scripts.js.map
