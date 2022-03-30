var thisWidget

function initWidgetView(_0x2a23b1) {
  thisWidget = _0x2a23b1, $('#btn_plot_delall').click(function () {
    thisWidget.deleteAll()
  }), $('#btn_plot_end').click(function (_0x102f31) {
    thisWidget.endDraw()
  }), $('#btn_plot_socket').click(function (_0x495429) {
    thisWidget.socketConfig()
  })
  var _0x470537 = !0
  $('#btn_plot_isedit').click(function () {
    (_0x470537 = !_0x470537) ? ($(this)['removeClass']('active'),
      $(this).children().removeClass('fa-lock')['addClass']('fa-unlock')) : ($(this).addClass('active'),
      $(this)['children']()['removeClass']('fa-unlock').addClass('fa-lock')), thisWidget.hasEdit(_0x470537)
  })
  var _0x469ed7 = !1
  $('#btn_plot_ispopup').click(function () {
    {
      (_0x469ed7 = !_0x469ed7) ? ($(this).removeClass('active'),
        $(this).children().removeClass('fa-file-text').addClass('fa-file-text-o')) : ($(this).addClass('active'),
        $(this)['children']().removeClass('fa-file-text-o').addClass('fa-file-text')), thisWidget['hasPopup'](_0x469ed7)
    }
  }), plotFile.initEvent(), plotlist['bindSelList'](), treeWork['initEvent']()
}

