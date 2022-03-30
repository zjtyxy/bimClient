(function (window, mars3d) {
  class MyWidget extends mars3d.widget.BaseWidget {
    get resources() {
      return ['view.css']
    }
    get view() {
      return { type: 'append', url: 'view.html', parent: 'body' }
    }
    create() {
      this.data = this.config.data || [
        {
          name: '底图',
          icon: 'fa fa-map',
          widget: '/widgets/manageBasemaps/widget.js',
        },
        {
          name: '图层',
          icon: 'fa fa-tasks',
          widget: '/widgets/manageLayers/widget.js',
        },
        {
          name: '工具',
          icon: 'fa fa-cubes',
          children: [
            {
              name: '标绘',
              icon: 'fa fa-map-pin',
              widget: '/widgets/plot/widget.js',
            },
            {
              name: '视角书签',
              icon: 'fa fa-tags',
              widget: '/widgets/plot-model/widget.js'
            },
          ],
        },
      ];
    }

    //每个窗口创建完成后调用
    winCreateOK(viewopt, html) {
      if (viewopt.type != 'append') {
        return;
      }

      var arr = this.data;

      //移动设备上，处理下菜单层次
      if (!haoutil.system.isPCBroswer() && arr.length == 3 && arr[0].children) {
        var item1 = arr.shift();
        var item2 = arr.shift();
        arr[0].children.insert(item2, 0);
        arr[0].children.insert(item1, 0);
      }

      this.initMenu(arr);
    }
    //构造 菜单
    initMenu(arr) {
      var widgetObj = {};

      var inhtml = '';
      for (var i = 0, len = arr.length; i < len; i++) {
        var item = arr[i];
        if (item.hasOwnProperty('visible') && !item.visible) {
          continue;
        }
        if (item.children) {
          inhtml += `<div class='btn-group'>
            <button type='button' class='btn btn-link toolBarRight-btn dropdown-toggle' data-toggle='dropdown' aria-expanded='false' >
                <i class='${item.icon}'></i>${item.name}<span class='caret'></span>
            </button>
            <ul class='dropdown-menu dropdown-menu-right toolBarRight-dropdown-menu' >`;

          for (let j = 0, jlen = item.children.length; j < jlen; j++) {
            let children_item = item.children[j];
            if (children_item.hasOwnProperty('visible') && !children_item.visible) {
              continue;
            }

            let ex = ''
            if (children_item.onclick) {
              ex = 'onclick="' + children_item.onclick + '"'
            } else if (children_item.widget) {
              ex = 'data-widget="' + children_item.widget + '"'
            }

            inhtml += `<li class='widget-btn' ${ex} >
                          <a href='javascript:void(0)'><i class='${children_item.icon}'></i>${children_item.name}</a>
                       </li>`;
            widgetObj[children_item.widget] = children_item
          }
          inhtml += ' </ul></div>'
        } else {

          let ex = ''
          if (item.onclick) {
            ex = 'onclick="' + item.onclick + '"'
          } else if (item.widget) {
            ex = 'data-widget="' + item.widget + '"'
          }

          inhtml += `<button type='button' class='widget-btn btn btn-link toolBarRight-btn ' ${ex} >\
                       <i class='${item.icon}'></i>${item.name}
                    </button>`
          widgetObj[item.widget] = item
        }
      }
      $('.toolBarRight').html(inhtml)
      $('.toolBarRight .widget-btn').click(function () {
        var uri = $(this).attr('data-widget')
        if (haoutil.isutil.isNull(uri)) {
          return
        }
        // console.log('单击了工具栏：' + uri);

        if (mars3d.widget.isActivate(uri)) {
          mars3d.widget.disable(uri)
        } else {
          var opt = {
            ...(widgetObj[uri] || {}),
            uri: uri
          }
          mars3d.widget.activate(opt)
        }
      })
    }

    activate() {}
    disable() {}
  }
  mars3d.widget.bindClass(MyWidget)
})(window, mars3d)
