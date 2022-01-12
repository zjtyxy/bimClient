function tab2plot() {
  $('#tab_plot').click()
}

$(function () {
  var _0x17d446 = {
    'lLQlQ': function (_0x55739b, _0x1027f4) {
      return _0x55739b(_0x1027f4)
    },
    'YYEUO': 'cur',
    'ePEae': '.mp_tab_con',
    'rykOj': function (_0x5e0d73, _0x35e069) {
      return _0x5e0d73(_0x35e069)
    },
    'DftEN': '.mp_tab_card',
    'ayxrk': '.mp_head',
    'EFahk': '.mp_tree',
    'PGTLD': '.mp_mark',
    'dYTYW': function (_0x4fd182, _0x5519ee) {
      return _0x4fd182 - _0x5519ee
    },
    'zckKg': function (_0x1ccbe5, _0x3ddbe8) {
      return _0x1ccbe5 === _0x3ddbe8
    },
    'WDezx': 'MANAO',
    'XyyvI': 'elfdh',
    'toAHq': function (_0x2feaad, _0x6d51d9) {
      return _0x2feaad != _0x6d51d9
    },
    'eYDdc': function (_0x123a29, _0x5169dc) {
      return _0x123a29(_0x5169dc)
    },
    'pRTVv': function (_0x33e3a5) {
      return _0x33e3a5()
    }
  }
  _0x17d446.eYDdc($, window).resize(refHeight), _0x17d446.pRTVv(refHeight), _0x17d446.eYDdc($, '.mp_tab_tit li').click(function () {
    if (_0x17d446.lLQlQ($, this).hasClass(_0x17d446.YYEUO) || _0x17d446.lLQlQ($, this)['hasClass']('disabled')) return !0x1
    var _0x48a00d = _0x17d446.lLQlQ($, this), _0x39db67 = _0x48a00d.index()
    _0x48a00d.addClass(_0x17d446.YYEUO).siblings('li').removeClass(_0x17d446['YYEUO']), _0x48a00d.parent().siblings(_0x17d446.ePEae).children()['eq'](_0x39db67).addClass('cur').siblings().removeClass('cur')
    _0x39db67 = _0x17d446.lLQlQ($, this).attr('id')
    localforage.setItem(storageName, _0x39db67)
  }), _0x17d446.eYDdc($, '.open')['click'](changeOpenShowHide), localforage['getItem'](storageName).then(function (_0x384341) {
    var _0x1459c6 = {
      'ZBPIR': function (_0x11bca7, _0x41919c) {
        return _0x17d446['rykOj'](_0x11bca7, _0x41919c)
      }, 'enMRl': _0x17d446['DftEN'], 'RVzGR': function (_0x1634f2, _0x456541) {
        return _0x1634f2 - _0x456541
      }, 'DjiKs': function (_0x8d37db, _0x91ddfe) {
        return _0x17d446.rykOj(_0x8d37db, _0x91ddfe)
      }, 'fAQJB': function (_0xd76c60, _0x2aab4c) {
        return _0x17d446['rykOj'](_0xd76c60, _0x2aab4c)
      }, 'AcRIx': _0x17d446.ayxrk, 'jFPGV': _0x17d446['EFahk'], 'DEDao': function (_0x3cadbd, _0x133ed8) {
        return _0x17d446.rykOj(_0x3cadbd, _0x133ed8)
      }, 'BEGpK': _0x17d446.PGTLD, 'LUdLG': function (_0x14d6fa, _0x2a2452) {
        return _0x17d446.dYTYW(_0x14d6fa, _0x2a2452)
      }
    }
    if (_0x17d446.zckKg(_0x17d446.WDezx, _0x17d446.XyyvI)) {
      _0x1459c6['ZBPIR']($, _0x1459c6.enMRl)['height'](_0x1459c6.RVzGR(_0x1459c6.DjiKs($, '.mp_box').height() - _0x1459c6.fAQJB($, _0x1459c6.AcRIx)['height'](), 0x1)), _0x1459c6.fAQJB($, _0x1459c6.jFPGV).height(_0x1459c6.RVzGR(_0x1459c6.fAQJB($, _0x1459c6.enMRl).height(), 0x23)), _0x1459c6.DEDao($, _0x1459c6.BEGpK).height(_0x1459c6.LUdLG($(_0x1459c6.enMRl).height(), 0x50))
    } else {
      _0x17d446.toAHq(null, _0x384341) && _0x17d446['eYDdc']($, '#' + _0x384341).click()
    }
  })
})
var storageName = 'mars3d_plotTab'

function changeOpenShowHide() {
  var _0x48ae02 = {
    'FvCus': function (_0x303f1f, _0x3b024f) {
      return _0x303f1f(_0x3b024f)
    }, 'xMcLv': '.tree_icon'
  }
  var _0x25434c = $(this).siblings(),
    _0x36ce35 = _0x48ae02.FvCus($, this)['children'](_0x48ae02.xMcLv)
  _0x25434c.toggle(), _0x25434c['is'](':hidden') ? _0x36ce35.html('+') : _0x36ce35.html('-')
}

