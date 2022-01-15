function tab2plot() {
  $('#tab_plot').click()
}

$(function () {
  $(window).resize(refHeight), refHeight(), $('.mp_tab_tit li').click(function () {
    if ($(this).hasClass('cur') || $(this)['hasClass']('disabled')) return !0x1
    var _0x48a00d = $(this), _0x39db67 = _0x48a00d.index()
    _0x48a00d.addClass('cur').siblings('li').removeClass('cur'),
      _0x48a00d.parent().siblings('.mp_tab_con').children()['eq'](_0x39db67).addClass('cur').siblings().removeClass('cur')
    _0x39db67 = $(this).attr('id')
    localforage.setItem(storageName, _0x39db67)
  }), $('.open')['click'](changeOpenShowHide), localforage['getItem'](storageName).then(function (_0x384341) {
    (null != _0x384341) && $('#' + _0x384341).click()
  })
})
var storageName = 'mars3d_plotTab'

function changeOpenShowHide() {
  var _0x25434c = $(this).siblings(),
    _0x36ce35 = $(this)['children']('.tree_icon')
  _0x25434c.toggle(), _0x25434c['is'](':hidden') ? _0x36ce35.html('+') : _0x36ce35.html('-')
}

function refHeight() {
  $('.mp_tab_card').height($('.mp_box').height() - $('.mp_head').height() - 1),
    $('.mp_tree').height($('.mp_tab_card').height() - 0x23),
    $('.mp_mark').height($('.mp_tab_card').height() - 0x50)
}

