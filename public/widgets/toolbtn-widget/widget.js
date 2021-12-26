function _typeof(fgzu0110) {
    return (_typeof = ('function' == typeof Symbol) && ('symbol' == typeof Symbol.iterator) ? function (mvvc0103) {
        return typeof mvvc0103;
    } : function (gdfY0030) {
        return gdfY0030 && ('function' == typeof Symbol) && gdfY0030['constructor'] === Symbol && gdfY0030 !== Symbol.prototype ? 'symbol' : typeof gdfY0030;
    })(fgzu0110);
}

function _classCallCheck(fev30110, jjMv0000) {
    if (!(fev30110 instanceof jjMv0000)) throw new TypeError('Cannot call a class as a function');
}

function _defineProperties(hkd20010, e1ci0031) {
    for (var f9Uq0001 = 0x0; f9Uq0001 < e1ci0031.length; f9Uq0001++) {
        var iPiD0010 = e1ci0031[f9Uq0001];
        iPiD0010.enumerable = iPiD0010['enumerable'] || !0x1, iPiD0010.configurable = !0x0, 'value' in iPiD0010 && (iPiD0010['writable'] = !0x0), Object['defineProperty'](hkd20010, iPiD0010.key, iPiD0010);
    }
}

function _createClass(ex620100, haaW0220, hE6X0000) {
    return haaW0220 && _defineProperties(ex620100.prototype, haaW0220), hE6X0000 && _defineProperties(ex620100, hE6X0000), ex620100;
}

function _inherits(fdC80000, imys0000) {
    if ('function' != typeof imys0000 && (null != imys0000)) throw new TypeError('Super\x20expression\x20must\x20either\x20be\x20null\x20or\x20a\x20function');
    fdC80000.prototype = Object.create(imys0000 && imys0000.prototype, {
        'constructor': {
            'value': fdC80000,
            'writable': !0x0,
            'configurable': !0x0
        }
    }), imys0000 && _setPrototypeOf(fdC80000, imys0000);
}

function _setPrototypeOf(idVg0302, ilns0011) {
    return (_setPrototypeOf = Object.setPrototypeOf || function (gpqv0111, n7Sb0002) {
        return gpqv0111.__proto__ = n7Sb0002, gpqv0111;
    })(idVg0302, ilns0011);
}

function _createSuper(fqlE0010) {
    var edgI0210 = _isNativeReflectConstruct();
    return function () {
        var gCVa0000, eaul0201 = _getPrototypeOf(fqlE0010);
        return _possibleConstructorReturn(this, edgI0210 ? (gCVa0000 = _getPrototypeOf(this).constructor, Reflect.construct(eaul0201, arguments, gCVa0000)) : eaul0201.apply(this, arguments));

    };
}

function _possibleConstructorReturn(iznf0001, istE0100) {
    var gkne0003 = {
        'Mrics': 'object', 'nfeAv': function (etLp0000, glnh0001) {
            return etLp0000(glnh0001);
        }, 'tGYXW': function (fPeV0010, ga1I0300) {
            return fPeV0010 != ga1I0300;
        }, 'yoPAi': function (i42f0003, hLpU0010) {
            return i42f0003(hLpU0010);
        }
    };
    return !istE0100 || gkne0003.Mrics !== gkne0003.nfeAv(_typeof, istE0100) && gkne0003.tGYXW('function', typeof istE0100) ? gkne0003.yoPAi(_assertThisInitialized, iznf0001) : istE0100;
}

function _assertThisInitialized(hMuj0000) {

    if (void 0x0 === hMuj0000) throw new ReferenceError('this hasnt been initialised - super() hasnt been called');
    return hMuj0000;
}

function _isNativeReflectConstruct() {
    if ('undefined' == typeof Reflect || !Reflect.construct) return !0x1;
    if (Reflect.construct['sham']) return !0x1;
    if ('function' == typeof Proxy) return !0x0;
    try {
        return Date['prototype'].toString['call'](Reflect.construct(Date, [], function () {
        })), !0x0;
    } catch (fcXn0200) {
        return !0x1;
    }
}

function _getPrototypeOf(f8Gw0000) {
    return (_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function (gv2K0100) {
        return gv2K0100['__proto__'] || Object['getPrototypeOf'](gv2K0100);
    })(f8Gw0000);
}