var treeObj, lastRightClickTreeId, lastRightClickTreeNode, plotFile = {
  'initEvent': function () {
    var _0x4db035 = this
    $('#btn_plot_openfile').click(function () {
      _0x4db035['openPlotFile']({ 'clear': !0 })
    }), $('#btn_plot_openfile2').click(function () {
      _0x4db035.openPlotFile({ 'clear': !1 })
    }), $('#btn_plot_savefile').click(function () {
      thisWidget.downloadJson('标绘')
    }), $('#input_plot_file')['change'](function (_0x2503f5) {
      var _0x779c9f, _0x2d558f = this.files[0], _0x5e5391 = _0x2d558f.name,
        _0x5e5391 = _0x5e5391.substring((_0x5e5391.lastIndexOf('.') + 1), _0x5e5391.length).toLowerCase()
      _0x4db035['loadJsonOptions'].symbol = null, ('json' == _0x5e5391) || 'geojson' == _0x5e5391 ? ((_0x779c9f = new FileReader())['readAsText'](_0x2d558f, 'UTF-8'),
        _0x779c9f.onloadend = function (_0x2f1b6b) {
          var _0x2a0415 = this.result
          thisWidget.loadGeoJSON(_0x2a0415, _0x4db035.loadJsonOptions), _0x4db035['clearPlotFile']()
        }) : 'kml' == _0x5e5391 ? ((_0x779c9f = new FileReader()).readAsText(_0x2d558f, 'UTF-8'),
        _0x779c9f['onloadend'] = function (_0x332fcd) {
          var _0xc0fc18 = this.result
          parent['kgUtil']['toGeoJSON'](_0xc0fc18)['then'](function (_0x5c4abd) {
            console.log('kml2geojson', _0x5c4abd), _0x4db035['loadJsonOptions'].symbol = _0x4db035.kmlDefSymbol,
              thisWidget.loadGeoJSON(_0x5c4abd, _0x4db035['loadJsonOptions'])
          }), _0x4db035.clearPlotFile()

        }) : 'kmz' == _0x5e5391 ? parent.kgUtil.toGeoJSON(_0x2d558f).then(function (_0x3ae150) {
        console['log']('kmz2geojson', _0x3ae150),
          _0x4db035.loadJsonOptions.symbol = _0x4db035.kmlDefSymbol,
          thisWidget.loadGeoJSON(_0x3ae150, _0x4db035['loadJsonOptions']), _0x4db035.clearPlotFile()
      }) : (toastr.error('暂不支持 ' + _0x5e5391 + '\x20文件类型的数据！'), _0x4db035['clearPlotFile']())
    })
  }, 'openPlotFile': function (_0x4a6d78) {
    this['loadJsonOptions'] = _0x4a6d78, this.loadJsonOptions['flyTo'] = 0, $('#input_plot_file').click()
  }, 'clearPlotFile': function () {
    window.addEventListener ? document.getElementById('input_plot_file')['value'] = '' : document.getElementById('input_plot_file')['outerHTML'] += ''
  }, 'kmlDefSymbol': function (_0x4b6169, _0x51d3e2, _0x15710a) {
    return _0x51d3e2.clampToGround = !0,
      'Point' == ((null === (_0x15710a = _0x15710a.geometry)) || (void 0 === _0x15710a) ? void 0 : _0x15710a.type) ? {
        'image': 'img/marker/di3.png',
        'verticalOrigin': 0x1,
        'scale': 0.4,
        'label': {
          'text': _0x4b6169.name,
          'font_size': 0x12,
          'color': '#ffffff',
          'outline': !0x0,
          'outlineColor': '#000000',
          'pixelOffsetY': -0x32,
          'scaleByDistance': !0x0,
          'scaleByDistance_far': 0xf1b30,
          'scaleByDistance_farValue': 0.3,
          'scaleByDistance_near': 0x2710,
          'scaleByDistance_nearValue': 0x1
        }
      } : _0x51d3e2
  }
}, plotlist = {
  'bindSelList': function () {
    var that = this, selPlotList = $('#sel_plot_list')
    $.getJSON('http://localhost:8888/jeecg-boot/base/bimGtlfModel/listMap', function (res) {
      var curIndex, key, htmlstr = '', count = 0
      var result = res.result
      for (key in result) {
        htmlstr += '<option value="' + key + '">' + key + '(' + result[key].length + ')</option>',
          curIndex = key, count++
      }
      var _0x4d3be4 = haoutil.storage.get('plot_model_list');
      (curIndex = _0x4d3be4 ? _0x4d3be4 : curIndex) && result[curIndex] && (that.showPlotList(result[curIndex]),
        selPlotList['attr']('data-value', curIndex)), count > 1 ? (selPlotList.html(htmlstr), selPlotList.select(),
        selPlotList.change(function () {
          var sll = $(this).attr('data-value')
          that.showPlotList(result[sll]), haoutil.storage.add('plot_model_list', sll)
        })) : (selPlotList.hide(), $('.mp_mark').css({ 'margin-top': '10px' }))
    })
  }, '_listData': null, showPlotList: function (plotList) {
    this._listData = plotList
    var htmlstr = ''
    for (var i = 0; i < plotList.length; i++) {
      var mstyle, mimage, mclass, mColor, plotModel = plotList[i]
      plotModel.url && (plotModel.style = {},plotModel.style.scale = plotModel.defaultSize, plotModel.style.url = plotModel.url)

      if (!plotModel.hide) {
        plotModel.style && plotModel.style.url && (plotModel.style.url = thisWidget.updateTemplateValues(plotModel.style.url));
        (mstyle = thisWidget.getDefStyle(plotModel.edittype || plotModel.type)) && (mimage = mstyle.image)
        plotModel.style && plotModel.style.image && (mimage = plotModel.style.image);
        (mimage = plotModel.image ? plotModel.image : mimage)
        if (mimage) {
          (mimage = thisWidget.updateTemplateValues(mimage)).startsWith('http') || mimage.startsWith('//') ||
          (mimage = mimage.startsWith('{plotPath}') ? mimage.replace('{plotPath}', '.') : ('../../' + mimage))
          htmlstr += '<li onclick="plotlist.startPlot(' + i + ',this)"> <i title="' + plotModel['name'] + '"> <img src="' + mimage + '"  onerror="plotlist.imgerrorfun();"/></i></li>'
        } else {
          mColor = '#000000',
          mstyle && (mclass = mstyle.iconClass, mColor = mstyle.color),
          plotModel['iconClass'] && (mclass = plotModel.iconClass),
          plotModel.style && plotModel.style.iconClass && (mclass = plotModel.style['iconClass']),
          plotModel.color && (mColor = plotModel.color),
          plotModel.style && plotModel.style.color && (mColor = plotModel.style.color)
          var str2 = '<li onclick="plotlist.startPlot(' + i + ',this)"><i title="' + plotModel.name + '" style="font-size:13px;">' + plotModel['name'] + '</i></li>'
          var str1 = '<li onclick="plotlist.startPlot(' + i + ',this)"><i title="' + plotModel.name + '" class="' + mclass + '" style="color:' + mColor + '"></i></li>'
          htmlstr += mclass ? str1 : str2
        }
      }

      $('#plotlist')['html'](htmlstr)
    }
  }, 'imgerrorfun': function () {
    var _0x21c520 = event.srcElement
    _0x21c520.src = '../../../img/favicon/app-icon72x72@2x.png', _0x21c520.onerror = null
  }, '_lastLi': null, 'startPlot': function (_0x1fac1f, _0x50750f) {
    _0x50750f = $(_0x50750f)
    _0x50750f.addClass('markon'), this._lastLi && this._lastLi.removeClass('markon'), this['_lastLi'] = _0x50750f
    var _0x301bed = haoutil.system.clone(this._listData[_0x1fac1f] || {})
    delete _0x301bed['image']
    var _0x35bc94 = thisWidget.getDefStyle(_0x301bed['edittype'] || _0x301bed.type)
    if (_0x35bc94) for (var _0x23f86c in (_0x301bed.style = _0x301bed.style || {}, _0x35bc94)) (null == _0x301bed.style[_0x23f86c]) && (_0x301bed.style[_0x23f86c] = _0x35bc94[_0x23f86c])
    _0x301bed.attr = { 'id': '', 'name': '', 'remark11': '' }, thisWidget.startDraw(_0x301bed)

  }, 'plotEnd': function () {
    this['_lastLi'] && this._lastLi.removeClass('markon')
  }
}, objFeature = {}, treeWork = {
  'initEvent': function () {
    $('#btn_plot_addgroup').click(function (_0x51fb53) {
      thisWidget.editGroupName()
    }), $('#btn_plot_delAllGroup').click(function (_0x4e81f0) {
      thisWidget['deleteEmptyLayer']()
    }), bindRightMenuEvnet(), thisWidget.showLayerTree()
  }, 'loadData': function (layerlist) {
    var _0x4cc9a7 = {
      'check': { 'enable': !0 },
      'edit': { 'drag': { 'isMove': !0 }, 'showRemoveBtn': !1, 'showRenameBtn': !1, 'enable': !0 },
      'data': { 'simpleData': { 'enable': !0 } },
      'callback': {
        'beforeDrag': treeOverlays_beforeDrag,
        'beforeDrop': treeOverlays_beforeDrop,
        'onDrop': treeOverlays_onDrop,
        'onCheck': treeOverlays_onCheck,
        'onRightClick': treeOverlays_OnRightClick,
        'onClick': treeOverlays_onClick,
        'onRemove': treeOverlays_onRemove
      }
    }
    objFeature = {}
    var _0xadfda5 = []
    for (var i = 0; i < layerlist.length; i++) {
      var layer = layerlist[i], graphics = layer.getGraphics(),
        layerName = layer.name + '(' + graphics.length + '个)'
      layer.isActivate && (layerName += '-激活')
      treeObj && treeObj.getNodeByParam('id', layer.uuid), _0x20d299 = {
        'id': layer.uuid,
        'pId': layer.pid,
        'name': layerName,
        'icon': 'img/tree/folder.png',
        'isGroup': !0,
        'checked': layer.show,
        'open': treeObj && treeObj.open
      }
      _0xadfda5.push(_0x20d299), objFeature[_0x20d299['id']] = layer
      for (var j = 0; j < graphics.length; j++) {
        var _0x14c3ed = graphics[j], _0x50e34a = {
          'id': _0x14c3ed.uuid,
          'pId': _0x20d299['id'],
          'name': ((_0x50e34a = _0x14c3ed['attr']) || (void 0 == _0x50e34a) ? void 0 : _0x50e34a.name) || _0x14c3ed.name || '未命名',
          'checked': _0x14c3ed.show,
          'icon': 'img/tree/plot.png'
        }
        _0xadfda5['push'](_0x50e34a), objFeature[_0x50e34a['id']] = _0x14c3ed
      }
    }
    $['fn'].zTree.destroy(), treeObj = $['fn'].zTree.init($('#treeOverlays'), _0x4cc9a7, _0xadfda5)
  }, 'updateNode': function (_0x529145) {
    var _0x581010, _0x1df3b5 = $['fn'].zTree.getZTreeObj('treeOverlays'),
      _0x836f3e = _0x1df3b5.getNodeByParam('id', _0x529145['uuid'], null)
    _0x836f3e && (_0x836f3e.name = ((null === (_0x581010 = _0x529145.attr)) || (void 0 === _0x581010) ? void 0x0 : _0x581010.name) ||
      _0x529145['name'] || '未命名', _0x529145 = _0x529145['isAdded'] && _0x529145.show, (_0x836f3e.checked != _0x529145) && (_0x836f3e.checkedOld = _0x836f3e.checked, _0x836f3e['checked'] = _0x529145), _0x1df3b5.updateNode(_0x836f3e))
  }
}