!function (_0x1f1fd4) {

  var _0x29df8a = {
    'select': 'mp_select',
    'select_text': 'mp_select_text',
    'select_ul': 'mp_select_ul'
  }
  _0x1f1fd4['fn']['extend']({
    'select': function (_0xbfdd30) {
      {
        var _0x4997a4 = _0x1f1fd4.extend({}, _0x29df8a, _0xbfdd30)
        return this.each(function () {
          var _0xc4454 = _0x1f1fd4(this);
          (0 != _0xc4454.data('value')) && ('' != _0xc4454['data']('value')) && _0xc4454.val(_0xc4454.data('value'))
          var _0x586db0 = []
          _0x586db0['push']('<div\x20class=\x22' + _0xc4454.attr('class') + '\x22>'),
            _0x586db0.push('<div\x20class=\x22' + _0x4997a4.select_text + '\x22>' + _0xc4454['find'](':selected').text() + '</div>'),
            _0x586db0.push('<ul class="' + _0x4997a4.select_ul + '\x22>'),
            _0xc4454.children('option').each(function () {
              var _0x34e4c9 = _0x1f1fd4(this)
              _0xc4454.data('value'), _0x34e4c9.val(),
                _0x586db0.push('<li data-value="' + _0x34e4c9.val() + '\x22>' + _0x34e4c9.text() + '</li>')
            }),
            _0x586db0.push('</ul>'), _0x586db0['push']('</div>')
          var _0x5d050d = _0x1f1fd4(_0x586db0.join('')),
            _0x2de9fd = _0x5d050d.find('.' + _0x4997a4.select_text),
            _0x4df029 = _0x5d050d.find('.' + _0x4997a4.select_ul)
          _0xc4454.after(_0x5d050d), _0xc4454.hide(), _0x5d050d.click(function (_0x2f15ec) {
            _0x1f1fd4(this).toggleClass('mp_selected'),
              _0x1f1fd4(this).find('.' + _0x4997a4.select_ul)['slideToggle']().end().siblings('div.' + _0x4997a4.select).find('.' + _0x4997a4['select_ul'])['slideUp'](),
              _0x2f15ec.stopPropagation()
          }), _0x1f1fd4('body')['click'](function () {
            _0x4df029['slideUp']()
          }), _0x4df029.on('click', 'li', function () {
            var _0x39fccb = _0x1f1fd4(this),
              _0xf7ab9e = _0x39fccb['addClass']('selecton').siblings('li').removeClass('selecton')['end']().data('value').toString();
            (_0xf7ab9e != _0xc4454['attr']('data-value')) && (_0x2de9fd.text(_0x39fccb.text()), _0xc4454.attr('data-value', _0xf7ab9e), _0xc4454.change())
          })

        })
      }
    }, 'checkbox': function () {
      return this.each(function () {

        var _0x2ab697 = _0x1f1fd4(this),
          _0x3dc38b = _0x2ab697['siblings']('input');
        (1 == _0x3dc38b.prop('disabled')) ? _0x2ab697.addClass('pnui-check-disbaled') : (1 == _0x3dc38b.prop('checked')) ? _0x2ab697.addClass('pnui-checked') : _0x2ab697.removeClass('pnui-checked'),
          _0x2ab697.on('click', function () {
            return 1 != _0x3dc38b['prop']('disabled') && void (_0x2ab697.hasClass('pnui-checked') ? (_0x3dc38b.removeAttr('checked'),
              _0x2ab697.removeClass('pnui-checked')) : (_0x3dc38b.attr('checked', 'checked'), _0x2ab697.addClass('pnui-checked')))

          }), _0x1f1fd4('.checkall')['click'](function () {
          var _0x3f91f0 = _0x1f1fd4(this),
            _0x9a38ce = _0x3f91f0.parents('.checkallbox').find('.pnui-chkbox')
          _0x3f91f0.toggleClass('pnui-checked'), _0x9a38ce.each(function () {
            _0x1f1fd4(this).toggleClass('pnui-checked')
          }), _0x3f91f0['hasClass']('pnui-checked') ? (_0x9a38ce.siblings('input')['attr']('checked', 'checked'),
            _0x9a38ce['addClass']('pnui-checked')) : (_0x9a38ce.siblings('input').removeAttr('checked'),
            _0x9a38ce.removeClass('pnui-checked'))
        })
      })
    }, 'radio': function () {
      return this.each(function () {
        var _0x4e25fa = _0x1f1fd4(this);

        (1 == _0x4e25fa.children('input').prop('disabled')) ? _0x4e25fa['children']('.pnui-rdobox').removeClass()['addClass']('pnui-rdobox pnui-radio-disbaled') : (1 == _0x4e25fa.children('input').prop('checked')) ? (_0x4e25fa.siblings().children('input').removeAttr('checked'),
          _0x4e25fa.siblings().children('.pnui-rdobox')['removeClass']('pnui-checked'),
          _0x4e25fa['children']('.pnui-rdobox').addClass('pnui-checked')) : (_0x4e25fa['siblings']().children('input').prop('checked', 'checked'),
          _0x4e25fa.siblings()['children']('.pnui-rdobox').addClass('pnui-checked'),
          _0x4e25fa['children']('.pnui-rdobox').removeClass('pnui-checked'))
        _0x4e25fa.on('click', function () {
          var _0x415ec5 = _0x1f1fd4(this)
          if (1 == _0x415ec5['children']('input').prop('disabled')) {
            return true;

            (1 == _0x415ec5['children']('input').prop('checked')) ? (_0x415ec5.siblings()['children']('input').prop('checked', 'checked'),
              _0x415ec5.siblings().children('.pnui-rdobox').addClass('pnui-checked'),
              _0x415ec5['children']('input').removeAttr('checked'),
              _0x415ec5.children('.pnui-rdobox').removeClass('pnui-checked')) : (_0x415ec5.siblings().children('input').removeAttr('checked'),
              _0x415ec5['siblings']().children('.pnui-rdobox').removeClass('pnui-checked'),
              _0x415ec5.children('input').prop('checked', 'checked'),
              _0x415ec5.children('.pnui-rdobox').addClass('pnui-checked'))
          }
        })
      })
    },
    'progress': function (_0x2021cd) {
      var _0x1be052 = 'puiprogress', _0x38a199 = 'puiprogress_bg', _0x28e4a8 = 'puiprogress_btn',
        _0x25761b = 'puiprogress_bar', _0x20e486 = 'puiprogress_text'
      return this['each'](function () {
        var _0x5b2b7f = _0x1f1fd4(this), _0x348951 = []
        _0x348951.push('<div\x20class=\x22' + _0x1be052 + '\x22>'),
          _0x348951.push('<div\x20class=\x22' + _0x38a199 + '\x22>'),
          _0x348951.push('<div\x20class=\x22' + _0x25761b + '"></div>'),
          _0x348951.push('</div>'),
          _0x348951.push('<div\x20class=\x22' + _0x28e4a8 + '\x22></div>'),
          _0x348951.push('<div\x20class=\x22' + _0x20e486 + '\x22>' + _0x5b2b7f.val() + '%</div>'),
          _0x348951.push('</div>')
        var _0x39b022 = _0x1f1fd4(_0x348951.join('')),
          _0x187351 = _0x39b022.find('.' + _0x38a199),
          _0xb518da = _0x39b022.find('.' + _0x28e4a8),
          _0x1e053a = _0x39b022.find('.' + _0x25761b),
          _0x38fd61 = _0x39b022.find('.' + _0x20e486)
        _0x5b2b7f.after(_0x39b022), _0x5b2b7f['hide']()
        var _0x103a9d, _0x1c5517 = !1, _0x221c2d = 0, _0x3e7ef9 = 0
        _0x39b022.css('width', _0x2021cd)
        _0x348951 = Number(_0x5b2b7f.val()), _0x3e7ef9 = (_0x2021cd * _0x348951) / 0x64
        _0xb518da.css('left', _0x3e7ef9), _0x1e053a.width(_0x3e7ef9),
          _0x38fd61.html(parseInt(_0x348951) + '%'), _0xb518da['mousedown'](function (_0x387eb7) {
          _0x221c2d = _0x387eb7['pageX'] - _0x3e7ef9, _0x1c5517 = !0x0
        }), _0x1f1fd4(document)['mouseup'](function () {
          _0x1c5517 = !1
        }), _0x39b022.mousemove(function (_0x18fdc7) {
          _0x1c5517 && ((_0x3e7ef9 = (_0x18fdc7.pageX - _0x221c2d) <= 0) ? _0x3e7ef9 = 0 : (_0x2021cd < _0x3e7ef9) && (_0x3e7ef9 = _0x2021cd),
            _0xb518da.css('left', _0x3e7ef9), _0x1e053a.width(_0x3e7ef9),
            _0x18fdc7 = parseInt((_0x3e7ef9 / _0x2021cd * 0x64)),
            _0x38fd61.html(_0x18fdc7 + '%'), _0x5b2b7f.val(_0x18fdc7), _0x5b2b7f.change())

        }), _0x187351.click(function (_0x492a85) {
          _0x1c5517 || (_0x103a9d = _0x187351['offset']()['left'],
            (_0x3e7ef9 = (_0x492a85.pageX - _0x103a9d) <= 0) ? _0x3e7ef9 = 0 : (_0x2021cd < _0x3e7ef9) && (_0x3e7ef9 = _0x2021cd),
            _0xb518da.css('left', _0x3e7ef9), _0x1e053a.animate({ 'width': _0x3e7ef9 }, _0x2021cd),
            _0x492a85 = parseInt(((_0x3e7ef9 / _0x2021cd) * 0x64)),
            _0x38fd61.html(_0x492a85 + '%'), _0x5b2b7f.val(_0x492a85), _0x5b2b7f.change())
        })
      })
    }
  })
}(window.jQuery)