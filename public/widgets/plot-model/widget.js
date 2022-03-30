'use script';
(function (window, mars3d) {
  class MyWidget extends mars3d.widget.BaseWidget {
    get resources() {
      return ['js/getGraphicDefStyle.js', '/lib/kml/kml-geojson.js']
    }

    get view() {
      return {
        'type': 'window',
        'url': 'view.html',
        'windowOptions': { 'width': 0xfa, 'position': { 'top': 100, 'right': 5, 'bottom': 5 } }
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
        'callback': function (event) {
          event.graphic && that.deleteEntity(event.graphic)
        }
      }]);

      this.graphicGroupLayer.on(mars3d.EventType.drawCreated, function (event) {
        that.showLayerTree()
        that.startEditing(event.graphic)
      }), this.graphicGroupLayer.on(mars3d.EventType.load, function (event) {
        haoutil.loading.hide()
      }), this.graphicGroupLayer.on(mars3d.EventType.editStart, function (event) {
        that.startEditing(event.graphic)
      }), this.graphicGroupLayer.on(mars3d.EventType.editMovePoint, function (event) {
        that.startEditing(event.graphic)
      }), this.graphicGroupLayer.on(mars3d.EventType.editRemovePoint, function (event) {
        that.startEditing(event.graphic)
      }), this.graphicGroupLayer.on(mars3d.EventType.editStop, function (event) {
        that.stopEditing(), that.sendSaveEntity(event.graphic), that.showLayerTree()
      }), this.graphicGroupLayer.on(mars3d.EventType.updateAttr, function (event) {
        event.attr.name && that.viewWindow && that.viewWindow.treeWork.updateNode(event.graphic)
      })

    }

    winCreateOK(_0x429710, view) {
      this.viewWindow = view
    }

    activate() {
      this.graphicGroupLayer.hasEdit = !0
      this.sendGetList()
    }

    disable() {
      this.stopEditing(), this.graphicGroupLayer.stopDraw(), this.graphicGroupLayer.hasEdit = !1, this.viewWindow = null
    }

    getDefStyle(modelId) {
      return getGraphicDefStyle(modelId)
    }

    updateTemplateValues(_0x2027c4) {
      return this.map.options.templateValues ? mars3d.Util.template(_0x2027c4, this.map.options.templateValues) : _0x2027c4
    }

    hasEdit(isEdit) {
      this.graphicGroupLayer.hasEdit = isEdit
    }

    hasPopup(isPopup) {
      {
        var that = this
        isPopup ? this.graphicGroupLayer.bindPopup(function (event) {
          event = event.graphic
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
            'attr': event.attr,
            'edit': !0,
            'width': 0xbe
          })
        }, {
          'onAdd': function (event) {
            $((('#' + event.id) + ' .mars3d-popup-btn')).click(function (_0x24c00c) {
            $(('#' + event.id) + ' .mars3d-popup-edititem').each(function () {
              event.graphic.attr[$(this).attr('data-type')] = $(this)['val']()
              }), that.graphicGroupLayer['closePopup']()
            })

          }, 'onRemove': function (_0x3e3b2b, _0x4eaed5) {
          }, 'anchor': [0, -0x14]
        }) : this.graphicGroupLayer.unbindPopup()
      }
    }

    startDraw(glayer) {
      glayer && ('model' == glayer.type) ? (glayer.colorBlendMode = Cesium.ColorBlendMode.MIX,
        glayer.drawShow = !0, haoutil.loading.show()) : haoutil.loading.hide(),
        console.log('开始绘制', glayer), this.graphicGroupLayer.startDraw(glayer)
    }

    endDraw() {
      this.graphicGroupLayer.endDraw()
    }

    startEditingById(layerId) {
      var glayer = this.graphicGroupLayer.getGraphicById(layerId)
      null != glayer && (glayer.flyTo(), this.graphicGroupLayer.startEditing(glayer))
    }

    startEditing(graphic) {
      var widget  = mars3d.widget.getClass('/widgets/plotAttr/widget.js')
      clearTimeout(this.timeTik),
     (widget) && widget.isActivate ? widget.startEditing(graphic, graphic.coordinates) : mars3d.widget.activate({
        'uri': '/widgets/plotAttr/widget.js',
        'graphic': graphic,
        'lonlats': graphic.coordinates
      })

    }

    stopEditing() {
      this.timeTik = setTimeout(function () {
        mars3d.widget.disable('/widgets/plotAttr/widget.js')
      }, 0xc8)
    }

    flyTo(graphic) {
      this.map.flyToGraphic(graphic, { 'scale': 1.9, 'radius': 20 })
    }

    getGeoJson(_0x48a115) {
      var json =  (_0x48a115 || this.graphicGroupLayer).toGeoJSON()
      for(var i=0;i<json.features.length; i++)
      {
        if(json.features[i].properties.entityId) continue;
        json.features[i].properties.entityId = json.features[i].properties.id;
      }

      return json;
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
     // 启动加载本地缓存
    sendGetList() {
     // if(window.isVue)
      {
        //从服务器加载数据
        var json1 = this.config.modelData;
        debugger
        (null == json1 || ('null' == json1) || (this.loadGeoJSON(json1, {
          'clear': true,
          'flyTo': true
        })))
      }

      // var json1 = haoutil.storage.get(this.storageName);
      // (null == json1 || ('null' == json1) || (this.loadGeoJSON(JSON.parse(json1), {
      //   'clear': true,
      //   'flyTo': true
      // })))
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