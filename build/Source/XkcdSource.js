"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.object.get-prototype-of");

require("core-js/modules/es.object.set-prototype-of");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.reflect.construct");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

var _axios = _interopRequireDefault(require("axios"));

var _Source2 = _interopRequireDefault(require("./Source.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var _require = require('discord.js'),
    MessageEmbed = _require.MessageEmbed;

var XkcdSource = /*#__PURE__*/function (_Source) {
  _inherits(XkcdSource, _Source);

  var _super = _createSuper(XkcdSource);

  function XkcdSource() {
    _classCallCheck(this, XkcdSource);

    return _super.call(this, ['xkcd']);
  }
  /**
   * @return {string}
   */


  _createClass(XkcdSource, [{
    key: "getMessage",
    value: function () {
      var _getMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var embed, response, latestComic, randomComicID, url, comicResponse, _comicResponse$data, title, img, alt;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                embed = 'Failed to create new embed';
                _context.next = 3;
                return _axios["default"].get('http://xkcd.com/info.0.json');

              case 3:
                response = _context.sent;
                latestComic = response.data['num'];
                randomComicID = Math.floor(Math.random() * latestComic + 1);

                if (randomComicID == 404) {
                  randomComicID = 0;
                } // Avoid 404 page


                url = 'http://xkcd.com/' + randomComicID + '/info.0.json';
                _context.next = 10;
                return _axios["default"].get(url);

              case 10:
                comicResponse = _context.sent;
                _comicResponse$data = comicResponse.data, title = _comicResponse$data.title, img = _comicResponse$data.img, alt = _comicResponse$data.alt;
                embed = new MessageEmbed().setImage(img).setTitle(title).setFooter(alt);
                return _context.abrupt("return", embed);

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function getMessage() {
        return _getMessage.apply(this, arguments);
      }

      return getMessage;
    }()
  }]);

  return XkcdSource;
}(_Source2["default"]);

exports["default"] = XkcdSource;