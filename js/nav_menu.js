// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
  let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
    b =
      Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
    result = Math.round((a / b) * 100), // 计算百分比
    btn = document.querySelector("#percent"); // 获取图标

  result <= 99 || (result = 99), (btn.innerHTML = result);
}
document.getElementById("page-name").innerText = document.title.split(" | 怕冷爱上雪")[0];
//幻灯片首页
const AUTO_PLAY_SECOND = 4000

let carousel = document.querySelector(".carousel")
let dots = document.querySelectorAll(".dot a")
let slides = document.querySelector(".slides")
let slideCount = dots.length

let setActiveIndex = activeIndex => {
  dots.forEach(dot => dot.classList.remove("active"))
  dots[activeIndex].classList.add("active")
  carousel.style.setProperty("--active-index", `${activeIndex}`)
}

let scrollLeft = () => {
  let minIndex = false
  let activeIndex = Number(carousel.style.getPropertyValue("--active-index"))
  activeIndex--
  if (activeIndex === -1) {
    minIndex = true
    activeIndex = slideCount - 1
  }
  setActiveIndex(activeIndex)
  if (minIndex) {
    slides.scrollBy(carousel.offsetWidth * (slideCount - 1), 0)
  } else {
    slides.scrollBy(-carousel.offsetWidth, 0)
  }
}

let scrollRight = () => {
  let maxIndex = false
  let activeIndex = Number(carousel.style.getPropertyValue("--active-index"))
  activeIndex++
  if (activeIndex === slideCount) {
    maxIndex = true
    activeIndex = 0
  }
  setActiveIndex(activeIndex)
  if (maxIndex) {
    slides.scrollBy(-carousel.offsetWidth * (slideCount - 1), 0)
  } else {
    slides.scrollBy(carousel.offsetWidth, 0)
  }
}

// auto play
let autoPlayTimer = setInterval(scrollRight, AUTO_PLAY_SECOND)
let canAutoPlay = carousel.classList.contains("auto-play")
if (!canAutoPlay) {
  clearInterval(autoPlayTimer)
}

let resetTimer = () => {
  if (canAutoPlay) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = setInterval(scrollRight, AUTO_PLAY_SECOND)
  }
}

// dots
dots[0].classList.add("active")
dots.forEach((dot, activeIndex) => {
  dot.addEventListener("click", () => {
    resetTimer()
    setActiveIndex(activeIndex)
  })
})

// arrows
let leftArrow = document.querySelector(".nav-arrows .arrow-left")
let rightArrow = document.querySelector(".nav-arrows .arrow-right")
leftArrow.addEventListener("click", () => {
  resetTimer()
  scrollLeft()
})
rightArrow.addEventListener("click", () => {
  resetTimer()
  scrollRight()
})