function treeOverlays_onClick(_0x3e6384, _0x2b1a08, _0x54c5e7) {
  (null == _0x54c5e7) || null == _0x54c5e7['id'] || (null != (_0x54c5e7 = objFeature[_0x54c5e7['id']])) && thisWidget.flyTo(_0x54c5e7)
}

function treeOverlays_onCheck(_0xacd8dd, _0x4111b8, _0x2218de) {
  for (var _0x4a4d71 = treeObj.getChangeCheckedNodes(), _0x5b5934 = 0; (_0x5b5934 < _0x4a4d71.length); _0x5b5934++) {
    var _0x4dd214 = _0x4a4d71[_0x5b5934]
    _0x4dd214.checkedOld = _0x4dd214['checked']
    var _0xd434c6 = objFeature[_0x4dd214['id']]
    null != _0xd434c6 && (_0xd434c6.show = _0x4dd214['checked'])
  }
}

function treeOverlays_OnRightClick(_0x178913, _0x32d416, _0x1adf73) {
  var _0xeadc60
  null != _0x1adf73 && (null != objFeature[_0x1adf73['id']]) && (lastRightClickTreeId = _0x32d416, lastRightClickTreeNode = _0x1adf73, _0xeadc60 = _0x178913.clientY, _0x32d416 = _0x178913.clientX,
  (_0x178913 = (document.body['offsetHeight'] - 0x64) < _0xeadc60) && (_0xeadc60 = _0x178913),
  (_0x178913 = (document.body.offsetWidth - 0x64) < _0x32d416) && (_0x32d416 = _0x178913),
    _0x1adf73.isGroup ? ($('#plot_rMenu_group .group').show(), $('#plot_rMenu_group .plot').hide()) : ($('#plot_rMenu_group .group').hide(),
      $('#plot_rMenu_group .plot').show()), $('#plot_rMenu_group').css({
    'top': (_0xeadc60 + 'px'),
    'left': _0x32d416 + 'px'
  }).show(), $('body')['bind']('mousedown', onBodyMouseDown))
}

