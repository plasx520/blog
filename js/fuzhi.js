
// 检测按键
window.onkeydown = function (e) {
  if (e.keyCode === 123) {
    btf.snackbarShow('开发者模式已打开，请遵循GPL协议', false, 3000)
  }
}
/** 监听copy事件 */
document.addEventListener("copy",function(e){
  //复制的内容
  btf.snackbarShow('复制成功，请遵循GPL协议', false, 3000)
})

document.onkeydown = function(e) {
  var keyCode = e.keyCode || e.which || e.charCode;
  var ctrlKey = e.ctrlKey || e.metaKey;
  if(ctrlKey && keyCode == 67) {
    btf.snackbarShow('快捷键拷贝成功，请遵循GPL协议', false, 3000)    // 按下后执行的代码
  }
  e.preventDefault();
  return false;
}