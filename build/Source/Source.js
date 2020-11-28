"use strict";

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.define-property");

require("core-js/modules/es.string.includes");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("regenerator-runtime/runtime");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Source = /*#__PURE__*/function () {
  /**
   * @param {string[]} tags  The tags to respond to
   */
  function Source(tags) {
    _classCallCheck(this, Source);

    this.tags = tags;
  }
  /**
   * Check if the source has any of the given tags
   * @param {string[]} tags The tags we're looking for
   * @return {boolean}      Whether one of the tags corresponds to our own
   */


  _createClass(Source, [{
    key: "isRelevantToAnyOfThese",
    value: function isRelevantToAnyOfThese(tags) {
      for (var tag in this.tags) {
        if (tags.includes(this.tags[tag])) {
          return true;
        }
      }

      return false;
    }
    /**
     * @return {string}
     */

  }, {
    key: "getMessage",
    value: function () {
      var _getMessage = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", 'NO MESSAGE DEFINED');

              case 1:
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

  return Source;
}();

exports["default"] = Source;