function refHeight() {
  var _0xdf44e0 = {
    'gNmlI': '.mp_tab_card', 'IiCAu': function (_0x5fe6d6, _0xdee58e) {
      return _0x5fe6d6 - _0xdee58e
    }, 'vgcHu': '.mp_box', 'rSlYD': function (_0x3097f7, _0x3ecfb0) {
      return _0x3097f7(_0x3ecfb0)
    }, 'cKCOo': '.mp_tree'
  }
  $(_0xdf44e0.gNmlI).height(_0xdf44e0['IiCAu'](_0xdf44e0['IiCAu']($(_0xdf44e0['vgcHu']).height(), _0xdf44e0.rSlYD($, '.mp_head').height()), 0x1)), $(_0xdf44e0['cKCOo'])['height']($(_0xdf44e0.gNmlI).height() - 0x23), _0xdf44e0.rSlYD($, '.mp_mark').height($(_0xdf44e0.gNmlI).height() - 0x50)
}

!function (_0x1f1fd4) {
  var _0x1ff69e = {
    'Dlxpn': function (_0x38a668, _0x57d00e) {
      return _0x38a668(_0x57d00e)
    },
    'sAHbV': function (_0x37005e, _0x511ec0) {
      return _0x37005e + _0x511ec0
    },
    'QQwOK': '</li>',
    'fuReo': function (_0xd7090b, _0x4d7668) {
      return _0xd7090b !== _0x4d7668
    },
    'FShyL': 'JCOGA',
    'aRqHq': 'value',
    'lsTEG': function (_0x471d35, _0x2791d3) {
      return _0x471d35 !== _0x2791d3
    },
    'LtZTM': '<div\x20class=\x22',
    'AJzRx': 'class',
    'APwNR': function (_0x42f57a, _0x4d95f8) {
      return _0x42f57a + _0x4d95f8
    },
    'SsxTh': function (_0x5a9747, _0x53099c) {
      return _0x5a9747 + _0x53099c
    },
    'nAJmu': function (_0x2fd48d, _0x5e67c4) {
      return _0x2fd48d + _0x5e67c4
    },
    'vlOCo': '</div>',
    'OTWYR': function (_0x594e66, _0x51079e) {
      return _0x594e66 + _0x51079e
    },
    'bVqDe': '<ul class="',
    'jrpTT': 'option',
    'GCVqT': '</ul>',
    'VDPaG': function (_0x18ac66, _0xf10118) {
      return _0x18ac66(_0xf10118)
    },
    'Pfcsy': function (_0x3de77d, _0x69eebb) {
      return _0x3de77d + _0x69eebb
    },
    'FGFdS': function (_0x4ccba6, _0x544319) {
      return _0x4ccba6 != _0x544319
    },
    'xJiFU': function (_0x5b57a4, _0x226314) {
      return _0x5b57a4(_0x226314)
    },
    'jRFYE': function (_0x3bc2cf, _0x285a80) {
      return _0x3bc2cf + _0x285a80
    },
    'GkLxq': 'selecton',
    'bdmbf': 'qwnMC',
    'BmwLn': 'data-value',
    'ExaMc': function (_0x1f2884, _0x500678) {
      return _0x1f2884(_0x500678)
    },
    'yRFnr': '.pnui-chkbox',
    'OPiYw': 'pnui-checked',
    'wxfNW': 'cPQJE',
    'OYUeI': 'tSwFF',
    'OMGOp': 'checked',
    'WzenF': function (_0x42d63c, _0x13ea72) {
      return _0x42d63c === _0x13ea72
    },
    'dHwav': '.checkallbox',
    'EoOCH': 'input',
    'vqgkR': 'disabled',
    'Zareu': '.checkall',
    'zIIcO': function (_0x13dd3e, _0x6ad80a) {
      return _0x13dd3e == _0x6ad80a
    },
    'YNubf': '.pnui-rdobox',
    'bvVzn': 'pnui-rdobox pnui-radio-disbaled',
    'wOzeb': function (_0x4b23ce, _0x40a70d) {
      return _0x4b23ce == _0x40a70d
    },
    'sXGkF': 'xbJno',
    'OEXmj': function (_0x2c854d, _0x1076bc) {
      return _0x2c854d <= _0x1076bc
    },
    'CYjZu': function (_0x1eb060, _0x381014) {
      return _0x1eb060 - _0x381014
    },
    'pdTFA': function (_0x538945, _0x5850da) {
      return _0x538945 < _0x5850da
    },
    'vPhnC': 'left',
    'uWcli': function (_0x193e00, _0x149ace) {
      return _0x193e00 * _0x149ace
    },
    'bUdkH': function (_0x147ee1, _0x1f1c49) {
      return _0x147ee1 / _0x1f1c49
    },
    'rwlqX': function (_0x1d8758, _0x291586) {
      return _0x1d8758 != _0x291586
    },
    'xzzwu': 'pnui-check-disbaled',
    'kokcS': function (_0x21919b, _0x1e2bb5) {
      return _0x21919b + _0x1e2bb5
    },
    'pMcXR': function (_0x42e6d7, _0x336777) {
      return _0x42e6d7 + _0x336777
    },
    'CpHXD': function (_0xd37d02, _0x1d9f62) {
      return _0xd37d02 + _0x1d9f62
    },
    'riikI': '%</div>',
    'bVwwR': function (_0x251bbf, _0x8763de) {
      return _0x251bbf(_0x8763de)
    },
    'Btxrp': 'width',
    'zLzzD': 'puiprogress',
    'NczyU': 'puiprogress_bg',
    'Bendh': 'mp_select_text',
    'yfDJH': 'mp_select_ul'
  }
  var _0x29df8a = {
    'select': 'mp_select',
    'select_text': _0x1ff69e.Bendh,
    'select_ul': _0x1ff69e.yfDJH
  }
  _0x1f1fd4['fn']['extend']({
    'select': function (_0xbfdd30) {
      var _0x47a858 = {
        'bSvrU': function (_0x166cc5, _0x327fdb) {
          return _0x1ff69e.FGFdS(_0x166cc5, _0x327fdb)
        },
        'ytmAm': function (_0x361cc7, _0x3a215f) {
          return _0x1ff69e.xJiFU(_0x361cc7, _0x3a215f)
        },
        'acPZE': 'mp_selected',
        'kTGvi': function (_0x5a95bc, _0x22696d) {
          return _0x5a95bc(_0x22696d)
        },
        'eHmCM': function (_0x3ac653, _0x244ee4) {
          return _0x1ff69e['jRFYE'](_0x3ac653, _0x244ee4)
        },
        'wWNfm': function (_0x15ea90, _0x2fe9dc) {
          return _0x1ff69e['jRFYE'](_0x15ea90, _0x2fe9dc)
        },
        'YTSoD': _0x1ff69e.GkLxq,
        'sLXUT': 'value',
        'ozhVi': _0x1ff69e['bdmbf'],
        'GGKkE': function (_0x398e56, _0x37e96f) {
          return _0x1ff69e.lsTEG(_0x398e56, _0x37e96f)
        },
        'JJPhj': _0x1ff69e.BmwLn,
        'jXSbY': function (_0x106460, _0x91e14) {
          return _0x1ff69e['ExaMc'](_0x106460, _0x91e14)
        },
        'YRhzc': _0x1ff69e.yRFnr,
        'JVQeF': _0x1ff69e.OPiYw,
        'cqckB': 'checked'
      }
      if (_0x1ff69e.wxfNW === _0x1ff69e.OYUeI) {
        _0x47a858.bSvrU(null, _0xbfdd30) && $('#' + _0xbfdd30).click()
      } else {
        var _0x4997a4 = _0x1f1fd4.extend({}, _0x29df8a, _0xbfdd30)
        return this.each(function () {
          var _0x1bba0e = {
            'XhIVZ': function (_0x4c3afd, _0x58bcff) {
              return _0x1ff69e.Dlxpn(_0x4c3afd, _0x58bcff)
            }, 'fsPNf': function (_0x4e83f1, _0x392066) {
              return _0x1ff69e['sAHbV'](_0x4e83f1, _0x392066)
            }, 'CkylL': _0x1ff69e.QQwOK, 'DrmrR': function (_0x19312f, _0x71d0d1) {
              return _0x1ff69e['Dlxpn'](_0x19312f, _0x71d0d1)
            }
          }
          if (_0x1ff69e.fuReo(_0x1ff69e.FShyL, 'kNZDU')) {
            var _0xc4454 = _0x1f1fd4(this)
            _0x1ff69e.fuReo(void 0x0, _0xc4454.data(_0x1ff69e.aRqHq)) && _0x1ff69e.lsTEG('', _0xc4454['data'](_0x1ff69e.aRqHq)) && _0xc4454.val(_0xc4454.data(_0x1ff69e.aRqHq))
            var _0x586db0 = []
            _0x586db0['push'](_0x1ff69e.sAHbV(_0x1ff69e['LtZTM'], _0xc4454.attr(_0x1ff69e.AJzRx)) + '\x22>'), _0x586db0.push(_0x1ff69e.APwNR(_0x1ff69e.SsxTh(_0x1ff69e.nAJmu(_0x1ff69e.nAJmu(_0x1ff69e.LtZTM, _0x4997a4.select_text), '\x22>'), _0xc4454['find'](':selected').text()), _0x1ff69e.vlOCo)), _0x586db0.push(_0x1ff69e.OTWYR(_0x1ff69e.bVqDe, _0x4997a4.select_ul) + '\x22>'), _0xc4454.children(_0x1ff69e.jrpTT).each(function () {
              var _0x34e4c9 = _0x1bba0e.XhIVZ(_0x1f1fd4, this)
              _0xc4454.data('value'), _0x34e4c9.val(), _0x586db0.push(_0x1bba0e.fsPNf(_0x1bba0e['fsPNf'](_0x1bba0e.fsPNf('<li data-value="', _0x34e4c9.val()), '\x22>') + _0x34e4c9.text(), _0x1bba0e['CkylL']))
            }), _0x586db0.push(_0x1ff69e['GCVqT']), _0x586db0['push']('</div>')
            var _0x5d050d = _0x1ff69e.VDPaG(_0x1f1fd4, _0x586db0.join('')),
              _0x2de9fd = _0x5d050d.find('.' + _0x4997a4.select_text),
              _0x4df029 = _0x5d050d.find(_0x1ff69e.Pfcsy('.', _0x4997a4.select_ul))
            _0xc4454.after(_0x5d050d), _0xc4454.hide(), _0x5d050d.click(function (_0x2f15ec) {
              _0x47a858.ytmAm(_0x1f1fd4, this).toggleClass(_0x47a858.acPZE), _0x47a858.kTGvi(_0x1f1fd4, this).find(_0x47a858.eHmCM('.', _0x4997a4.select_ul))['slideToggle']().end().siblings(_0x47a858.wWNfm('div.', _0x4997a4.select)).find(_0x47a858.wWNfm('.', _0x4997a4['select_ul']))['slideUp'](), _0x2f15ec.stopPropagation()
            }), _0x1f1fd4('body')['click'](function () {
              var _0x3bfe5d = {
                'AsJSk': _0x47a858['YTSoD'],
                'Qgqgm': _0x47a858.sLXUT,
                'Kibkg': 'data-value'
              }
              if (_0x47a858.ozhVi !== _0x47a858.ozhVi) {
                var _0x420198 = _0x1f1fd4(this),
                  _0x165c08 = _0x420198.addClass('selecton')['siblings']('li').removeClass(_0x3bfe5d['AsJSk'])['end']().data(_0x3bfe5d.Qgqgm).toString()
                _0x165c08 !== _0xc4454.attr(_0x3bfe5d.Kibkg) && (_0x2de9fd['text'](_0x420198.text()), _0xc4454.attr(_0x3bfe5d.Kibkg, _0x165c08), _0xc4454.change())
              } else {
                _0x4df029['slideUp']()
              }
            }), _0x4df029['on']('click', 'li', function () {
              var _0x39fccb = _0x1f1fd4(this),
                _0xf7ab9e = _0x39fccb['addClass'](_0x47a858['YTSoD']).siblings('li').removeClass(_0x47a858.YTSoD)['end']().data('value').toString()
              _0x47a858.GGKkE(_0xf7ab9e, _0xc4454['attr'](_0x47a858['JJPhj'])) && (_0x2de9fd.text(_0x39fccb.text()), _0xc4454.attr(_0x47a858['JJPhj'], _0xf7ab9e), _0xc4454.change())
            })
          } else {
            var _0x53ade5 = _0x47a858['jXSbY'](_0x1f1fd4, this),
              _0x451475 = _0x53ade5['parents']('.checkallbox').find(_0x47a858.YRhzc)
            _0x53ade5.toggleClass('pnui-checked'), _0x451475.each(function () {
              _0x1bba0e['DrmrR'](_0x1f1fd4, this).toggleClass('pnui-checked')
            }), _0x53ade5.hasClass('pnui-checked') ? (_0x451475.siblings('input').attr('checked', 'checked'), _0x451475['addClass'](_0x47a858.JVQeF)) : (_0x451475['siblings']('input').removeAttr(_0x47a858['cqckB']), _0x451475['removeClass'](_0x47a858.JVQeF))
          }
        })
      }
    }, 'checkbox': function () {
      var _0x5e963e = {
        'FyFmm': function (_0x5533c2, _0x50e112) {
          return _0x5533c2 == _0x50e112
        },
        'NijrI': _0x1ff69e['OMGOp'],
        'Vvinl': function (_0x55bbfc, _0x5f4a9e) {
          return _0x1ff69e['WzenF'](_0x55bbfc, _0x5f4a9e)
        },
        'DsIXU': _0x1ff69e['OPiYw'],
        'yhvty': _0x1ff69e['dHwav'],
        'rCpMv': _0x1ff69e.EoOCH,
        'TMGJj': function (_0x558c5c, _0x24bda9) {
          return _0x558c5c - _0x24bda9
        },
        'aFQuy': function (_0x905ee4, _0x4f0418) {
          return _0x905ee4 !== _0x4f0418
        },
        'uwopl': 'LbQuy',
        'cKeMv': _0x1ff69e.vqgkR,
        'iFmjn': function (_0x24ea09, _0x9465bc) {
          return _0x24ea09(_0x9465bc)
        },
        'ciIZG': function (_0x20b748, _0x27a88a) {
          return _0x20b748 == _0x27a88a
        },
        'svzdl': function (_0x2943f9, _0x1f74a0) {
          return _0x1ff69e.ExaMc(_0x2943f9, _0x1f74a0)
        },
        'JkTiB': _0x1ff69e.Zareu
      }
      return this.each(function () {
        var _0x36e429 = {
          'qJGOb': function (_0x4f2e9f, _0x2f1495) {
            return _0x5e963e['TMGJj'](_0x4f2e9f, _0x2f1495)
          },
          'WkqKq': function (_0x3510ea, _0x298ee1) {
            return _0x5e963e['aFQuy'](_0x3510ea, _0x298ee1)
          },
          'aHtFR': _0x5e963e.uwopl,
          'xbLkc': _0x5e963e['cKeMv'],
          'cvtYf': 'checked',
          'sWKbN': _0x5e963e.DsIXU
        }
        var _0x2ab697 = _0x5e963e.iFmjn(_0x1f1fd4, this),
          _0x3dc38b = _0x2ab697['siblings'](_0x5e963e.rCpMv)
        _0x5e963e['FyFmm'](0x1, _0x3dc38b.prop('disabled')) ? _0x2ab697.addClass('pnui-check-disbaled') : _0x5e963e['ciIZG'](0x1, _0x3dc38b.prop('checked')) ? _0x2ab697.addClass('pnui-checked') : _0x2ab697.removeClass('pnui-checked'), _0x2ab697['on']('click', function () {
          var _0x3d5efa = {
            'qiXWW': function (_0x4f0ea5, _0x4f0a06) {
              return _0x36e429.qJGOb(_0x4f0ea5, _0x4f0a06)
            }
          }
          if (_0x36e429.WkqKq(_0x36e429.aHtFR, _0x36e429.aHtFR)) {
            r = _0x3d5efa.qiXWW(_0x2ab697.pageX, h), a = !0x0
          } else {
            return 0x1 != _0x3dc38b['prop'](_0x36e429.xbLkc) && void (_0x2ab697.hasClass('pnui-checked') ? (_0x3dc38b.removeAttr(_0x36e429.cvtYf), _0x2ab697.removeClass(_0x36e429['sWKbN'])) : (_0x3dc38b.attr(_0x36e429['cvtYf'], _0x36e429.cvtYf), _0x2ab697.addClass(_0x36e429.sWKbN)))
          }
        }), _0x5e963e.svzdl(_0x1f1fd4, _0x5e963e.JkTiB)['click'](function () {
          var _0x14caaa = {
            'diGnM': function (_0x43771f, _0x1e1316) {
              return _0x5e963e.FyFmm(_0x43771f, _0x1e1316)
            }, 'yLZfs': 'input', 'kFPdk': _0x5e963e.NijrI, 'BLHlh': function (_0x5535ac, _0x49b6c0) {
              return _0x5e963e.Vvinl(_0x5535ac, _0x49b6c0)
            }, 'hZAGK': 'QNeml', 'dMSBE': function (_0x10488d, _0xc72be3) {
              return _0x10488d(_0xc72be3)
            }, 'zaFgl': _0x5e963e.DsIXU
          }
          var _0x3f91f0 = _0x1f1fd4(this),
            _0x9a38ce = _0x3f91f0.parents(_0x5e963e.yhvty).find('.pnui-chkbox')
          _0x3f91f0.toggleClass(_0x5e963e.DsIXU), _0x9a38ce.each(function () {
            var _0x2395fe = {
              'gFZCd': function (_0x1aad12, _0x31ac79) {
                return _0x1aad12(_0x31ac79)
              },
              'RUtjW': function (_0x6fd977, _0x18153f) {
                return _0x14caaa.diGnM(_0x6fd977, _0x18153f)
              },
              'MVpYJ': 'disabled',
              'njAbR': _0x14caaa.yLZfs,
              'XlLJi': _0x14caaa.kFPdk,
              'gilaG': 'pnui-checked',
              'vDoWc': '.pnui-rdobox'
            }
            if (_0x14caaa.BLHlh(_0x14caaa.hZAGK, 'lRdQJ')) {
              var _0xb674f4 = _0x2395fe.gFZCd(_0x1f1fd4, this)
              if (_0x2395fe['RUtjW'](0x1, _0xb674f4.children('input')['prop'](_0x2395fe.MVpYJ))) return !0x1
              _0x2395fe.RUtjW(0x1, _0xb674f4.children(_0x2395fe['njAbR']).prop(_0x2395fe['XlLJi'])) ? (_0xb674f4.siblings().children(_0x2395fe['njAbR'])['prop'](_0x2395fe.XlLJi, 'checked'), _0xb674f4.siblings().children('.pnui-rdobox').addClass(_0x2395fe['gilaG']), _0xb674f4.children(_0x2395fe.njAbR)['removeAttr']('checked'), _0xb674f4.children('.pnui-rdobox').removeClass('pnui-checked')) : (_0xb674f4.siblings().children(_0x2395fe.njAbR).removeAttr(_0x2395fe.XlLJi), _0xb674f4['siblings']().children(_0x2395fe.vDoWc)['removeClass']('pnui-checked'), _0xb674f4.children(_0x2395fe.njAbR).prop(_0x2395fe.XlLJi, _0x2395fe.XlLJi), _0xb674f4.children(_0x2395fe['vDoWc']).addClass(_0x2395fe.gilaG))
            } else {
              _0x14caaa.dMSBE(_0x1f1fd4, this).toggleClass(_0x14caaa.zaFgl)
            }
          }), _0x3f91f0['hasClass']('pnui-checked') ? (_0x9a38ce.siblings(_0x5e963e['rCpMv'])['attr']('checked', _0x5e963e.NijrI), _0x9a38ce['addClass'](_0x5e963e.DsIXU)) : (_0x9a38ce.siblings(_0x5e963e.rCpMv).removeAttr(_0x5e963e.NijrI), _0x9a38ce.removeClass('pnui-checked'))
        })
      })
    }, 'radio': function () {
      return this.each(function () {
        var _0x51a205 = {
          'UObXj': function (_0x23ad73, _0x14c089) {
            return _0x1ff69e.zIIcO(_0x23ad73, _0x14c089)
          },
          'gFVOS': _0x1ff69e.EoOCH,
          'QWnTo': _0x1ff69e.OMGOp,
          'Usdbe': _0x1ff69e.YNubf,
          'OYigI': _0x1ff69e.OPiYw
        }
        var _0x4e25fa = _0x1f1fd4(this)
        _0x1ff69e.zIIcO(0x1, _0x4e25fa.children(_0x1ff69e['EoOCH']).prop('disabled')) ? _0x4e25fa['children'](_0x1ff69e.YNubf).removeClass()['addClass'](_0x1ff69e.bvVzn) : _0x1ff69e.wOzeb(0x1, _0x4e25fa.children(_0x1ff69e.EoOCH).prop(_0x1ff69e.OMGOp)) ? (_0x4e25fa.siblings().children('input').removeAttr(_0x1ff69e['OMGOp']), _0x4e25fa.siblings().children('.pnui-rdobox')['removeClass']('pnui-checked'), _0x4e25fa['children'](_0x1ff69e.YNubf).addClass(_0x1ff69e.OPiYw)) : (_0x4e25fa['siblings']().children(_0x1ff69e['EoOCH']).prop(_0x1ff69e['OMGOp'], 'checked'), _0x4e25fa.siblings()['children'](_0x1ff69e.YNubf).addClass(_0x1ff69e.OPiYw), _0x4e25fa['children']('.pnui-rdobox').removeClass(_0x1ff69e.OPiYw)), _0x4e25fa['on']('click', function () {
          var _0x415ec5 = _0x1f1fd4(this)
          if (_0x51a205.UObXj(0x1, _0x415ec5['children']('input').prop('disabled'))) return !0x1
          _0x51a205['UObXj'](0x1, _0x415ec5['children'](_0x51a205.gFVOS).prop(_0x51a205.QWnTo)) ? (_0x415ec5.siblings()['children'](_0x51a205.gFVOS).prop(_0x51a205['QWnTo'], _0x51a205['QWnTo']), _0x415ec5.siblings().children(_0x51a205.Usdbe).addClass(_0x51a205.OYigI), _0x415ec5['children'](_0x51a205.gFVOS).removeAttr(_0x51a205.QWnTo), _0x415ec5.children(_0x51a205['Usdbe']).removeClass(_0x51a205.OYigI)) : (_0x415ec5.siblings().children('input').removeAttr(_0x51a205.QWnTo), _0x415ec5['siblings']().children(_0x51a205.Usdbe).removeClass(_0x51a205.OYigI), _0x415ec5.children('input').prop('checked', _0x51a205.QWnTo), _0x415ec5.children('.pnui-rdobox').addClass(_0x51a205['OYigI']))
        })
      })
    }, 'progress': function (_0x2021cd) {
      var _0x4c4eb5 = {
        'kUHec': _0x1ff69e.dHwav,
        'EdIba': 'pnui-checked',
        'TmQvY': 'checked',
        'Wsnml': function (_0x2dffd7, _0x14b1b0) {
          return _0x1ff69e.WzenF(_0x2dffd7, _0x14b1b0)
        },
        'qPdEI': _0x1ff69e['sXGkF'],
        'YUPrs': function (_0x1f148d, _0x35daf6) {
          return _0x1ff69e['OEXmj'](_0x1f148d, _0x35daf6)
        },
        'yhRXg': function (_0x4eb7b7, _0x5dcd21) {
          return _0x1ff69e['CYjZu'](_0x4eb7b7, _0x5dcd21)
        },
        'CkarX': function (_0x25c7bb, _0x900dd9) {
          return _0x1ff69e.pdTFA(_0x25c7bb, _0x900dd9)
        },
        'eroHs': _0x1ff69e.vPhnC,
        'rCJPG': function (_0x4388cb, _0x5719a2) {
          return _0x4388cb * _0x5719a2
        },
        'yymcI': function (_0x4a96f3, _0x38cf04) {
          return _0x1ff69e.OEXmj(_0x4a96f3, _0x38cf04)
        },
        'PRrwo': function (_0xd80c8d, _0x42f4b6) {
          return _0x1ff69e['pdTFA'](_0xd80c8d, _0x42f4b6)
        },
        'kkiBD': function (_0x24274a, _0x54787b) {
          return _0x24274a(_0x54787b)
        },
        'dNTDj': function (_0x44eb8b, _0x3f9ae7) {
          return _0x1ff69e.uWcli(_0x44eb8b, _0x3f9ae7)
        },
        'MQqza': function (_0x578b17, _0x1c78a) {
          return _0x1ff69e['bUdkH'](_0x578b17, _0x1c78a)
        },
        'KEjUI': function (_0x1939aa, _0x291e1c) {
          return _0x1ff69e.rwlqX(_0x1939aa, _0x291e1c)
        },
        'fUtsa': function (_0x3d3c8d, _0x16ce09) {
          return _0x3d3c8d(_0x16ce09)
        },
        'vJYLh': function (_0x484418, _0x445d46) {
          return _0x484418 == _0x445d46
        },
        'NjxKq': _0x1ff69e['xzzwu'],
        'FWZfj': function (_0x3a3aa7, _0x535914) {
          return _0x3a3aa7(_0x535914)
        },
        'uvgGB': _0x1ff69e['Zareu'],
        'xJNit': function (_0x4388b2, _0x4f31f5) {
          return _0x1ff69e.kokcS(_0x4388b2, _0x4f31f5)
        },
        'USlnQ': _0x1ff69e.LtZTM,
        'WeWmz': function (_0x29f30e, _0x36e68c) {
          return _0x1ff69e.pMcXR(_0x29f30e, _0x36e68c)
        },
        'pxDjd': function (_0x2e8178, _0x238d2d) {
          return _0x1ff69e.pMcXR(_0x2e8178, _0x238d2d)
        },
        'dzBBi': function (_0x35bfcf, _0x760b80) {
          return _0x1ff69e['CpHXD'](_0x35bfcf, _0x760b80)
        },
        'NyxAD': function (_0x1968bd, _0x51f6e4) {
          return _0x1ff69e.CpHXD(_0x1968bd, _0x51f6e4)
        },
        'MQElr': _0x1ff69e['riikI'],
        'uazxC': '</div>',
        'dXwUY': function (_0x5b6761, _0x25517c) {
          return _0x1ff69e.bVwwR(_0x5b6761, _0x25517c)
        },
        'BRPcZ': function (_0x546548, _0x3b03b7) {
          return _0x1ff69e.CpHXD(_0x546548, _0x3b03b7)
        },
        'nkrAU': function (_0xa6beb8, _0x2dbd5b) {
          return _0xa6beb8 + _0x2dbd5b
        },
        'vKhaa': function (_0x506a71, _0x53b5f0) {
          return _0x506a71 + _0x53b5f0
        },
        'vOSQn': _0x1ff69e['Btxrp'],
        'NdaRt': function (_0x14207c, _0x53163e) {
          return _0x1ff69e.uWcli(_0x14207c, _0x53163e)
        },
        'yoVLR': function (_0x374f86, _0x54a178) {
          return _0x374f86(_0x54a178)
        }
      }
      var _0x1be052 = _0x1ff69e.zLzzD, _0x38a199 = _0x1ff69e.NczyU, _0x28e4a8 = 'puiprogress_btn',
        _0x25761b = 'puiprogress_bar', _0x20e486 = 'puiprogress_text'
      return this['each'](function () {
        var _0xb7daf5 = {
          'VadwD': function (_0x4ab09c, _0x5c1f06) {
            return _0x4c4eb5.KEjUI(_0x4ab09c, _0x5c1f06)
          },
          'aJYRF': 'disabled',
          'mNbOs': _0x4c4eb5.EdIba,
          'sSVGt': 'checked',
          'IvOSg': function (_0x357c9c, _0x1a9a3c) {
            return _0x4c4eb5['fUtsa'](_0x357c9c, _0x1a9a3c)
          },
          'bRxCW': function (_0x8c6bd0, _0x43c2d5) {
            return _0x4c4eb5.vJYLh(_0x8c6bd0, _0x43c2d5)
          },
          'htmMq': _0x4c4eb5.NjxKq,
          'BSytK': function (_0x56b411, _0x51cb8a) {
            return _0x56b411 == _0x51cb8a
          },
          'ZekKY': 'click',
          'Scfja': function (_0xc1631a, _0x29e2aa) {
            return _0x4c4eb5.FWZfj(_0xc1631a, _0x29e2aa)
          },
          'ikqhp': _0x4c4eb5['uvgGB']
        }
        var _0x5b2b7f = _0x1f1fd4(this), _0x348951 = []
        _0x348951.push(_0x4c4eb5['xJNit'](_0x4c4eb5.xJNit(_0x4c4eb5['USlnQ'], _0x1be052), '\x22>')), _0x348951.push(_0x4c4eb5.WeWmz(_0x4c4eb5.USlnQ + _0x38a199, '\x22>')), _0x348951.push(_0x4c4eb5['WeWmz'](_0x4c4eb5['pxDjd'](_0x4c4eb5['USlnQ'], _0x25761b), '"></div>')), _0x348951['push']('</div>'), _0x348951.push(_0x4c4eb5.dzBBi(_0x4c4eb5['dzBBi'](_0x4c4eb5.USlnQ, _0x28e4a8), '\x22></div>')), _0x348951.push(_0x4c4eb5.NyxAD(_0x4c4eb5['USlnQ'] + _0x20e486, '\x22>') + _0x5b2b7f.val() + _0x4c4eb5['MQElr']), _0x348951.push(_0x4c4eb5.uazxC)
        var _0x39b022 = _0x4c4eb5.dXwUY(_0x1f1fd4, _0x348951.join('')),
          _0x187351 = _0x39b022.find(_0x4c4eb5.BRPcZ('.', _0x38a199)),
          _0xb518da = _0x39b022.find(_0x4c4eb5.nkrAU('.', _0x28e4a8)),
          _0x1e053a = _0x39b022.find('.' + _0x25761b),
          _0x38fd61 = _0x39b022.find(_0x4c4eb5['vKhaa']('.', _0x20e486))
        _0x5b2b7f.after(_0x39b022), _0x5b2b7f['hide']()
        var _0x103a9d, _0x1c5517 = !0x1, _0x221c2d = 0x0, _0x3e7ef9 = 0x0
        _0x39b022.css(_0x4c4eb5.vOSQn, _0x2021cd)
        _0x348951 = _0x4c4eb5.dXwUY(Number, _0x5b2b7f.val()), _0x3e7ef9 = _0x4c4eb5.NdaRt(_0x2021cd, _0x348951) / 0x64
        _0xb518da.css(_0x4c4eb5.eroHs, _0x3e7ef9), _0x1e053a.width(_0x3e7ef9), _0x38fd61.html(_0x4c4eb5.dXwUY(parseInt, _0x348951) + '%'), _0xb518da['mousedown'](function (_0x387eb7) {
          _0x221c2d = _0x387eb7['pageX'] - _0x3e7ef9, _0x1c5517 = !0x0
        }), _0x4c4eb5['yoVLR'](_0x1f1fd4, document)['mouseup'](function () {
          _0x1c5517 = !0x1
        }), _0x39b022.mousemove(function (_0x18fdc7) {
          var _0x2e6128 = {
            'sjDzz': function (_0x3c0821, _0xbb6488) {
              return _0x3c0821(_0xbb6488)
            },
            'HhLnI': _0x4c4eb5.kUHec,
            'wTMsY': _0x4c4eb5.EdIba,
            'fYAZV': 'input',
            'SvvZa': _0x4c4eb5['TmQvY']
          }
          if (_0x4c4eb5.Wsnml(_0x4c4eb5.qPdEI, _0x4c4eb5.qPdEI)) {
            _0x1c5517 && (_0x4c4eb5.YUPrs(_0x3e7ef9 = _0x4c4eb5.yhRXg(_0x18fdc7.pageX, _0x221c2d), 0x0) ? _0x3e7ef9 = 0x0 : _0x4c4eb5.CkarX(_0x2021cd, _0x3e7ef9) && (_0x3e7ef9 = _0x2021cd), _0xb518da.css(_0x4c4eb5.eroHs, _0x3e7ef9), _0x1e053a.width(_0x3e7ef9), _0x18fdc7 = parseInt(_0x4c4eb5.rCJPG(_0x3e7ef9 / _0x2021cd, 0x64)), _0x38fd61.html(_0x18fdc7 + '%'), _0x5b2b7f.val(_0x18fdc7), _0x5b2b7f.change())
          } else {
            var _0x20e040 = {
              'LAlxd': function (_0x356afb, _0xfc6618) {
                return _0xb7daf5.VadwD(_0x356afb, _0xfc6618)
              },
              'DtmSQ': _0xb7daf5.aJYRF,
              'IBeVI': _0xb7daf5.mNbOs,
              'tRzWo': _0xb7daf5.sSVGt,
              'LLbkH': function (_0x301cd3, _0x2df696) {
                return _0xb7daf5.IvOSg(_0x301cd3, _0x2df696)
              }
            }
            var _0x54ba23 = _0xb7daf5.IvOSg(_0x1f1fd4, this),
              _0x1d4536 = _0x54ba23.siblings('input')
            _0xb7daf5.bRxCW(0x1, _0x1d4536.prop(_0xb7daf5.aJYRF)) ? _0x54ba23.addClass(_0xb7daf5.htmMq) : _0xb7daf5['BSytK'](0x1, _0x1d4536.prop(_0xb7daf5.sSVGt)) ? _0x54ba23.addClass('pnui-checked') : _0x54ba23.removeClass(_0xb7daf5['mNbOs']), _0x54ba23['on'](_0xb7daf5.ZekKY, function () {
              return _0x20e040.LAlxd(0x1, _0x1d4536.prop(_0x20e040['DtmSQ'])) && void (_0x54ba23.hasClass(_0x20e040.IBeVI) ? (_0x1d4536.removeAttr(_0x20e040.tRzWo), _0x54ba23.removeClass(_0x20e040.IBeVI)) : (_0x1d4536['attr']('checked', _0x20e040.tRzWo), _0x54ba23.addClass('pnui-checked')))
            }), _0xb7daf5['Scfja'](_0x1f1fd4, _0xb7daf5.ikqhp).click(function () {
              var _0x39e870 = _0x2e6128.sjDzz(_0x1f1fd4, this),
                _0x1fd93c = _0x39e870['parents'](_0x2e6128.HhLnI)['find']('.pnui-chkbox')
              _0x39e870.toggleClass('pnui-checked'), _0x1fd93c.each(function () {
                _0x20e040['LLbkH'](_0x1f1fd4, this).toggleClass(_0x20e040.IBeVI)
              }), _0x39e870['hasClass'](_0x2e6128.wTMsY) ? (_0x1fd93c.siblings(_0x2e6128.fYAZV).attr(_0x2e6128.SvvZa, 'checked'), _0x1fd93c.addClass(_0x2e6128.wTMsY)) : (_0x1fd93c['siblings'](_0x2e6128.fYAZV).removeAttr(_0x2e6128.SvvZa), _0x1fd93c.removeClass('pnui-checked'))
            })
          }
        }), _0x187351.click(function (_0x492a85) {
          _0x1c5517 || (_0x103a9d = _0x187351['offset']()['left'], _0x4c4eb5.yymcI(_0x3e7ef9 = _0x4c4eb5.yhRXg(_0x492a85.pageX, _0x103a9d), 0x0) ? _0x3e7ef9 = 0x0 : _0x4c4eb5.PRrwo(_0x2021cd, _0x3e7ef9) && (_0x3e7ef9 = _0x2021cd), _0xb518da.css(_0x4c4eb5.eroHs, _0x3e7ef9), _0x1e053a.animate({ 'width': _0x3e7ef9 }, _0x2021cd), _0x492a85 = _0x4c4eb5.kkiBD(parseInt, _0x4c4eb5['dNTDj'](_0x4c4eb5['MQqza'](_0x3e7ef9, _0x2021cd), 0x64)), _0x38fd61.html(_0x492a85 + '%'), _0x5b2b7f.val(_0x492a85), _0x5b2b7f.change())
        })
      })
    }
  })
}(window['jQuery'])