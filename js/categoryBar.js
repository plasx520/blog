categoriesBarActive()
topCategoriesBarScroll()

//分类条
function categoriesBarActive(){
  var urlinfo = window.location.pathname;
  urlinfo = decodeURIComponent(urlinfo)
  console.log(urlinfo);
  //判断是否是首页
  if (urlinfo == '/'){
    if (document.querySelector('#category-bar')){
      document.getElementById('首页').classList.add("select")
    }
  }else {
    // 验证是否是分类链接
    var pattern = /\/categories\/.*?\//;
    var patbool = pattern.test(urlinfo);
    console.log(patbool);
    // 获取当前的分类
    if (patbool) {
      var valuegroup = urlinfo.split("/");
      console.log(valuegroup[2]);
      // 获取当前分类
      var nowCategorie = valuegroup[2];
      if (document.querySelector('#category-bar')){
        document.getElementById(nowCategorie).classList.add("select");
      }
    }
  }
  
}

//鼠标控制横向滚动
function topCategoriesBarScroll(){
  if (document.getElementById("category-bar-items")){
    let xscroll = document.getElementById("category-bar-items");
  xscroll.addEventListener("mousewheel", function (e) {
    //计算鼠标滚轮滚动的距离
    let v = -e.wheelDelta / 2;
    xscroll.scrollLeft += v;
    //阻止浏览器默认方法
    e.preventDefault();
}, false);
  }
}
if (document.getElementById('post-cover')) {
} else {
  this.r = Math.floor(Math.random()*120+50);
  this.g = Math.floor(Math.random()*140+50);
  this.b = Math.floor(Math.random()*140+50);
  this.cs = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.85)';
  this.tm = 'rgba('+ this.r +','+ this.g +','+ this.b +',0.2)';
  document.styleSheets[0].addRule(":root[data-theme=light]", "--heo-lighttext:" + this.cs + "!important")
  document.styleSheets[0].addRule(":root[data-theme=light] ", "--heo-theme:" + this.cs + "!important")
  document.styleSheets[0].addRule(":root[data-theme=dark]", "--heo-theme:" + this.cs + "!important")
  document.styleSheets[0].addRule(":root[data-theme=light] ", "--heo-zhuti:" + this.tm + "!important")
  document.styleSheets[0].addRule(":root[data-theme=dark]", "--heo-zhuti:" + this.tm + "!important")
  this.r2 = Math.floor(Math.random()*255+80);
  this.g2 = Math.floor(Math.random()*255+80);
  this.b2 = Math.floor(Math.random()*255+80);
  this.cs2 = 'rgba('+ this.r2 +','+ this.g2 +','+ this.b2 +',0.95)';
  document.styleSheets[0].addRule(":root[data-theme=dark]", "--heo-lighttext:" + this.cs2 + "!important")
}
//提示弹窗
(()=>{
//- 创建盒子
let div = document.createElement("div");
//- 设置ID
div.id = "greeting";
//- 设置class
setTimeout(()=>{
  div.classList.add("shown");
}, 1000)
//- 插入盒子
let greetingBox = document.querySelector("#greetingBox");
greetingBox.appendChild(div);
const nowTime = new Date().getHours();
let greetings = "";
if (0 <= nowTime && nowTime <= 5) {
  greetings = "晚安😴"
} else if (6 <= nowTime && nowTime < 10) {
  greetings = "早上好鸭👋, 祝你一天好心情！"
} else if (10 === nowTime) {
  greetings = "上午好👋, 状态很好，鼓励一下～"
} else if (11 === nowTime) {
  greetings = "11点多啦, 在坚持一下就吃饭啦～"
} else if (12 <= nowTime && nowTime < 14) {
  greetings = "午安👋, 宝贝"
} else if (14 <= nowTime && nowTime < 18) {
  greetings = "下午好👋, 继续加油喔。"
} else if (18 <= nowTime && nowTime < 19) {
  greetings = "🌈充实的一天辛苦啦！"
} else if (19 === nowTime) {
  greetings = "19点喽, 奖励一顿丰盛的大餐吧。"
} else if (20 <= nowTime && nowTime <= 24) {
  greetings = "晚上好👋, 在属于自己的时间好好放松😌~"
} else {
  greetings = "晚上好👋"
}
div.innerHTML = greetings
setTimeout(()=>{
  div.classList.remove("shown");
  setTimeout(()=>{
    greetingBox.remove()
  }, 500)
}, 3000)
})()
