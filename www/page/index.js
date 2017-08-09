(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery', '../component/service.js', '../component/tool.js'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'), require('../component/service.js'), require('../component/tool.js'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery, global.service, global.tool);
        global.index = mod.exports;
    }
})(this, function (exports, _jquery, _service, _tool) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.index = undefined;

    var _jquery2 = _interopRequireDefault(_jquery);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var _createClass = function () {
        function defineProperties(target, props) {
            for (var i = 0; i < props.length; i++) {
                var descriptor = props[i];
                descriptor.enumerable = descriptor.enumerable || false;
                descriptor.configurable = true;
                if ("value" in descriptor) descriptor.writable = true;
                Object.defineProperty(target, descriptor.key, descriptor);
            }
        }

        return function (Constructor, protoProps, staticProps) {
            if (protoProps) defineProperties(Constructor.prototype, protoProps);
            if (staticProps) defineProperties(Constructor, staticProps);
            return Constructor;
        };
    }();

    var index = exports.index = function () {
        function index() {
            _classCallCheck(this, index);
        }

        _createClass(index, [{
            key: 'getPost',
            value: function getPost() {}
        }, {
            key: 'initMouse',
            value: function initMouse(dom) {
                return new _tool.TOOL(dom);
            }
        }]);

        return index;
    }();

    var a = new index();
    var b = a.initMouse('.hm_nav');
});