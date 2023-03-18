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
// SOCIAL PANEL JS
if(1){
const floating_btn = document.querySelector('#mydivheader');
const close_btn = document.querySelector('.close-btn');
const social_panel_container = document.querySelector('.social-panel-container');
floating_btn.addEventListener('click', () => {
	social_panel_container.classList.toggle('visible')
});
close_btn.addEventListener('click', () => {
	social_panel_container.classList.remove('visible')
});
}
// 让DIV元素可拖动：
dragElement(document.getElementById("mydiv"));
function dragElement(elmnt) {
// 初始化变量
var pos1 = pos2 = pos3 = pos4 =0;
// 在header上添加鼠标按下的事件监听器
elmnt.querySelector("#mydivheader").onmousedown = dragMouseDown;
function dragMouseDown(e) {
    // 获取鼠标在开始时的位置
    e = e || window.event; // 兼容IE
    e.preventDefault(); // 阻止默认行为
    pos3 = e.clientX; // 水平位置
    pos4 = e.clientY; // 垂直位置
    // 在文档上添加鼠标移动和松开的事件监听器
    document.onmousemove = elementDrag; 
    document.onmouseup = closeDragElement; 
}
function elementDrag(e) {
    // 计算新的光标位置
    e = e || window.event; // 兼容IE
    e.preventDefault(); // 阻止默认行为
    pos1 = pos3 - e.clientX; // 水平差值
    pos2 = pos4 - e.clientY; // 垂直差值
    pos3 = e.clientX; // 新水平位置
    pos4 = e.clientY; // 新垂直位置
   // 设置新元素位置 
   elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
   elmnt.style.left= (elmnt.offsetLeft -pos1) + "px";
}
function closeDragElement() {
   // 当鼠标按钮松开时，移除事件监听器 
   document.onmouseup= null;
   document.onmousemove= null;
}
}
// 帧率
function pjaxqj(){
if (window.localStorage.getItem("fpson") == undefined || window.localStorage.getItem("fpson") == "1") {
	var rAF = function () {
		return (
			window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			function (callback) {
				window.setTimeout(callback, 1000 / 60);
			}
		);
	}();
	var frame = 0;
	var allFrameCount = 0;
	var lastTime = Date.now();
	var lastFameTime = Date.now();
	var loop = function () {
		var now = Date.now();
		var fs = (now - lastFameTime);
		var fps = Math.round(1000 / fs);
		lastFameTime = now;
		// 不置 0，在动画的开头及结尾记录此值的差值算出 FPS
		allFrameCount++;
		frame++;
		if (now > 1000 + lastTime) {
      var fps = Math.round((frame * 1000) / (now - lastTime));
			if (fps <= 5) {
				var kd = `🤢`
        var kd2 = `一秒一帧🤢`
			} else if (fps <= 15) {
				var kd = `😖`
        var kd2 = `非常难受😖`
			} else if (fps <= 25) {
				var kd = `😨`
        var kd2 = `较低帧率😨`
			} else if (fps < 35) {
				var kd = `🙄`
        var kd2 = `不太流畅🙄`
			} else if (fps <= 45) {
				var kd = `😁`
        var kd2 = `还不错哦😁`
			} else {
				var kd = `🤣`
        var kd2 = `十分流畅🤣`
			}
			document.getElementById("mydivheader").innerHTML = `${kd}`;
      document.getElementById("divwhy").innerHTML = `FPS:${fps} ${kd2}`;
			frame = 0;
			lastTime = now;
		};
		rAF(loop);
	}
	loop();
  } else {
	document.getElementById("mydivheader").style = "display:none!important"
}  }