'use script'; //开发环境建议开启严格模式
(function (window, mars3d) {
  class MyWidget extends mars3d.widget.BaseWidget {

    get view() {
      return {
        'type': 'append',
        'url': 'view.html',
        'parent': '.cesium-viewer-toolbar'
      }
    }

    create() {
    }
    winCreateOK(hZjt0011) {
      $('.cesium-home-button').after($(hZjt0011['_dom']))
      var hkvn0110 = ($('.cesium-viewer-toolbar')['height']() + 0x28)
      $('.compass').css({ 'bottom': (hkvn0110 + 'px') }), $('.cesium-toolbar-button').click(function () {
        var tqff0110,
          jcep0131 = $(this).attr('data-widget')
        haoutil.isutil.isNull(jcep0131) || ($('#mytoobar-menuview').hide(0x12c), tqff0110 = $(this).attr('title'),
          mars3d.widget.activate({
            'uri': jcep0131,
            'name': tqff0110
          }))
      }), $('#btn-widget-toobar').click(function () {

        $('#mytoobar-menuview')['is'](':hidden') ? $('#mytoobar-menuview')['show'](0x12c) : $('#mytoobar-menuview').hide(0x12c)

      }), ($('#mars3d-container').append('<div id="mytoobar-menuview" class="toolbar-dropdown-menu-div">' +
        '<ul class="toolbar-dropdown-menu">' +
        '<li class="widget-btn" data-widget="/widgets/measure/widget.js"><a href="javascript:void(0)"><i class="fa fa-calculator"></i>图上量算</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/analysis/widget.js"><a href="javascript:void(0)"><i class="fa fa-bar-chart"></i>空间分析</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/centerXY/widget.js"><a href="javascript:void(0)"><i class="fa fa-map-pin"></i>坐标定位</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/navXZQH/widget.js"><a href="javascript:void(0)"><i class="fa fa-paper-plane"></i>地区导航</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/addmarker/widget.js"><a href="javascript:void(0)"><i class="fa fa-edit"></i>我的标记</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/bookmark/widget.js"><a href="javascript:void(0)"><i class="fa fa-tags"></i>视角书签</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/mapCompare/widget.js"><a href="javascript:void(0)"><i class="fa fa-window-restore"></i>分屏对比</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/mapSwipe/widget.js"><a href="javascript:void(0)"><i class="fa fa-columns"></i>卷帘对比</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/plot/widget.js"><a href="javascript:void(0)"><i class="fa fa-object-group"></i>图上标绘</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/czmlEditor/widget.js"><a href="javascript:void(0)"><i class="fa fa-object-group"></i>CZML编辑</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/roamLine/widget.js"><a href="javascript:void(0)"><i class="fa fa-send-o"></i>飞行漫游</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/print/widget.js"><a href="javascript:void(0)"><i class="fa fa-print"></i>地图打印</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/shareUrl/widget.js"><a href="javascript:void(0)"><i class="fa fa-share"></i>分享地图</a></li>' +
        '<li class="widget-btn" data-widget="/widgets/storiesEditor/widget.js"><a href="javascript:void(0)"><i class="fa fa-film"></i>故事编辑</a></li>\n' +
        '<li class="widget-btn" data-widget="/widgets/plot-model/widget.js"><a href="javascript:void(0)"><i class="fa fa-building-o"></i>模型标绘</a></li>\n' +
        '<li class="widget-btn" data-widget="/widgets/historyMaps/widget.js"><a href="javascript:void(0)"><i class="fa fa-building-o"></i>历史变迁</a></li>\n' +
        '<li class="widget-btn" data-widget="/widgets/setting/widget.js"><a href="javascript:void(0)"><i class="fa fa-cog"></i>参数设置</a></li>' +
        '</ul></div>',
      ), $('.toolbar-dropdown-menu .widget-btn').click(function () {

        $('#mytoobar-menuview')['hide'](0x12c)
        var i7v70000, ii7l0100,
          frXh0100 = $(this)['attr']('data-widget')
        haoutil.isutil.isNull(frXh0100) || (i7v70000 = $(this)['attr']('data-name'), ii7l0100 = $(this).html().replace('<a href="javascript:void(0)">', '').replace('</a>', ''),
          mars3d.widget.activate({
            'uri': frXh0100,
            'name': i7v70000
          }))
      }))
    }

    activate() {
      // this.viewer.mars['on'](mars3d.event['click'], this.onMapClick, this);
    }

    disable() {
      //   this.viewer.mars['off'](mars3d.event['click'], this.onMapClick, this);
    }
    onMapClick() {
      $('#mytoobar-menuview').hide(0x12c)
    }

  }

  mars3d.widget.bindClass(MyWidget)
})(window, mars3d)
