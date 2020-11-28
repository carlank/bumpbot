"use strict";

require("core-js/modules/es.array.for-each");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.date.to-string");

require("core-js/modules/es.map");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.object.to-string");

require("core-js/modules/es.string.iterator");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * A Bot class to wrap the various channel and source properties for a bumpbot instance (usually only one).
 * @class
 * @property {Map} channels
 * @property {Source[]} sources
 * @property {number} defaultDelay
 */
var Bot = /*#__PURE__*/function () {
  function Bot() {
    _classCallCheck(this, Bot);

    this.channels = new Map();
    this.sources = [];
    this.defaultDelay = 10 * 60;
  }
  /**
   * Update a channel's last updated time.
   * @param  {String} channel Channel ID
   * @param  {Date} date    Date to update to
   */


  _createClass(Bot, [{
    key: "notify",
    value: function notify(channel, date) {
      if (this.channels.has(channel)) {
        this.channels.get(channel).updated = date;
      }
    }
    /**
     * Configure a new channel
     * @param  {String}   channel  Channel ID
     * @param  {Number}   delay    Time between bumps in seconds
     * @param  {Function} callback Callback to execute upon revival
     * @param  {Array}    tags     Tags to considered relevant
     * @throws When refused
     */

  }, {
    key: "configureChannel",
    value: function configureChannel(channel) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref$delay = _ref.delay,
          delay = _ref$delay === void 0 ? this.defaultDelay : _ref$delay,
          _ref$callback = _ref.callback,
          callback = _ref$callback === void 0 ? function () {} : _ref$callback,
          _ref$tags = _ref.tags,
          tags = _ref$tags === void 0 ? [] : _ref$tags;

      if (typeof channel !== 'string') {
        throw new TypeError('ChannelID is not a string');
      }

      if (typeof delay !== 'number') {
        throw new TypeError('Delay is not a number');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('Callback is not a function');
      }

      if (delay < 10) {
        throw 'That\'s too often! Choose a time over 10 seconds.';
      }

      this.channels.set(channel, {
        callback: callback,
        delay: delay,
        updated: new Date(),
        tags: tags
      });
    }
    /**
     * Remove a channel from the watchlist
     * @param  {String}   channel  Channel ID
     * @return {Boolean}           True if removed, false if not present
     */

  }, {
    key: "removeChannel",
    value: function removeChannel(channel) {
      if (typeof channel !== 'string') {
        throw new TypeError('ChannelID is not a string');
      }

      return this.channels["delete"](channel);
    }
    /**
     * Revive all watched channels
     * @param  {Date}    date  Date of revival, normally now.
     */

  }, {
    key: "reviveChannels",
    value: function reviveChannels(date) {
      var _this = this;

      if (!(date instanceof Date)) {
        throw new TypeError('Date is not a Date');
      }

      this.channels.forEach( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(channel) {
          var source;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  if (!(date - channel.updated > channel.delay * 1000)) {
                    _context.next = 12;
                    break;
                  }

                  source = _this.chooseSourceFor(channel);
                  _context.t0 = channel;

                  if (!source) {
                    _context.next = 9;
                    break;
                  }

                  _context.next = 6;
                  return source.getMessage();

                case 6:
                  _context.t1 = _context.sent;
                  _context.next = 10;
                  break;

                case 9:
                  _context.t1 = undefined;

                case 10:
                  _context.t2 = _context.t1;

                  _context.t0.callback.call(_context.t0, _context.t2);

                case 12:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }
    /**
     * Configure a new source
     * @param {StaticSource} source
     */

  }, {
    key: "addSource",
    value: function addSource(source) {
      this.sources.push(source);
    }
    /**
     * Chooses a relevant source for the channel
     * @param {Object} channel
     * @return {Source}
     * @todo pick one at random
     * @todo add weighted random, where weight is # of tags in common
     */

  }, {
    key: "chooseSourceFor",
    value: function chooseSourceFor(channel) {
      var _iterator = _createForOfIteratorHelper(this.sources),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var source = _step.value;

          if (source.isRelevantToAnyOfThese(channel.tags)) {
            return source;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }]);

  return Bot;
}();

exports["default"] = Bot;