function bindRightMenuEvnet() {
  $('#plot_rMenu_group li')['on']('click', function () {
    hideRMenu(), moveNodeAndLayer($(this).attr('data-type'))

  })
}

function onBodyMouseDown(_0x327a3e) {
  ('plot_rMenu_group' == _0x327a3e.target['id']) || _(0 < $(_0x327a3e.target)['parents']('#plot_rMenu_group').length) || hideRMenu()
}

function hideRMenu() {
  $('body').unbind('mousedown', onBodyMouseDown), $('#plot_rMenu_group').hide()
}

function moveNodeAndLayer(_0x4c4b2c) {
  var layer = objFeature[lastRightClickTreeNode.id]
  switch (_0x4c4b2c) {
    case 'g_act':
      thisWidget.changeSelectedLayer(layer)
      break
    case 'g_name':
      thisWidget.editGroupName(layer)
      break
    case 'g_del':
      treeObj.removeNode(lastRightClickTreeNode), thisWidget.deleteLayer(layer)
      break
    case 'p_del':
      treeObj['removeNode'](lastRightClickTreeNode), thisWidget.deleteEntity(layer)
      break
    case 'g_json':
      thisWidget.downloadJson('标绘分组_' + lastRightClickTreeNode.name, layer)
      break
    case 'g_kml':
      thisWidget.downloadKml('标绘分组_' + lastRightClickTreeNode.name, layer)
      break
    case 'p_json':
      thisWidget.downloadJson(lastRightClickTreeNode.name, layer)
      break
    case 'p_kml':
      thisWidget.downloadKml(lastRightClickTreeNode.name, layer)
      break
    case'g_imp':
      plotFile.openPlotFile({ 'layer': layer.name })
  }
}

function treeOverlays_onRemove(_0x256def, _0x57f250, _0xe01e65) {
  var _0x4e1d75
  (null == _0xe01e65) || null == _0xe01e65['id'] || null != (_0x4e1d75 = objFeature[_0xe01e65['id']]) && (_0xe01e65.isGroup ? thisWidget.deleteLayer(_0x4e1d75) : thisWidget['deleteEntity'](_0x4e1d75))
}

function treeOverlays_beforeDrag(_0x1ef4b3, _0x3d71c2) {
  for (var _0x3cef81 = 0, _0x2bec83 = _0x3d71c2.length; _0x3cef81 < _0x2bec83; _0x3cef81++) if (_0x3d71c2[_0x3cef81].isGroup) return !0x1
  return !0
}

function treeOverlays_beforeDrop(_0x9ab1a8, _0x177363, _0x1e0a18, _0x4fbf17) {
  return !(!_0x1e0a18 || !_0x1e0a18.isGroup)
}

function treeOverlays_onDrop(_0x407ce2, _0x398454, _0x52eba7, _0x1ff00e, _0x219727, _0x12aec4) {
  _0x1ff00e && (_0x1ff00e = objFeature[_0x1ff00e['id']], _0x52eba7 = objFeature[_0x52eba7[0]['id']], thisWidget.moveToLayer(_0x52eba7, _0x1ff00e))
}