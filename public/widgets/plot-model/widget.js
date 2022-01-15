'use script'; //开发环境建议开启严格模式
(function (window, mars3d) {
  class MyWidget extends mars3d.widget.BaseWidget {
    get resources() {
      return ['js/getGraphicDefStyle.js', '/lib/kml/kml-geojson.js']
    }

    get view() {
      return {
        'type': 'window',
        'url': 'view.html',
        'windowOptions': { 'width': 0xfa, 'position': { 'top': 0x32, 'right': 0x5, 'bottom': 0x5 } }
      }
    }

    create() {
      var that = this
      this.storageName = 'mars3d_plot_model';
      this.graphicGroupLayer = new mars3d.layer.GraphicGroupLayer({
        'name': this.config.name,
        'pid': 0x63,
        'defaultLayer': '默认分组',
        'hasEdit': !1
      });
      this.map.addLayer(this.graphicGroupLayer)

      this.graphicGroupLayer.bindContextMenu([{
        'text': '删除对象',
        'iconCls': 'fa fa-trash-o',
        'callback': function (_0x452763) {
          _0x452763.graphic && that.deleteEntity(_0x452763.graphic)
        }
      }]);

      this.graphicGroupLayer.on(mars3d.EventType.drawCreated, function (_0x40bfe7) {
        that.showLayerTree()
        that.startEditing(_0x40bfe7.graphic)
      }), this.graphicGroupLayer.on(mars3d.EventType.load, function (_0x550bb1) {
        haoutil.loading.hide()
      }), this.graphicGroupLayer.on(mars3d.EventType.editStart, function (_0x5bc1c3) {
        that.startEditing(_0x5bc1c3.graphic)
      }), this.graphicGroupLayer.on(mars3d.EventType.editMovePoint, function (_0x9b617a) {
        that.startEditing(_0x9b617a.graphic)
      }), this.graphicGroupLayer['on'](mars3d.EventType.editRemovePoint, function (_0x4c0de2) {
        that.startEditing(_0x4c0de2.graphic)
      }), this.graphicGroupLayer.on(mars3d.EventType.editStop, function (_0x2c350c) {
        that.stopEditing(), that.sendSaveEntity(_0x2c350c.graphic), that.showLayerTree()
      }), this.graphicGroupLayer['on'](mars3d.EventType.updateAttr, function (_0x34156) {
        _0x34156.attr.name && that.viewWindow && that.viewWindow.treeWork.updateNode(_0x34156.graphic)
      }), this.sendGetList()

    }

    winCreateOK(_0x429710, _0x5242aa) {
      this.viewWindow = _0x5242aa
    }

    activate() {
      this.graphicGroupLayer.hasEdit = !0x0
    }

    disable() {
      this.stopEditing(), this.graphicGroupLayer.stopDraw(), this.graphicGroupLayer.hasEdit = !1, this.viewWindow = null
    }

    getDefStyle(_0x3a897e) {
      return getGraphicDefStyle(_0x3a897e)
    }

    updateTemplateValues(_0x2027c4) {
      return this.map.options.templateValues ? mars3d.Util.template(_0x2027c4, this.map.options.templateValues) : _0x2027c4
    }

    hasEdit(_0x4ababb) {
      this.graphicGroupLayer.hasEdit = _0x4ababb
    }

    hasPopup(_0x12bfb2) {
      {
        var _0x3b60ac = this
        _0x12bfb2 ? this.graphicGroupLayer['bindPopup'](function (_0x5e6f69) {
          _0x5e6f69 = _0x5e6f69.graphic
          return mars3d.Util.getTemplateHtml({
            'title': '属性编辑',
            'template': [{ 'field': 'name', 'name': '名称' }, {
              'field': 'address',
              'name': '地址'
            }, { 'field': 'phone', 'name': '电话' }, {
              'field': 'remark',
              'name': '备注',
              'type': 'textarea'
            }, { 'name': '确定', 'type': 'button' }],
            'attr': _0x5e6f69.attr,
            'edit': !0,
            'width': 0xbe
          })
        }, {
          'onAdd': function (_0x446e77) {
            var _0x360666 = _0x446e77['id'], _0x4551ef = _0x446e77.graphic
            $((('#' + _0x360666) + ' .mars3d-popup-btn')).click(function (_0x24c00c) {
              $(('#' + _0x360666) + ' .mars3d-popup-edititem').each(function () {
                var _0x5a67ce = $(this)['val'](),
                  _0x1f9d2b = $(this).attr('data-type')
                _0x4551ef['attr'][_0x1f9d2b] = _0x5a67ce

              }), _0x3b60ac.graphicGroupLayer['closePopup']()
            })

          }, 'onRemove': function (_0x3e3b2b, _0x4eaed5) {
          }, 'anchor': [0, -0x14]
        }) : this.graphicGroupLayer.unbindPopup()
      }
    }

    startDraw(_0x2e1fe3) {
      _0x2e1fe3 && ('model' == _0x2e1fe3['type']) ? (_0x2e1fe3.colorBlendMode = Cesium.ColorBlendMode['MIX'],
        _0x2e1fe3.drawShow = !0x0, haoutil.loading.show()) : haoutil.loading.hide(), console.log('开始绘制', _0x2e1fe3), this.graphicGroupLayer.startDraw(_0x2e1fe3)
    }

    endDraw() {
      this.graphicGroupLayer.endDraw()
    }

    startEditingById(_0x5eabe1) {
      _0x5eabe1 = this.graphicGroupLayer.getGraphicById(_0x5eabe1)
      null != _0x5eabe1 && (_0x5eabe1.flyTo(), this.graphicGroupLayer.startEditing(_0x5eabe1))
    }

    startEditing(_0x2ce7a5) {
      var _0x155ac0
      clearTimeout(this.timeTik), null != this.viewWindow && ((_0x155ac0 = mars3d.widget.getClass('/widgets/plotAttr/widget.js')) && _0x155ac0.isActivate ? _0x155ac0.startEditing(_0x2ce7a5, _0x2ce7a5.coordinates) : mars3d.widget['activate']({
        'uri': '/widgets/plotAttr/widget.js',
        'graphic': _0x2ce7a5,
        'lonlats': _0x2ce7a5.coordinates
      }))

    }

    stopEditing() {
      this.timeTik = setTimeout(function () {
        mars3d.widget.disable('/widgets/plotAttr/widget.js')
      }, 0xc8)
    }

    flyTo(_0x360e81) {
      this.map.flyToGraphic(_0x360e81, { 'scale': 1.9, 'radius': 0x3e8 })
    }

    getGeoJson(_0x48a115) {
      return (_0x48a115 || this.graphicGroupLayer).toGeoJSON()
    }

    downloadJson(name, _0x3a2134) {
      var geojson = this.getGeoJson(_0x3a2134)
      if ((null == geojson) || geojson.features && (0 == geojson.features.length)) {
        haoutil.msg('当前未标绘任何数据！')
        return
      }
      if(window.isVue)
      {
        mars3d.widget.fire("saveGeoJson",geojson)
      }
      else
      {
        haoutil.file.downloadFile(((name + '_' + new Date().format('MMddHHmmss')) + '.json'), JSON.stringify(geojson))
      }


    }

    toKml(_0x166e64) {
      if (null == this.getGeoJson(_0x166e64)) return null
      _0x166e64 = haoutil.system.clone(_0x166e64)
      return kgUtil.toKml(_0x166e64, {
        'name': 'Mars3D标绘数据',
        'documentName': 'Mars3D标绘数据文件',
        'documentDescription': '标绘数据 by mars3d.cn',
        'simplestyle': !0
      })
    }

    downloadKml(_0x5e55ea, _0x4a8bab) {
      var _0x36ed03 = this.toKml(_0x4a8bab)
      (null == _0x36ed03) ? haoutil.msg('当前未标绘任何数据！') : (_0x4a8bab = new Date().format('MMddHHmmss'),
        haoutil.file.downloadFile((_0x5e55ea + '_' + _0x4a8bab) + '.kml', _0x36ed03))

    }

    loadGeoJSON(_0x54bca3, config) {
      if (null != _0x54bca3) {
        console.log('start',_0x54bca3);
        this.graphicGroupLayer.loadGeoJSON(_0x54bca3, config)
        console.log('end',config);
        return this.showLayerTree()
      }
    }

    deleteAll() {
      this['stopEditing'](), this.graphicGroupLayer['clear'](), this.sendDeleteAll(), this.showLayerTree()
    }

    deleteEntity(_0x460ffd) {
      _0x460ffd.remove(), this['sendDeleteEntity'](_0x460ffd), this.showLayerTree()
    }

    query(_0x503407, _0x5496ab) {
      var graphics = this.graphicGroupLayer.getGraphics(), _0x2d857c = [], _0x2b4604 = 0;
      for (var  i = 0; (i < graphics.length); i++) {
        var  name, graphics = graphics[i]
        if ('label' == graphics.type ? name = graphics.text : (null != graphics.attr) && (name = graphics.attr.name),
        (null != name) && (-1 != name.indexOf(_0x503407)) && (_0x2d857c.push({
          'name': name,
          'type': ('标绘 - ' + name),
          '_datatype': 'plot',
          '_entity': graphics
        }), _0x5496ab && (_0x5496ab < ++_0x2b4604))) {
          break
        }
      }
      return _0x2d857c
    }

    showLayerTree() {
      this.viewWindow && this.isActivate && (this.viewWindow.treeWork.loadData(this.graphicGroupLayer.getLayers()), this.sendSaveEntity())
    }

    checkRemoveGroup(_0x5ec027) {
      return !(this.graphicGroupLayer.length < 2) || (haoutil['msg']('不能删除所有图层，需要至少保留1个图层！'), !1)
    }

    deleteLayer(_0x27932b) {
      return this.graphicGroupLayer.deleteLayer(_0x27932b) ? (this['showLayerTree'](), haoutil['msg']('删除成功！'), !0) : (haoutil.msg('删除失败！'), !0x1)
    }

    deleteEmptyLayer() {
      (this.graphicGroupLayer.length < 2) ? haoutil['msg']('不能删除所有图层，需要至少保留1个图层！') : (this.graphicGroupLayer.deleteEmptyLayer(), this.showLayerTree())
    }

    editGroupName(isnew) {
      var that = this
      mars3d.widget.activate({
        'uri': '/widgets/plotGroupName/widget.js',
        'name': isnew ? '重命名分组' : '新增分组',
        'data': isnew ? isnew.name : '',
        'checkName': function (name) {
          return that.graphicGroupLayer.hasLayer(name, isnew)
        },
        'callback': function (name) {
            isnew ? isnew.name = name : that.graphicGroupLayer.createLayer(name);
            that.showLayerTree()
        }
      })
    }

    changeSelectedLayer(_0x260516) {
      this.graphicGroupLayer.selectedLayer = _0x260516, this.showLayerTree()
    }

    moveToLayer(graphic, layer) {
      this.graphicGroupLayer.moveToLayer(graphic, layer), this.showLayerTree()
    }

    sendGetList() {
      var json1 = haoutil.storage.get(this.storageName);
      (null == json1 || ('null' == json1) || (this.loadGeoJSON(JSON.parse(json1), {
        'clear': true,
        'flyTo': true
      })))
    }

    sendSaveEntity(_0x152dbf) {
      haoutil.storage.add(this.storageName, JSON.stringify(this.getGeoJson()))
    }

    sendDeleteEntity(_0x397016) {
      console.log('plot: 删除了数据'), haoutil.storage.add(this.storageName, JSON.stringify(this.getGeoJson()))
    }

    sendDeleteAll() {
      console.log('plot: 删除了所有数据'), haoutil.storage.del(this.storageName)
    }
  }

  mars3d.widget.bindClass(MyWidget)
})(window, mars3d)