!function (f1ym0000) {
    var eZMj0001 = function () {
        'use strict';
        _inherits(i1s30010, f1ym0000.widget.BaseWidget);
        var g6vU0000 = _createSuper(i1s30010);

        function i1s30010() {
            return _classCallCheck(this, i1s30010), g6vU0000.apply(this, arguments);
        }

        return _createClass(i1s30010, [{
            'key': 'create', 'value': function () {
            }
        }, {
            'key': 'winCreateOK', 'value': function (hZjt0011) {
                $('.cesium-home-button').after($(hZjt0011['_dom']));
                var hkvn0110 = ($('.cesium-viewer-toolbar')['height']() + 0x28);
                $('.compass').css({'bottom': (hkvn0110 + 'px')}), $('.cesium-toolbar-button').click(function () {
                    var tqff0110,
                        jcep0131 = $(this).attr('data-widget');
                    haoutil['isutil'].isNull(jcep0131) || ($('#mytoobar-menuview').hide(0x12c), tqff0110 = $(this).attr('title'), f1ym0000.widget.activate({
                        'uri': jcep0131,
                        'name': tqff0110
                    }));
                }), $('#btn-widget-toobar')['click'](function () {

                    $('#mytoobar-menuview')['is'](':hidden') ? $('#mytoobar-menuview')['show'](0x12c) : $('#mytoobar-menuview').hide(0x12c);

                }), ($('#mars3d-container').append('<div id=\x22mytoobar-menuview\x22\x20class=\x22toolbar-dropdown-menu-div\x22>' +
                    '<ul\x20class=\x22toolbar-dropdown-menu\x22>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/measure/widget.js\x22><a href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-calculator\x22></i>图上量算</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/analysis/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-bar-chart\x22></i>空间分析</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/centerXY/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-map-pin\x22></i>坐标定位</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/navXZQH/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-paper-plane\x22></i>地区导航</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/addmarker/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-edit\x22></i>我的标记</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/bookmark/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-tags\x22></i>视角书签</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/mapCompare/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-window-restore\x22></i>分屏对比</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/mapSwipe/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-columns\x22></i>卷帘对比</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/newplot/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-object-group\x22></i>图上标绘</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/czmlEditor/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-object-group\x22></i>CZML编辑</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/roamLine/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-send-o\x22></i>飞行漫游</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/print/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-print\x22></i>地图打印</a></li>' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/shareUrl/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-share\x22></i>分享地图</a></li>' +
                    '<li class="widget-btn" data-widget="widgets/storiesEditor/widget.js"><a href="javascript:void(0)"><i class="fa fa-film"></i>故事编辑</a></li>\n' +
                    '<li class="widget-btn" data-widget="widgets/plot_model/widget.js"><a href="javascript:void(0)"><i class="fa fa-building-o"></i>模型标绘</a></li>\n' +
                    '<li class="widget-btn" data-widget="widgets/historyMaps/widget.js"><a href="javascript:void(0)"><i class="fa fa-building-o"></i>历史变迁</a></li>\n' +
                    '<li\x20class=\x22widget-btn\x22\x20data-widget=\x22widgets/setting/widget.js\x22><a\x20href=\x22javascript:void(0)\x22><i\x20class=\x22fa\x20fa-cog\x22></i>参数设置</a></li>' +
                    '</ul></div>',
                ), $('.toolbar-dropdown-menu .widget-btn').click(function () {

                    $('#mytoobar-menuview')['hide'](0x12c);
                    var i7v70000, ii7l0100,
                        frXh0100 = $(this)['attr']('data-widget');
                    haoutil['isutil'].isNull(frXh0100) || (i7v70000 = $(this)['attr']('data-name'), ii7l0100 = $(this).html().replace('<a href="javascript:void(0)">', '').replace('</a>', ''),
                        f1ym0000['widget'].activate({
                            'uri': frXh0100,
                            'name': i7v70000
                        }));
                }));
            }
        }, {
            'key': 'activate', 'value': function () {
               // this.viewer.mars['on'](f1ym0000.event['click'], this.onMapClick, this);
            }
        }, {
            'key': 'disable', 'value': function () {
             //   this.viewer.mars['off'](f1ym0000.event['click'], this.onMapClick, this);
            }
        }, {
            'key': 'onMapClick', 'value': function () {
                $('#mytoobar-menuview').hide(0x12c);
            }
        }, {
            'key': 'view', 'get': function () {
                return {
                    'type': 'append',
                    'url': 'view.html',
                    'parent': '.cesium-viewer-toolbar'
                };
            }
        }]), i1s30010;
    }();
    f1ym0000.widget['bindClass'](eZMj0001);
}((window, mars3d));
