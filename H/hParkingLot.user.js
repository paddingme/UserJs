// ==UserScript==
// @name        hParkingLot
// @name:zh-CN  【H】停车场
// @namespace   https://github.com/dodying/Dodying-UserJs
// @description 
// 种子站点
// @include     https://btso.pw/*
// @include     https://btdb.in/*
// 网盘
// @include     http://115.com/?ct=file&*
// @include     http://115.com/?aid=-1&search_value=*&ct=file&ac=search&is_wl_tpl=1
// @include     http://pan.baidu.com/*
// 正规站点
// @include     http://www.dmm.co.jp/*
// @include     http://www.tokyo-hot.com/*
// @include     http://cn.caribbeancom.com/*
// @include     http://www.1pondo.tv/*
// @include     http://www.heyzo.com/*
// @include     http://cn.10musume.com/*
// 搜索引擎
// @include     https://www.google.co.jp/*q=*
// @include     https://www.baidu.com/*wd=*
// JAVLibrary
// @include     http://www.javlibrary.com/*
// @include     https://www.javbus.com/*
// @include     http://javpop.com/*
// @include     http://www.abase.me/*
// @include     http://www.jav007.com/*
// @include     https://avso.pw/*
// @include     https://avmo.pw/*
// 在线观看
// @include     http://avpapa.co/*
// @include     http://av99.us/*
// @include     http://www.doojav69.com/*
// @include     http://bejav.me/*
// @include     http://hpjav.com/*
// @include     http://www.av539.com/*
// @version     1.08a
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_openInTab
// @author      Dodying
// @namespace   https://github.com/dodying/Dodying-UserJs
// @supportURL  https://github.com/dodying/Dodying-UserJs/issues
// @icon        https://raw.githubusercontent.com/dodying/UserJs/master/Logo.png
// @require     http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js
// @require     http://cdn.bootcss.com/jquery.tablesorter/2.28.5/js/jquery.tablesorter.js
// @require     https://greasyfork.org/scripts/18532-filesaver/code/FileSaver.js?version=127839
// @run-at      document-end
// ==/UserScript==
(function ($) {
  var defaultImg = 'https://cdn2.iconfinder.com/data/icons/designers-and-developers-icon-set/32/image-24.png';
  var linkLib = {
    /*
    'example.com': {
      on: 布尔，是否开启,
      online: 布尔，是否在线播放,
      cn: 标识,
      icon: 网站，图标地址,
      search: 网站，搜索地址，搜索字样用{searchTerms}代替,
      text: 选择器-要标记的文本,
      img: 选择器-要标记的图片,
      time: 选择器-发布日期,
      code: 选择器-番号,
      delay: 布尔，是否要按键后在启用脚本
    },
    */
    // 种子站点
    'btdb.in': {
      on: false,
      name: 'BTDB',
      icon: 'https://btdb.in/favicon.ico',
      search: 'https://btdb.in/q/{searchTerms}/?sort=size',
      text: 'h1.torrent-name,.file-name,.item-title>a',
      code: '#search-input'
    },
    'btso.pw': {
      on: false,
      name: 'BTSOW',
      icon: 'https://btso.pw/app/bts/View/img/favicon.ico',
      search: 'http://btso.pw/search/{searchTerms}/',
      text: 'h3,.file',
      code: '.form-control:visible'
    },
    // 网盘
    '115.com': {
      on: true,
      name: '115网盘',
      icon: 'http://115.com/favicon.ico',
      search: 'http://115.com/?url=%2F%3Faid%3D-1%26search_value%3D{searchTerms}%26ct%3Dfile%26ac%3Dsearch%26is_wl_tpl%3D1&mode=wangpan',
      text: '.file-name>em>a',
      code: function () {
        return prompt('请输入番号', $('.file-path>a:eq(-1)').text());
      },
      delay: true
    },
    'pan.baidu.com': {
      on: false,
      name: '百度网盘',
      icon: 'http://pan.baidu.com/box-static/disk-system/images/favicon.ico',
      search: 'http://pan.baidu.com/disk/home?adapt=pc&fr=ftw#search/key={searchTerms}&vmode=list',
      text: '.filename',
      delay: true
    },
    // 正规站点
    'www.dmm.co.jp': {
      on: true,
      name: 'DMM',
      icon: 'http://www.dmm.co.jp/favicon.ico',
      search: 'http://www.dmm.co.jp/search/=/searchstr={searchTerms}',
      text: '.txt,table.mg-b20 td',
      img: '.img img,.tdmm,.crs_full>img',
      time: '.nw:contains(発売日)+td',
      code: function () {
        return prompt('请输入番号', $('.nw:contains(品番)+td').text());
      }
    },
    'www.tokyo-hot.com': {
      on: false,
      name: 'Tokyo-Hot',
      search: 'http://www.tokyo-hot.com/product/?q={searchTerms}',
      text: '.actor,.info:eq(1)>dd:eq(0)',
      img: '.rm>img,.popular img,.free img,.ranking img',
      time: '.info:eq(1)>dd:eq(0)',
      code: '.info:eq(1)>dd:eq(2)'
    },
    'cn.caribbeancom.com': {
      on: false,
      name: '加勒比',
      icon: 'http://cn.caribbeancom.com/favicon.ico',
      search: 'http://cn.caribbeancom.com/moviepages/{searchTerms}/index.html',
      img: 'img[itemprop=thumbnail]',
      time: 'dd[itemprop=uploadDate]',
      code: function () {
        return location.pathname.match(/[\d\-]+/) [0];
      }
    },
    'www.1pondo.tv': {
      on: false,
      name: '一本道',
      icon: 'http://www.1pondo.tv/images/favicons/favicon-16.png',
      search: 'http://www.1pondo.tv/movies/{searchTerms}/',
      img: '.figure>img,.ng-scope>a>img,img.ng-scope',
      time: 'dd.ng-binding:eq(1)',
      code: function () {
        return location.pathname.match(/[\d\_]+/) [0];
      },
      delay: true
    },
    'www.heyzo.com': {
      on: false,
      name: 'HEYZO',
      icon: 'http://www.heyzo.com/images/favicon.ico',
      search: 'http://www.heyzo.com/search/{searchTerms}/1.html?sort=pop',
      //img: '.soundplay>img,.sample-images img,.relateive-movie img,.ranking-img>img,.withInfo>img,.new-movies>img,.actor>img',
      time: '.dataInfo:eq(0)',
      code: function () {
        return 'HEYZO-' + location.pathname.match(/\d+/) [0];
      }
    },
    'cn.10musume.com': {
      on: false,
      name: '10musume.com',
      icon: 'http://cn.10musume.com/favicon.ico',
      search: 'http://cn.10musume.com/cn/moviepages/{searchTerms}/index.html',
      img: 'img',
      time: '#movie-table1:eq(5)',
      code: function () {
        return location.pathname.match(/[\d\_]+/) [0];
      }
    },
    // 搜索引擎
    'www.google.co.jp': {
      on: false,
      name: 'Google',
      icon: 'https://www.google.co.jp/images/branding/product/ico/googleg_lodp.ico',
      search: 'https://www.google.co.jp/search?q={searchTerms}',
      text: 'h3.r>a,span.st',
      code: '#lst-ib',
      delay: true
    },
    'www.baidu.com': {
      on: false,
      name: 'Baidu',
      icon: 'https://www.baidu.com/img/baidu.svg',
      search: 'https://www.baidu.com/baidu?wd={searchTerms}',
      text: 'h3.t>a,.c-abstract',
      code: '#kw',
      delay: true
    },
    // JAVLibrary
    'www.javlibrary.com': {
      on: true,
      name: 'JAVLibrary',
      icon: 'http://www.javlibrary.com/favicon.ico',
      search: 'http://www.javlibrary.com/cn/vl_searchbyid.php?keyword={searchTerms}',
      text: '.post-title>a,.text:eq(1),.id,.title>a,.video>a:not(:has(img)),.cast>.star>a',
      img: '#video_jacket_img,.previewthumbs>img,.id+img,strong>a',
      time: '.text:eq(2)',
      code: '#video_id .text'
    },
    'www.javbus.com': {
      on: true,
      name: 'JavBus',
      icon: 'https://www.javbus.com/favicon.ico',
      search: 'https://www.javbus.com/{searchTerms}',
      text: 'h3,.info>p>span:eq(1),#magnet-table>tr>td:nth-child(1)>a,date',
      time: '.info>p:eq(1)',
      code: '.info>p>span:eq(1)'
    },
    'javpop.com': {
      on: false,
      name: 'JavPOP',
      icon: 'http://javpop.com/favicon.ico',
      search: 'http://javpop.com/index.php?s={searchTerms}',
      text: '.thumb_post a:nth-child(2),h1',
      img: '.thumb_post img,.box-b img',
      code: function () {
        return $('h1').text().match(/\[(.*?)\]/) [1];
      }
    },
    'www.abase.me': {
      on: true,
      name: 'ABase A基地',
      icon: 'http://www.abase.me/favicon.ico',
      search: 'http://www.abase.me/{searchTerms}',
      text: '.row-fluid>h3,.col-md-3 strong:eq(0),.list-group-item>a',
      img: '.col-md-9 img',
      time: '.col-md-3 strong:eq(1)',
      code: '.col-md-3 strong:eq(0)'
    },
    'www.jav007.com': {
      on: true,
      name: 'Jav007',
      icon: 'https://cdn2.iconfinder.com/data/icons/smartphone-interface-ver-2/100/smartphone-37-24.png',
      search: 'http://www.jav007.com/searchpage.php?a=1&code={searchTerms}',
      text: '.viewimfor>li:eq(8),.view-code',
      img: '.photo,.cell>a>img',
      time: '.viewimfor>li:eq(1)',
      code: '.viewimfor>li:eq(8)'
    },
    'avso.pw': {
      on: true,
      name: 'AVSOX',
      icon: 'https://avso.pw/app/javu/View/img/favicon.ico',
      search: 'https://avso.pw/cn/search/{searchTerms}',
      text: 'date,h3',
      img: '.photo-frame>img,.bigImage>img',
      time: '.info>p:eq(1)',
      code: '.info>p>span:eq(1)'
    },
    'avmo.pw': {
      on: false,
      name: 'AVMOO',
      icon: 'https://avmo.pw/app/jav/View/img/favicon.ico',
      search: 'https://avmo.pw/cn/search/{searchTerms}',
      text: 'date,h3',
      img: '.photo-frame>img,.bigImage>img',
      time: '.info>p:eq(1)',
      code: '.info>p>span:eq(1)'
    },
    // 在线观看
    'avpapa.co': {
      on: true,
      online: true,
      name: 'Avpapa',
      icon: 'http://avpapa.co/assets/favicon-cce4d9c4feec996b085c0baf9dd0fa0e9771333225ff0da8a2105e1c292f507e.ico',
      search: 'http://avpapa.co/search?q={searchTerms}',
      text: '.tit,h4',
      img: '.thumbs>a>img,#click_to_show>img',
      code: function () {
        return $('h4').text().match(/^\[(.*?)\]/) [1];
      }
    },
    'av99.us': {
      on: true,
      online: true,
      name: 'AV99免費A片',
      icon: 'http://av99.us/favicon.ico',
      search: 'http://tw.search.yahoo.com/search?p={searchTerms}&vs=av99.us',
      text: 'h1,.list>li>a,.dd>a,.fl>a>span',
      img: '.pic>a>img',
      time: '.viewimfor>li:eq(1)',
      code: function () {
        return $('h1').text().replace(/^\[中文字幕\]\s+/, '').match(/(.*?) (.*?)/) [1];
      }
    },
    'www.doojav69.com': {
      on: true,
      online: true,
      name: 'Doojav69',
      icon: 'http://www.doojav69.com/favicon.ico',
      search: 'http://www.doojav69.com/?s={searchTerms}',
      text: 'h2.entry-title>a,h1.entry-title',
      code: function () {
        return $('h1.entry-title').text().match(/(.*?) (.*?)/) [1];
      }
    },
    'bejav.me': {
      on: true,
      online: true,
      name: 'BeJav.Me',
      search: 'http://bejav.me/search/{searchTerms}/',
      text: '.name>a,.breadcrumb_last,.body>ul>li>a',
      img: '.img-responsive,.thumbnail>img,.body>ul>li>img',
      code: function () {
        return prompt('请输入番号', $('.breadcrumb_last').text());
      }
    },
    'hpjav.com': {
      on: true,
      online: true,
      name: 'HPJAV',
      icon: 'http://hpjav.com/wp-content/themes/dist/image/HP.ico',
      search: 'http://hpjav.com/tw/?s={searchTerms}',
      text: '.entry-title a,h1,.current',
      code: function () {
        return prompt('请输入番号', $('.current').text().match(/(.*?) (.*?)/) [1]);
      }
    },
    'www.av539.com': {
      on: true,
      online: true,
      name: 'av539',
      icon: 'http://www.av539.com/images/icon.png',
      search: 'http://www.av539.com/?search=&s={searchTerms}&post_type=post',
      text: '.title:not(:has(a)),.singletitle,.title>span',
      code: function () {
        return prompt('请输入番号', $('.singletitle').text().match(/(.*?) (.*?)/) [1]);
      }
    },
  };
  var imgLib = {
    add: 'https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519691-199_CircledPlus-24.png',
    del: 'https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-1/128/trash-24.png',
    import: 'https://cdn1.iconfinder.com/data/icons/design-2d-cad-solid-set-2/60/079-Import-24.png',
    table: 'https://cdn2.iconfinder.com/data/icons/freecns-cumulus/16/519904-098_Spreadsheet-24.png',
    restart: 'https://cdn2.iconfinder.com/data/icons/social-messaging-productivity-1/128/power-24.png'
  };
  var markLib = [
    { //0
      name: '等待中',
      img: 'https://cdn2.iconfinder.com/data/icons/lightly-icons/24/time-24.png',
      color: 'gray'
    },
    { //1
      name: '有种子无配额',
      img: 'https://cdn3.iconfinder.com/data/icons/math-physics/512/null-24.png',
      color: 'gray'
    },
    { //2
      name: '下载中',
      img: 'https://cdn4.iconfinder.com/data/icons/education-bold-line-1/49/34-24.png',
      color: 'blue'
    },
    { //3
      name: '已下-骑兵',
      img: 'https://cdn3.iconfinder.com/data/icons/chess-8/512/horse-game-role-chess-24.png',
      color: 'green'
    },
    { //4
      name: '已下-步兵',
      img: 'https://cdn3.iconfinder.com/data/icons/chess-8/154/chess-pawn-24.png',
      color: 'green'
    },
    { //5
      name: '已删-不喜欢的',
      img: 'https://cdn1.iconfinder.com/data/icons/lightly-icons/24/heart-broken-24.png',
      color: 'black'
    },
  ];
  if (linkLib[location.host].delay) {
    $(window).on('keydown', function (e) {
      if (e.keyCode === 65 && e.shiftKey) { //Shift+A
        init();
        markAdded();
        $(window).off('keydown');
      }
    });
  } else {
    init();
    markAdded();
  }
  function init() {
    $('<style></style>').appendTo('head').html('' +
    '.hBanner{position:fixed;background-color:white;z-index:999999;}' +
    '.hBanner{-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;}' +
    '.hBanner>*{cursor:pointer;float:left;margin:0 1px 0 1px;}' +
    '.hBanner *{line-height:9px;text-shadow:none;}' +
    '.switcher{width:32px;height:24px;background:#333;border-radius:12px;position:relative;}' +
    '.switcher>span{position:absolute;left:6px;top:7px;height:2px;color:#26CA28;font-size:16px;text-transform:Capitalize;}' +
    '.hBanner>:not(.switcher):not(.hasCode){width:24px;height:24px;}' +
    '.links>*,.addCode>*{background-color:white;display:none;width:24px;height:24px;}' +
    '.links>:nth-child(1),.addCode>:nth-child(1){display:inline;}' +
    '.links:hover>*,.addCode:hover>*{display:inline;}' +
    '.links>.avOnline{border:solid 1px black;}' +
    '.hasCode>a{margin:0 1px;display:none;}' +
    '.hasCode,.hasCode>*{line-height:normal;}' +
    '.showTable{background-color:white;position:absolute;top:80px;z-index:999998;}' +
    '.showTable>table{border-collapse:collapse;}' +
    '.showTable>table>thead>tr{position:fixed;top:64px;}' +
    '.showTable tr{background-color:white;}' +
    '.showTable td{border:1px solid black;}' +
    '.showTable>button{float:right;color:red;position:fixed;right:10px;}' +
    '.showTable>button:nth-child(1){top:70px;}');
    $('<div class="hBanner"></div>').on({
      mousedown: function (e1) {
        if (e1.target !== $('.hasCode') [0]) return;
        $(this).off('mouseout');
        $('body').mouseup(function (e2) {
          var width = 152;
          var topBorder = $(window).height() - $('.hBanner').height();
          var leftBorder = $(window).width() - $('.hBanner').width();
          var top = (e2.clientY - e1.offsetY > 0) ? e2.clientY - e1.offsetY : 0;
          top = (top > topBorder) ? topBorder : top;
          var left = (e2.clientX - e1.offsetX > width) ? e2.clientX - e1.offsetX - width : 0;
          left = (left > leftBorder) ? leftBorder : left;
          $('.hBanner').css({
            top: top + 'px',
            left: left + 'px'
          });
          GM_setValue('top', top);
          GM_setValue('left', left);
          $(this).off('mouseup');
          $('.hBanner').on({
            mouseout: function () {
              $('.hasCode>a').hide();
            }
          });
        });
      },
      mouseover: function () {
        $('.hasCode>a').show();
      },
      mouseout: function () {
        $('.hasCode>a').hide();
      }
    }).css({
      'top': function () {
        return GM_getValue('top', 0);
      },
      'left': function () {
        return GM_getValue('left', 0);
      }
    }).appendTo('body');
    $('<div class="switcher"></div>').html('<span>on</span>').appendTo('.hBanner').on({
      click: function () {
        if ($(this).find('span').text() === 'on') {
          $(this).find('span').text('off');
          $(this).find('span').css('color', 'red');
          undoMarkAdded();
        } else {
          $(this).find('span').text('on');
          $(this).find('span').css('color', 'green');
          markAdded();
        }
      },
      contextmenu: function (e) {
        e.preventDefault();
        $(this).find('span').text('on');
        undoMarkAdded();
        markAdded();
      }
    });
    $('<div class="links"></div>').html(function () {
      var _html = '';
      for (var i in linkLib) {
        if (!linkLib[i].on) continue;
        _html += '<img ';
        if (linkLib[i].online) _html += 'class="avOnline"';
        _html += 'src="' + (linkLib[i].icon || defaultImg) + '"url="' + linkLib[i].search + '"title="' + linkLib[i].name + '"></img>';
      }
      return _html;
    }).on({
      click: function (e) {
        var code = getCode();
        GM_openInTab($(e.target).attr('url').replace('{searchTerms}', code));
      },
      contextmenu: function (e) {
        e.preventDefault();
        var code = getCode().match(/[a-z0-9]+/gi).join(' ');
        GM_openInTab($(e.target).attr('url').replace('{searchTerms}', code));
      },
    }).appendTo('.hBanner');
    $('.links>.avOnline').on({
      mouseover: function () {
        $(this).attr({
          rawSrc: this.src,
          src: 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/youtube-24.png'
        });
      },
      mouseout: function () {
        $(this).attr('src', $(this).attr('rawSrc'));
      }
    });
    $('<div class="addCode"title="添加到数据库/移动"></div>').html('<img src="' + imgLib.add + '"></img>').click(function () {
      addValue(GM_getValue('lastMark', 0));
    }).appendTo('.hBanner');
    $('<div class="delCode"title="从数据库中删除"></div>').html('<img src="' + imgLib.del + '"></img>').click(function () {
      delValue();
    }).appendTo('.hBanner');
    $('<div class="importCode"title="导入到数据库"></div>').html('<img src="' + imgLib.import + '"></img>').click(function () {
      importValue();
    }).appendTo('.hBanner');
    $('<div title="左键:数据库展示\n右键:下载数据库(网页格式)"></div>').html('<img src="' + imgLib.table + '"></img>').on({
      click: function () {
        showValue(0);
        $(this).off('click').on('click', function () {
          $('.showTable').toggle();
        });
      },
      contextmenu: function (e) {
        e.preventDefault();
        showValue(1);
      }
    }).appendTo('.hBanner');
    $('<div title="重启"></div>').html('<img src="' + imgLib.restart + '"></img>').click(function () {
      $('.hBanner').remove();
      undoMarkAdded();
      $(window).removeData('code');
      init();
      markAdded();
    }).appendTo('.hBanner');
    $('<div class="hasCode">(已标记)</div>').appendTo('.hBanner');
    for (var i = 0; i < markLib.length; i++) {
      $('<img src="' + markLib[i].img + '"title="' + i + '|' + markLib[i].name + '"></img>').val(i).click(function () {
        addValue($(this).val());
      }).appendTo('.addCode');
    }
    $(window).keydown(function (e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) { //0-9
        var code = (e.shiftKey) ? prompt('请输入番号', getCode())  : getCode();
        if (!code) return;
        addValue(String.fromCharCode(e.keyCode), code);
      } else if (e.keyCode === 66 && e.shiftKey) { //Shift+B
        addValue(GM_getValue('lastMark', 0));
      }
    });
  }
  function markAdded() {
    $('.hasCode a').remove();
    var lib = GM_getValue('lib', null);
    if (!lib) return;
    if (linkLib[location.host].img) {
      $(linkLib[location.host].img).removeAttr('onerror').attr({
        rawSrc: function () {
          return $(this).attr('src');
        },
        src: function () {
          var keyword;
          var _src = $(this).attr('src');
          for (var i in lib) {
            keyword = new RegExp(i + '|' + i.replace('-', ''), 'gi');
            if (keyword.test(_src)) {
              if ($('.' + i).length === 0) $('<a target="_blank"></a>').addClass(i).attr('href', linkLib['www.javlibrary.com'].search.replace('{searchTerms}', i)).html(i).appendTo('.hasCode');
              _src = markLib[lib[i].mark].img;
            }
          }
          return _src;
        }
      });
    }
    if (linkLib[location.host].text) {
      $(linkLib[location.host].text).each(function () {
        var keyword;
        var _html = $(this).text();
        $(this).empty();
        for (var i in lib) {
          keyword = new RegExp(i + '|' + i.replace('-', ''), 'gi');
          if (keyword.test(_html)) {
            if ($('.' + i).length === 0) $('<a target="_blank"></a>').addClass(i).attr('href', linkLib['www.javlibrary.com'].search.replace('{searchTerms}', i)).html(i).appendTo('.hasCode');
            _html = _html.replace(keyword, '<span style="background-color:' + markLib[lib[i].mark].color + ';color:white;"title="' + markLib[lib[i].mark].name + '">' + i + '</span>');
          }
        }
        $('<span>' + _html + '</span>').appendTo(this);
      });
    }
  }
  function undoMarkAdded() {
    var lib = GM_getValue('lib', null);
    if (!lib) return;
    if (linkLib[location.host].img) {
      $(linkLib[location.host].img).attr({
        src: function () {
          return $(this).attr('rawSrc');
        }
      }).removeAttr('rawSrc');
    }
    $(linkLib[location.host].text).html(function () {
      return $(this).text();
    });
  }
  function addValue(mark, code) { //可选参数code
    mark = parseInt(mark);
    if (mark >= markLib.length) {
      alert('请输入正确的标记，范围：0-' + (markLib.length - 1));
      return;
    }
    var lib = GM_getValue('lib', null) || new Object();
    var code = code || getCode();
    if (!code) return;
    GM_setValue('lastMark', mark);
    lib[code] = {
      mark: mark
    };
    if (mark === 0 || mark === 6) lib[code].time = $(linkLib[location.host].time).text();
    GM_setValue('lib', lib);
    undoMarkAdded();
    markAdded();
  }
  function delValue(code) { //可选参数code
    var lib = GM_getValue('lib', null);
    if (!lib) return;
    var code = code || getCode();
    if (!code) return;
    delete lib[code];
    GM_setValue('lib', lib);
    undoMarkAdded();
    markAdded();
  }
  function importValue() {
    var notice = '请输入车位\n';
    for (var i = 0; i < markLib.length; i++) {
      notice += i + markLib[i].name + '\n';
    }
    var mark = parseInt(prompt(notice));
    if (isNaN(mark) || mark >= markLib.length) {
      alert('请输入正确的标记，范围：0-' + (markLib.length - 1));
      return;
    }
    mark = parseInt(mark);
    var codeArr = prompt('请输入车牌号，以|为分割');
    if (!codeArr) return;
    codeArr = codeArr.split('|');
    var lib = GM_getValue('lib', null) || new Object();
    for (var i = 0; i < codeArr.length; i++) {
      lib[codeArr[i]] = {
        mark: mark
      };
    }
    GM_setValue('lib', lib);
    undoMarkAdded();
    markAdded();
  }
  function showValue(type) {
    var lib = GM_getValue('lib', null) || new Object();
    var _html = '<table class="tablesorter"><thead><tr><th>序号</th><th>数字</th><th>标记</th><th>代码</th><th>时间</th></tr></thead><tbody>';
    var num = 0;
    for (var i in lib) {
      num++;
      _html += '<tr><td>' + num + '</td><td>' + lib[i].mark + '</td><td><img src="' + markLib[lib[i].mark].img + '"></img>' + markLib[lib[i].mark].name + '</td><td><a href="' + linkLib['www.javlibrary.com'].search.replace('{searchTerms}', i) + '"target="_blank">' + i + '</a></td><td>' + (lib[i].time || '') + '</td></tr>';
    }
    _html += '</tbody></table>';
    if (type === 0) {
      $('<div class="showTable"></div>').html(_html).appendTo('body');
      $('<button>x</button>').click(function () {
        $('.showTable').toggle();
      }).prependTo('.showTable');
      $('.showTable>table').tablesorter();
    } else if (type === 1) {
      _html = '<html><head><script src="http://cdn.bootcss.com/jquery/2.1.4/jquery.min.js"></script><script src="http://cdn.bootcss.com/jquery.tablesorter/2.28.5/js/jquery.tablesorter.js"></script><style>.showTable{background-color:white;}.showTable>table{border-collapse:collapse;}.showTable tr{background-color:white;}.showTable th,.showTable td{border:1px solid black;}</style></head><body><div class="showTable">' + _html + '</div><script>$(".showTable>table").tablesorter();</script></body></html>';
      var blob = new Blob([_html], {
        type: 'text/html;charset=utf-8'
      });
      saveAs(blob, '1.html');
    }
  }
  function getCode() {
    if ($(window).data('code')) return $(window).data('code');
    var code;
    if (typeof linkLib[location.host].code === 'string') {
      var temp = $(linkLib[location.host].code);
      if (temp.length > 0) {
        code = (temp[0].tagName === 'INPUT') ? temp.val()  : temp.text();
      } else {
        code = '';
      }
    } else if (typeof linkLib[location.host].code === 'function') {
      code = linkLib[location.host].code();
    } else {
      code = '';
    }
    code = code.toUpperCase();
    $(window).data('code', code);
    return code;
  }
}) (jQuery);
