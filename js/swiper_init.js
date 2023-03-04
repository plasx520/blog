var swiper = new Swiper("#cyber-swiper-container", {
    direction: "horizontal", //横向切换
    loop: true,
    grabCursor : true,//鼠标悬停时显示抓手
    updateOnWindowResize: true, //屏幕变动时重新计算
    slidesPerView: 1,
    spaceBetween: 30, // 每块间隔
    mousewheel: true, //鼠标滚轮控制切换
    pagination: {
      el: ".swiper-pagination",
      clickable: true, // 点击分页切换
    },
    autoplay: {
      delay: 2000,//2秒切换一次
      disableOnInteraction: true, // 操作以后停止自动播放
    },
  });
var swiper = new Swiper ('#noticeList', {
  spaceBetween: 30,
  centeredSlides: true,
  direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
})