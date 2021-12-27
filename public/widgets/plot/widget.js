'use script'; //开发环境建议开启严格模式
(function (window, mars3d) {
  class MyWidget extends mars3d.widget.BaseWidget {
    get resources() {
      return ['js/getGraphicDefStyle.js', '/lib/kml/kml-geojson.js', '/lib/dom2img/dom-to-image.js']
    }

    get view() {
      return {
        'type': 'window',
        'url': 'view.html',
        'windowOptions': { 'width': 0xfa, 'position': { 'top': 0x32, 'right': 0x5, 'bottom': 0x5 } }
      }
    }

    create() {
      var _0x4ab5ca = this
      this.storageName = 'mars3d_plot', this.graphicGroupLayer = new mars3d[('layer')]['GraphicGroupLayer']({
        'name': this.config.name,
        'pid': 0x63,
        'defaultLayer': '默认分组',
        'isRestorePositions': !0x1,
        'hasEdit': !0x1
      }), this.map.addLayer(this.graphicGroupLayer)
      var _0x29e49c = this
      this['graphicGroupLayer']['bindContextMenu']([{
        'text': '删除对象',
        'iconCls': 'fa fa-trash-o',
        'callback': function (_0x2c76b9) {
          _0x2c76b9 = _0x2c76b9.graphic
          _0x2c76b9 && _0x29e49c.deleteEntity(_0x2c76b9)
        }
      }]), this.graphicGroupLayer['on'](mars3d.EventType.drawCreated, function (_0x4bf26f) {
          _0x4ab5ca['showLayerTree']()
          _0x4bf26f = _0x4bf26f.graphic
          _0x4ab5ca.startEditing(_0x4bf26f)

      }), this.graphicGroupLayer['on'](mars3d['EventType']['load'], function (_0x8bc416) {
        haoutil.loading.hide()
      }), this.graphicGroupLayer['on'](mars3d.EventType.editStart, function (_0xe51d88) {
        _0xe51d88 = _0xe51d88.graphic
        _0x4ab5ca['startEditing'](_0xe51d88)
      }), this.graphicGroupLayer['on'](mars3d.EventType.editMovePoint, function (_0x5dbda1) {
        _0x5dbda1 = _0x5dbda1.graphic
        _0x4ab5ca.startEditing(_0x5dbda1)
      }), this.graphicGroupLayer['on'](mars3d['EventType'].editRemovePoint, function (_0x47d8f3) {
        _0x47d8f3 = _0x47d8f3.graphic
        _0x4ab5ca.startEditing(_0x47d8f3)
      }), this.graphicGroupLayer['on'](mars3d.EventType['editStop'], function (_0x2a37f1) {
        _0x2a37f1 = _0x2a37f1.graphic
        _0x4ab5ca.stopEditing(), _0x4ab5ca.sendSaveEntity(_0x2a37f1), _0x4ab5ca.showLayerTree()
      }), this.graphicGroupLayer['on'](mars3d.EventType.updateAttr, function (_0xdfb087) {
        var _0x326f8b = _0xdfb087.graphic
        _0xdfb087.attr.name && _0x4ab5ca.viewWindow && _0x4ab5ca.viewWindow['treeWork'].updateNode(_0x326f8b)
      }), this.graphicGroupLayer['on'](mars3d['EventType']['popupOpen'], function (_0x3c3de2) {
        var _0x8eef53, _0x536813 = _0x3c3de2['container'].querySelector('.mars3d-popup-btn')
        _0x536813 && (_0x8eef53 = _0x3c3de2.graphic, _0x536813['addEventListener']('click', function (_0x477f3a) {
          $('.mars3d-popup-edititem').each(function () {
            var _0x443274 = $(this).val(),
              _0x54dd31 = $(this).attr('data-type')
            _0x8eef53.attr[_0x54dd31] = _0x443274
          }), _0x4ab5ca.map.closePopup()

        }))

      }), this.sendGetList()
    }

    winCreateOK(opt, result) {
      this.viewWindow = result
    }

    activate() {
      this.graphicGroupLayer.hasEdit = !0

    }

    disable() {
      this.stopEditing(), this.graphicGroupLayer.stopDraw(), this.graphicGroupLayer['hasEdit'] = !0x1, this.options.hasClear && this.deleteAll(), this['viewWindow'] = null
    }

    getDefStyle(_0x4ef06d) {
      return getGraphicDefStyle(_0x4ef06d)
    }

    updateTemplateValues(_0x5a2a0a) {
      return this.map.options['templateValues'] ? mars3d.Util['template'](_0x5a2a0a, this.map.options.templateValues) : _0x5a2a0a
    }

    hasEdit(_0x2a1822) {
      this.graphicGroupLayer.hasEdit = _0x2a1822
    }

    hasPopup(_0x4ee2f0) {
      _0x4ee2f0 ? this.graphicGroupLayer.bindPopup(function (_0x436910) {
        _0x436910 = _0x436910.graphic
        return mars3d.Util['getTemplateHtml']({
          'title': '属性编辑',
          'template': [{ 'field': 'name', 'name': '名称' }, {
            'field': 'address',
            'name': '地址'
          }, { 'field': 'phone', 'name': '电话' }, {
            'field': 'remark',
            'name': '备注',
            'type': 'textarea'
          }, { 'name': '确定', 'type': 'button' }],
          'attr': _0x436910.attr,
          'edit': !0x0,
          'width': 0xbe
        })
      }) : this.graphicGroupLayer.unbindPopup()

    }

    startDraw(_0x5c65cf) {
      switch (haoutil.loading['hide'](), _0x5c65cf.type) {
        case 'model':
          _0x5c65cf.drawShow = !0, haoutil.loading.show()
          break
        case 'point':
        case 'font-point':
        case 'billboard':
          _0x5c65cf.drawShow = !0
      }
      console.log('开始绘制', JSON.stringify(_0x5c65cf)),
        this.graphicGroupLayer.startDraw(_0x5c65cf)
    }

    endDraw() {
      this.graphicGroupLayer.endDraw()
    }

    startEditingById(_0x10deb7) {
      _0x10deb7 = this.graphicGroupLayer.getGraphicById(_0x10deb7)
      null != _0x10deb7 && (_0x10deb7['flyTo'](), this.graphicGroupLayer.startEditing(_0x10deb7))

    }

    startEditing(_0x45311f) {
      clearTimeout(this.timeTik)
      if (this.viewWindow != null) {
        var _0x468073 = mars3d.widget.getClass('/widgets/plotAttr/widget.js')
        0x468073.isActivate ? _0x468073.startEditing(_0x45311f, _0x45311f.coordinates) : mars3d.widget['activate']({
          'uri': '/widgets/plotAttr/widget.js',
          'graphic': _0x45311f,
          'lonlats': _0x45311f.coordinates
        })
      }

    }

    stopEditing() {
      this.timeTik = setTimeout(function () {
        mars3d.widget.disable('/widgets/plotAttr/widget.js')
      }, 0xc8)

    }

    flyTo(_0x32acba) {
      this.map.flyToGraphic(_0x32acba, { 'scale': 1.9, 'radius': 0x3e8 })
    }

    getGeoJson(_0xe11911) {
      return (_0xe11911 || this.graphicGroupLayer.toGeoJSON())

    }

    downloadJson(_0x38c875, _0x190051) {
      var _0x481c2d = this.getGeoJson(_0x190051)
      (null == _0x481c2d) || _0x481c2d.features && 0 == _0x481c2d.features.length ? haoutil['msg']('当前未标绘任何数据！') : (_0x190051 = new Date().format('MMddHHmmss'),
        haoutil['file'].downloadFile(((_0x38c875 + '_') + _0x190051) + '.json', JSON.stringify(_0x481c2d)))
    }

    toKml(_0x5a2e1b) {
      if (_0x5a2e1b == null) return null
      _0x5a2e1b = this.getGeoJson(_0x5a2e1b)
      _0x5a2e1b = haoutil.system['clone'](_0x5a2e1b)
      return kgUtil.toKml(_0x5a2e1b, {
        'name': 'Mars3D标绘数据',
        'documentName': 'Mars3D标绘数据文件',
        'documentDescription': '标绘数据 by mars3d.cn',
        'simplestyle': !0x0
      })
    }

    downloadKml(_0x3b59cc, _0x5a6bb7) {
      var _0x157afd = this.toKml(_0x5a6bb7)
      null == _0x157afd ? haoutil['msg']('tokml') : (_0x5a6bb7 = new Date().format('MMddHHmmss'),
        haoutil.file.downloadFile(_0x3b59cc + '_' + _0x5a6bb7 + '.kml', _0x157afd))

    }

    loadGeoJSON(url, options) {
      if (null != url) {
        options = this.graphicGroupLayer.loadGeoJSON(url, options)
        return localforage['setItem'](this.storageName, url), this.showLayerTree(), options
      }
    }

    deleteAll() {
      this.stopEditing(), this.graphicGroupLayer.clear(), this.sendDeleteAll(), this.showLayerTree()
    }

    deleteEntity(_0x19a21e) {
      _0x19a21e.remove(), this.sendDeleteEntity(_0x19a21e), this['showLayerTree']()
    }

    query(_0x1c590a, _0x120787) {
      for (var _0x39b042 = this.graphicGroupLayer.getGraphics(), _0x379bde = [], _0x504217 = 0x0, _0x402535 = 0; (_0x402535 < _0x39b042.length); _0x402535++) {
        var _0x5ec82a, _0x143efc, _0x132f2b = _0x39b042[_0x402535]
        if (('label' == _0x132f2b['type']) ? _0x143efc = _0x132f2b.text : null !== (_0x5ec82a = _0x132f2b.attr) && (void 0 != _0x5ec82a) && _0x5ec82a.name && (_0x143efc = _0x132f2b.attr['name']),
        (null != _0x143efc) && (-1 != _0x143efc['indexOf'](_0x1c590a)) && (_0x379bde.push({
          'name': _0x143efc,
          'type': '标绘 - ' + _0x143efc,
          '_datatype': 'plot',
          '_entity': _0x132f2b
        }), (_0x120787 < ++_0x504217))) {
          break
        }

      }
      return _0x379bde
    }

    showLayerTree() {
      this.viewWindow && this.isActivate && (this.viewWindow.treeWork.loadData(this.graphicGroupLayer.getLayers()), this.sendSaveEntity())
    }

    checkRemoveGroup(_0x43a6db) {
      return !(this.graphicGroupLayer.length < 2) || (haoutil.msg('不能删除所有图层，需要至少保留1个图层！'), !1)
    }

    deleteLayer(_0xfc2e09) {
      return this.graphicGroupLayer.deleteLayer(_0xfc2e09) ? (this.showLayerTree(), haoutil.msg('删除成功！'), !0x0) : (haoutil.msg('删除失败！'), !0x1)
    }

    deleteEmptyLayerf() {
      this.graphicGroupLayer.length < 0x2 ? haoutil['msg']('不能删除所有图层，需要至少保留1个图层！') : (this.graphicGroupLayer.deleteEmptyLayer(), this['showLayerTree']())
    }

    editGroupName(_0x173b66) {
      var that = this
      mars3d.widget.activate({
        'uri': '/widgets/plotGroupName/widget.js',
        'name': _0x173b66 ? '重命名分组' : '新增分组',
        'data': _0x173b66 ? _0x173b66['name'] : '',
        'checkName': function (_0x1f481f) {
          return that.graphicGroupLayer.hasLayer(_0x1f481f, _0x173b66)
        },
        'callback': function (_0x215118) {
          _0x173b66 ? _0x173b66['name'] = _0x215118 : that.graphicGroupLayer.createLayer(_0x215118), that.showLayerTree()
        }
      })

    }

    changeSelectedLayer(_0x35d65a) {

      this.graphicGroupLayer['selectedLayer'] = _0x35d65a, this.showLayerTree()

    }

    moveToLayer(_0x4adae4, _0x2c8685) {
      this.graphicGroupLayer.moveToLayer(_0x4adae4, _0x2c8685), this.showLayerTree()
    }

    sendGetList() {
      var that = this
      window.hasServer || localforage.getItem(this.storageName).then(function (_0x50b86a) {
        (null == _0x50b86a) || 'null' == _0x50b86a ? that.loadDemoData() : (console.log('加载历史缓存数据', _0x50b86a),
          that.loadGeoJSON(_0x50b86a, {
            'clear': !0,
            'flyTo': !0
          }))
      })
    }

    sendSaveEntity(_0x444da0) {
      (null != this.viewWindow) && (console.log('plot:\x20保存了数据'),
      window.hasServer || localforage.setItem(this['storageName'], this.getGeoJson()))

    }

    sendDeleteEntity(_0x349e92) {
      window.hasServer || localforage.setItem(this.storageName, this.getGeoJson())
    }

    sendDeleteAll() {
      window.hasServer || localforage.removeItem(this.storageName)
    }

    loadDemoData() {
      var that = this;
      -1 != window['location'].hostname.indexOf('mars') && $.getJSON('//data.mars3d.cn/file/geojson/mars3d-draw.json',
        function (res) {
          that.isActivate && that.loadGeoJSON(res, { 'clear': !0x0, 'flyTo': !0x0 })
        })
    }
  }

  mars3d.widget.bindClass(MyWidget)
})(window, mars3d)
