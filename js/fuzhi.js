window.addEventListener("pjax:complete",pjaxsx);//后面几次，pjax加载
function whenDOMReady() {
    pjaxqj()
    pjaxdt()

  }
whenDOMReady() // 打开网站先执行一次
document.addEventListener("pjax:complete", whenDOMReady) // pjax加载完成（切换页面）后再执行一次
  
  // whenDOMReady函数外放一些打开网站之后只需要执行一次的函数和代码，比如一些监听代码。
  // 监听代码只需要执行一次即可，不需要每次加载pjax都执行，会出现一些Bug。至于为什么，我也不知道，可以自己试一下。