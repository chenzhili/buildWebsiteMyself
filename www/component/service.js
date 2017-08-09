(function (global, factory) {
    if (typeof define === "function" && define.amd) {
        define(['exports', 'rxjs/Observable', 'jquery', 'rxjs/add/observable/of', 'rxjs/add/operator/map'], factory);
    } else if (typeof exports !== "undefined") {
        factory(exports, require('rxjs/Observable'), require('jquery'), require('rxjs/add/observable/of'), require('rxjs/add/operator/map'));
    } else {
        var mod = {
            exports: {}
        };
        factory(mod.exports, global.Observable, global.jquery, global.of, global.map);
        global.service = mod.exports;
    }
})(this, function (exports, _Observable, _jquery) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.POSTM = undefined;

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

    var POSTM = exports.POSTM = function () {
        function POSTM() {
            _classCallCheck(this, POSTM);
        }

        //ajax查询函数


        _createClass(POSTM, [{
            key: 'pollQuery',
            value: function pollQuery(params) {
                var self = params;
                self.payload = params.payload || {};
                self.action = params.action || '';
                var req = {
                    'url': self.url + self.action,
                    'data': self.payload,
                    'dataType': 'jsonp'
                };
                return _Observable.Observable.create(function (observer) {
                    _jquery2.default.ajax({
                        'url': req.url,
                        'data': req.data,
                        'type': 'post',
                        'beforeSend': function beforeSend(xhr) {
                            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                        },
                        success: function success(data) {
                            observer.next(data);
                        },
                        error: function error(i, data) {
                            observer.next(data);
                        }
                    });
                });
            }
        }]);

        return POSTM;
    }();

    /**
     * 回到顶部*/
    (function (root) {
        'use strict';

        function goTop(params) {
            this.dom = params.dom;
            this.times = params.times || '30';
            this.isTop = params.isTop || '';
            this.speed = params.speed || '6';
            this.bind();
        }

        goTop.prototype.bind = function () {
            var _this = this;
            var timer = null;
            var isTop = true;
            var clientHeight = document.documentElement.clientHeight;
            var speed = 0;
            root.onscroll = function () {
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                if (osTop >= clientHeight) {
                    //显示按钮
                    (0, _jquery2.default)(_this.dom).css('display', 'block');
                } else {
                    //隐藏按钮
                    (0, _jquery2.default)(_this.dom).css('display', 'none');
                    if (osTop < 10) {
                        clearTimeout(timer);
                    }
                }
                if (!isTop) {
                    clearTimeout(timer);
                }
                isTop = false;
            };
            (0, _jquery2.default)(this.dom).on('click', function (e) {
                goTfn();
            });
            function goTfn() {
                var osTop = document.documentElement.scrollTop || document.body.scrollTop;
                speed += _this.speed;
                document.documentElement.scrollTop = document.body.scrollTop = osTop - speed;
                timer = setTimeout(goTfn, _this.times);
                isTop = true;
                if (osTop < 10) {
                    clearTimeout(timer);
                }
            }
        };
        root.goTop = function (params) {
            new goTop(params);
        };
    })(window);
    /**
     * 弹出提示
     * class名,√或×,提示信息，显示时间,添加的dom位置
     * */
    (function (root) {
        'use strict';

        function modal_title(cName, judge, title, time, dom) {
            this.dom = dom || "";
            this.cName = cName;
            this.title = title;
            this.time = time || 1000;
            this.judge = judge;
            this.bind();
        }
        modal_title.prototype.bind = function () {
            var _this = this;
            var timer = null;
            clearTimeout(timer);
            var o = '<div class="modal-msg"><div class="modal-mtitle"><span class="modal-judge">×</span><span class="modal-mMsg"></span></div></div>';
            (0, _jquery2.default)('body').append(o);
            (0, _jquery2.default)('.modal-judge').addClass(_this.cName);
            (0, _jquery2.default)('.modal-judge').html(_this.judge);
            (0, _jquery2.default)('.modal-mMsg').html(_this.title);
            (0, _jquery2.default)('body').css('overflow', 'hidden');
            (0, _jquery2.default)('.modal-msg').fadeIn();
            timer = setTimeout(function () {
                (0, _jquery2.default)('.modal-msg').remove();
                (0, _jquery2.default)('body').removeAttr("style");
            }, _this.time);
        };

        root.modal_title = function (cName, judge, title, time, dom) {
            new modal_title(cName, judge, title, time, dom);
        };
    })(window);
    /**
     *确认框
     * 放入的Params对象，两个回调函数，确认和取消
     * 可传入title提示文字
     * 可传入取消框的字，取消框的class，确认框同理
     * */
    (function (root) {
        'use strict';

        function modal_confirm(params, fn, efn) {
            this.params = params;
            this.efn = efn;
            this.fn = fn;
            this.bind();
        }
        modal_confirm.prototype.bind = function () {
            var _this = this;
            var o = '<div class="modal_confirm"><div class="modal_cBox"><h3 class="modal_h">确认框</h3><a href="javascript:;" class="modal_d_btn cancel">取消</a> <a href="javascript:;" class="modal_d_btn confirm modal_g_btn">确认</a> <span class="modal_close">✕</span></div></div>';
            (0, _jquery2.default)('body').append(o);
            (0, _jquery2.default)('.modal_h').html(_this.params.title);
            (0, _jquery2.default)('.cancel').addClass(_this.params.cName);
            (0, _jquery2.default)('.confirm').addClass(_this.params.aName);
            (0, _jquery2.default)('.cancel').html(_this.params.cT);
            (0, _jquery2.default)('.confirm').html(_this.params.aT);
            (0, _jquery2.default)('.modal_confirm').fadeIn();
            (0, _jquery2.default)('.modal_close').on('click', function () {
                (0, _jquery2.default)('.modal_confirm').remove();
            });
            (0, _jquery2.default)('.cancel').on('click', function () {
                if (_this.efn) {
                    _this.efn();
                }
                (0, _jquery2.default)('.modal_confirm').remove();
            });
            (0, _jquery2.default)('.confirm').on('click', function () {
                if (_this.fn) {
                    _this.fn();
                }
                (0, _jquery2.default)('.modal_confirm').remove();
            });
        };
        root.modal_confirm = function (params, fn, efn) {
            new modal_confirm(params, fn, efn);
        };
    })(window);
    /**
     * 自定义分享插件*/
    (function (root) {
        'use strict';

        function share(params) {
            this.params = params;
            this.dom = params.dom;
            this.type = params.type;
            this.config = {
                'weibo': ['新浪微博', 'http://service.weibo.com/share/share.php?'],
                'qqweibo': ['腾讯微博', 'http://share.v.t.qq.com/index.php?c=share&a=index'],
                'qq': ['QQ好友', 'http://connect.qq.com//widget/shareqq/index.html?'],
                'qqzone': ['QQ空间', 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'],
                'wx': ['微信分享', ''],
                'rr': ['人人分享', 'http://widget.renren.com/dialog/share?'],
                'bdtb': ['百度贴吧', 'http://tieba.baidu.com/f/commit/share/openShareApi?'],
                'db': ['豆瓣', 'http://shuo.douban.com/!service/share?'],
                'qqpy': ['朋友网', 'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?to=pengyou&'],
                'kx': ['开心网', 'http://www.kaixin001.com/login/open_login.php?']
            };
            this.core();
        };
        share.prototype.core = function () {
            var _this = this,
                type = this.type,
                ercode = '',
                result = this.config[type][1],

            /*urls   = encodeURIComponent((_this.params[type] && _this.params[type].url) ? _this.params[type].url : _this.params.url),
            title  = encodeURIComponent((_this.params[type] && _this.params[type].title) ? _this.params[type].title : (_this.params.title)?_this.params.title:''),
            images = encodeURIComponent((_this.params[type] && _this.params[type].images) ? _this.params[type].images :( _this.params.images)? _this.params.images:''),
            desc   = encodeURIComponent((_this.params[type] && _this.params[type].desc) ? _this.params[type].desc : (_this.params.desc)?_this.params.desc:''),
            summary = encodeURIComponent((_this.params[type] && _this.params[type].summary) ? _this.params[type].summary : (_this.params.summary)?_this.params.summary:''),
            site   = encodeURIComponent((_this.params[type] && _this.params[type].site) ? _this.params[type].site : '');*/
            urls = _this.params[type] && _this.params[type].url ? _this.params[type].url : _this.params.url,
                title = _this.params[type] && _this.params[type].title ? _this.params[type].title : _this.params.title ? _this.params.title : '',
                images = _this.params[type] && _this.params[type].images ? _this.params[type].images : _this.params.images ? _this.params.images : '',
                desc = _this.params[type] && _this.params[type].desc ? _this.params[type].desc : _this.params.desc ? _this.params.desc : '',
                summary = _this.params[type] && _this.params[type].summary ? _this.params[type].summary : _this.params.summary ? _this.params.summary : '',
                site = _this.params[type] && _this.params[type].site ? _this.params[type].site : '';
            if (type != 'wx') {
                switch (type) {
                    case 'weibo':
                        result += 'title=' + title + '&url=' + urls + '&pic=' + images;break;
                    case 'qqweibo':
                        result += '&title=' + title + '&url=' + urls + '&pic=' + images;break;
                    case 'qq':
                        result += 'url=' + urls + '&title=' + title + '&desc=' + desc + '&summary=' + summary + '&pics=' + images + '&site=' + site;break;
                    case 'qqzone':
                        result += 'url=' + urls + '&title=' + title + '&desc=' + desc + '&summary=' + summary + '&pic=' + images + '&site=' + site;break;
                    case 'rr':
                        result += 'resourceUrl=' + urls + '&title=' + title + '&description=' + desc + '&pic=' + images;break;
                    case 'bdtb':
                        result += 'title=' + title + '&url=' + urls + '&pic=' + images + '&desc=' + desc;break;
                    case 'db':
                        result += 'image=' + images + '&href=' + urls + '&name=' + title + '&text=' + desc;break;
                    case 'qqpy':
                        result += 'pics=' + images + '&url=' + urls + '&title=' + title + '&desc=' + desc + '&summary=' + summary;break;
                    case 'kx':
                        result += '&url=' + urls + '&rtitle=' + title;break;
                }

                window.open(result, _this.params.target);
            } else {
                wx();
            }
            function wx() {}
        };
        root.share = function (params) {
            new share(params);
        };
    })(window);
    /**自定义拖拽*/
    (function (root) {
        'use strict';

        function dragging(params) {
            this.dom = params.dom;
            this.move = params.move || 'both';
            this.hander = params.hander || '1';
            this.randomPosition = params.randomPosition || 'true';
            this.bind();
        }
        dragging.prototype.bind = function () {
            var _this = (0, _jquery2.default)(this.dom);
            var xPage;var yPage;var X;var Y;var xRand = 0;var yRand = 0;var father = _this.parent();
            var opt = this;
            var movePosition = opt.move;
            var random = opt.randomPosition;
            var hander = opt.hander;
            if (hander == 1) {
                hander = _this;
            } else {
                hander = opt.hander;
            }
            father.css({ "position": "relative", "overflow": "hidden" });
            _this.css({ "position": "absolute" });
            hander.css({ "cursor": "move" });
            var faWidth = father.width();
            var faHeight = father.height();
            var thisWidth = _this.width() + parseInt(_this.css('padding-left')) + parseInt(_this.css('padding-right'));
            var thisHeight = _this.height() + parseInt(_this.css('padding-top')) + parseInt(_this.css('padding-bottom'));

            var mDown = false; //
            var positionX;
            var positionY;
            var moveX;
            var moveY;

            if (random == 'true') {
                _thisRandom();
            }
            function _thisRandom() {
                //随机函数
                _this.each(function (index) {
                    var randY = parseInt(Math.random() * (faHeight - thisHeight)); ///
                    var randX = parseInt(Math.random() * (faWidth - thisWidth)); ///
                    if (movePosition.toLowerCase() == 'x') {
                        (0, _jquery2.default)(this).css({
                            left: randX
                        });
                    } else if (movePosition.toLowerCase() == 'y') {
                        (0, _jquery2.default)(this).css({
                            top: randY
                        });
                    } else if (movePosition.toLowerCase() == 'both') {
                        (0, _jquery2.default)(this).css({
                            top: randY,
                            left: randX
                        });
                    }
                });
            }

            hander.mousedown(function (e) {
                father.children().css({ "zIndex": "0" });
                _this.css({ "zIndex": "1" });
                mDown = true;
                X = e.pageX;
                Y = e.pageY;
                positionX = _this.position().left;
                positionY = _this.position().top;
                return false;
            });

            (0, _jquery2.default)(document).mouseup(function (e) {
                mDown = false;
            });

            (0, _jquery2.default)(document).mousemove(function (e) {
                xPage = e.pageX; //--
                moveX = positionX + xPage - X;

                yPage = e.pageY; //--
                moveY = positionY + yPage - Y;

                function thisXMove() {
                    //x轴移动
                    if (mDown == true) {
                        _this.css({ "left": moveX });
                    } else {
                        return;
                    }
                    if (moveX < 0) {
                        _this.css({ "left": "0" });
                    }
                    if (moveX > faWidth - thisWidth) {
                        _this.css({ "left": faWidth - thisWidth });
                    }
                    return moveX;
                }

                function thisYMove() {
                    //y轴移动
                    if (mDown == true) {
                        _this.css({ "top": moveY });
                    } else {
                        return;
                    }
                    if (moveY < 0) {
                        _this.css({ "top": "0" });
                    }
                    if (moveY > faHeight - thisHeight) {
                        _this.css({ "top": faHeight - thisHeight });
                    }
                    return moveY;
                }

                function thisAllMove() {
                    //全部移动
                    if (mDown == true) {
                        _this.css({ "left": moveX, "top": moveY });
                    } else {
                        return;
                    }
                    if (moveX < 0) {
                        _this.css({ "left": "0" });
                    }
                    if (moveX > faWidth - thisWidth) {
                        _this.css({ "left": faWidth - thisWidth });
                    }

                    if (moveY < 0) {
                        _this.css({ "top": "0" });
                    }
                    if (moveY > faHeight - thisHeight) {
                        _this.css({ "top": faHeight - thisHeight });
                    }
                }
                if (movePosition.toLowerCase() == "x") {
                    thisXMove();
                } else if (movePosition.toLowerCase() == "y") {
                    thisYMove();
                } else if (movePosition.toLowerCase() == 'both') {
                    thisAllMove();
                }
            });
        };
        root.dragging = function (params) {
            new dragging(params);
        };
    })(window);
});