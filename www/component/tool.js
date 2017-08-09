(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'jquery'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('jquery'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.jquery);
        global.tool = mod.exports;
    }
})(this, function (exports, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.NavModal = exports.TotalModal = exports.TOOL = undefined;

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

    var TOOL = exports.TOOL = function () {
        function TOOL(dom) {
            _classCallCheck(this, TOOL);

            this._MouseOverEvent(dom);
        }

        //鼠标移入弹出控制


        _createClass(TOOL, [{
            key: '_MouseOverEvent',
            value: function _MouseOverEvent(dom) {
                var _this = this;

                var ctrl = dom || '';
                var domx = (0, _jquery2.default)(ctrl);
                domx.hover(function () {
                    (0, _jquery2.default)('.tools').html('');
                    var wh = domx.offset();
                    var ht = domx.innerHeight();
                    _this.judegeTotal(ctrl, wh, ht);
                }, function (e) {
                    if (e.toElement == (0, _jquery2.default)('.ctrl_tools')[0]) return;else {
                        _this._toolsInit();
                    }
                });
                (0, _jquery2.default)('.ctrl_tools').on('mouseleave', function (e) {
                    if (e.toElement == (0, _jquery2.default)(domx)[0]) return;else {
                        _this._toolsInit();
                    }
                });
            }

            //鼠标移除控制

        }, {
            key: '_MouseOutEvent',
            value: function _MouseOutEvent(dom) {
                (0, _jquery2.default)(dom).on('mouseleave', function () {});
            }

            //tools控制层初始化

        }, {
            key: '_toolsInit',
            value: function _toolsInit() {
                (0, _jquery2.default)('.ctrl_tools').removeAttr("style");
                (0, _jquery2.default)('.tools').html('');
                (0, _jquery2.default)('.ctrl_tools').off('mouseout');
            }

            //判断弹出层

        }, {
            key: 'judegeTotal',
            value: function judegeTotal(dom, wh, ht) {
                var domx;
                dom.match('.') ? domx = dom.replace('.', '') : domx = dom.replace('#', '');
                //console.log(dom);
                switch (domx) {
                    case 'hm_nav':
                        this.hmtotalMouse(dom, wh, ht);
                        break;
                }
            }

            //导航对应弹出层

        }, {
            key: 'hmtotalMouse',
            value: function hmtotalMouse(dom, wh, ht) {
                var left = Math.floor(wh.left);
                var ht = Math.floor(ht + wh.top);
                var modal = new TotalModal();
                var tag = '<ul class="hm_nav_tl"><li class="hm_li_clnm">管理栏目</li><li>更换模板</li><li>隐藏</li></ul>';
                (0, _jquery2.default)('.tools').html(tag);
                (0, _jquery2.default)('.ctrl_tools').css({ 'top': ht, 'left': left });
                (0, _jquery2.default)('.hm_li_clnm').on('click', function () {
                    var ta = (0, _jquery2.default)(dom).find("a");
                    var params = {
                        modal: {
                            dom: ta
                        }
                    };
                    modal.modalTotal(params);
                });
            }
        }]);

        return TOOL;
    }();

    var TotalModal = exports.TotalModal = function () {
        function TotalModal() {
            _classCallCheck(this, TotalModal);
        }
        //模态框总控制函数


        _createClass(TotalModal, [{
            key: 'modalTotal',
            value: function modalTotal(params, fn, efn) {
                var _this2 = this;

                var modal = new NavModal()._centerModal(params.modal);
                var dom = modal || '';
                var title = params.title || '栏目管理';
                var ok = params.ok || '确定';
                var cancel = params.cancel || "取消";
                var dom_box = '<div class="modal_box"><div class="modal_box_ct"><div class="mbc_hd"><h2>' + title + '</h2><span class="m_frs m_cls">×</span></div>' + '<div class="modal_box_inc_val">' + dom + '</div>' + '<div class="mbc_hd"><div class="mbc_ok">' + ok + '</div><div class="mbc_cancel m_cls">' + cancel + '</div></div></div></div>';

                this._remove('.modal_box');
                this._create(dom_box);
                (0, _jquery2.default)('.m_cls').on('click', function () {
                    _this2._remove('.modal_box');
                    efn != undefined ? efn() : '';
                });
                (0, _jquery2.default)('.mbc_ok').on('click', function () {
                    fn != undefined ? fn() : '';
                    _this2._remove('.modal_box');
                });
            }
            //初始化

        }, {
            key: '_create',
            value: function _create(dom) {
                (0, _jquery2.default)('body').append(dom);
            }
            //删除

        }, {
            key: '_remove',
            value: function _remove(dom) {
                (0, _jquery2.default)(dom).remove();
            }
        }]);

        return TotalModal;
    }();

    var NavModal = exports.NavModal = function () {
        function NavModal() {
            _classCallCheck(this, NavModal);
        }

        _createClass(NavModal, [{
            key: '_centerModal',
            value: function _centerModal(params) {
                var dom = params.dom || '';
                var fetch = this._foreachModal(dom);
                var domx = '<div class="md_nav_box"><h2 class="md_add_ct"><span>添加栏目</span></h2><div class="md_box">' + '<div class="mbc_hd"><span class="col-30 f-p-l">栏目名称</span><span class="col-30 f-p-c">开启栏目</span><span class="col-30 f-p-r">操作</span></div>' + '<div class="mb-p-8">' + fetch + '</div></div></div>';
                return domx;
            }
        }, {
            key: '_foreachModal',
            value: function _foreachModal(dom) {
                var str = '';
                for (var i = 0; i < dom.length; ++i) {
                    str += '<ul class="mbc_item"><li class="col-30"><span>' + (0, _jquery2.default)(dom).eq(i).html() + '</span><a href="javascript:;" class="md_arrow md_up"></a>' + '<a href="javascript:;" class="md_arrow md_down"></a></li>' + '<li class="col-30 cf-green f-p-c">√</li>' + '<li class="col-30 f-p-r"><a href="javascript:;">[编辑]</a><a href="javascript:;">[删除]</a></li></ul>';
                }
                return str;
            }
        }, {
            key: '_removeModal',
            value: function _removeModal() {}
        }, {
            key: '_addModal',
            value: function _addModal() {}
        }, {
            key: '_editModal',
            value: function _editModal() {}
        }]);

        return NavModal;
    }();
});