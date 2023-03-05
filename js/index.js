/*pjax加载函数*/
whenDOMReady()
function whenDOMReady() {
  if (typeof pjaxqj === 'function') {pjaxqj();}
  if (typeof pjaxxc === 'function') {pjaxxc();}
}
document.addEventListener("pjax:complete", whenDOMReady) // pjax加载完成（切换页面）后再执行一次
document.addEventListener("DOMContentLoaded",whenDOMReady);//第一次

/*首页下载板块更新悬浮效果*/
$(".down-index .type a").hover(function (e) {
$(".down-index .type .hover").removeClass("hover");
$(this).addClass("hover");
/*计算当前应该偏移的高度*/
var index = $(".down-index .type .hover").index();
var x = $(".down-index").width() * index + parseInt($(".down-index").css("margin-right")) * index;
$(".down-index .tpl-tr1").css("transform", "translateX(-" + x + "px)");
});
/*首页下载板块更新悬浮效果*/
$(".down-list .type a").hover(function (e) {
$(".down-list .type .hover").removeClass("hover");
$(this).addClass("hover");
/*计算当前应该偏移的高度*/
var index = $(".down-list .type .hover").index();
var x = $(".down-list").width() * index + parseInt($(".down-list").css("margin-right")) * index;
$(".down-list .tpl-tr").css("transform", "translateX(-" + x + "px)");
});

//首页大卡片恢复显示
$(".div-card3").hover(function () {
}, function () {
hoverOnCommentBarrage = false;
document.getElementById("todayCard").classList.remove('hide');
document.getElementById('todayCard').style.zIndex = 1;
});

function buttonClick() {
if (document.getElementById("todayCard")) {
  document.getElementById("todayCard").classList.add('hide');
}
}
// 音乐
var anzhiyu_musicPlaying = false;
var anzhiyu_musicFirst = false;
var navMusicEl = document.getElementById("nav-music");
var anzhiyu = {
  //切换音乐播放状态
  musicToggle: function (changePaly = true) {
    if (!anzhiyu_musicFirst) {
      musicBindEvent();
      anzhiyu_musicFirst = true;
    }
    let msgPlay = '<i class="fa-solid fa-play"></i><span>播放音乐</span>'; // 此處可以更改為你想要顯示的文字
    let msgPause = '<i class="fa-solid fa-pause"></i><span>暂停音乐</span>'; // 同上，但兩處均不建議更改
    if (anzhiyu_musicPlaying) {
      navMusicEl.classList.remove("playing");
      // 修改右键菜单文案为播放
      // document.getElementById("menu-music-toggle").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
      // document.querySelector("#consoleMusic").classList.remove("on");
      anzhiyu_musicPlaying = false;
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("playing");
      // 修改右键菜单文案为暂停
      // document.getElementById("menu-music-toggle").innerHTML = msgPause;
      // document.querySelector("#consoleMusic").classList.add("on");
      anzhiyu_musicPlaying = true;
      navMusicEl.classList.add("stretch");
    }
    if (changePaly) document.querySelector("#nav-music meting-js").aplayer.toggle();
  },
  // 音乐伸缩
  musicTelescopic: function () {
    if (navMusicEl.classList.contains("stretch")) {
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("stretch");
    }
  },

  //音乐上一曲
  musicSkipBack: function () {
    document.querySelector("#nav-music meting-js").aplayer.skipBack();
  },

  //音乐下一曲
  musicSkipForward: function () {
    document.querySelector("#nav-music meting-js").aplayer.skipForward();
  },

  //获取音乐中的名称
  musicGetName: function () {
    var x = $(".aplayer-title");
    var arr = [];
    for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText;
    }
    return arr[0];
  },
};

// 音乐绑定事件
function musicBindEvent() {
  document.querySelector("#nav-music .aplayer-music").addEventListener("click", function () {
    anzhiyu.musicTelescopic();
  });
  document.querySelector("#nav-music .aplayer-button").addEventListener("click", function () {
    anzhiyu.musicToggle(false);
  });
}
