import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'


//장바구니!

const basketStarterEl = document.querySelector('header .basket-starter')
const basketEl = basketStarterEl.querySelector('.basket')

basketStarterEl.addEventListener('click', function (event) {
  // 윈도우를 클릭한 것이라 판단하는 것을 막기위해
  event.stopPropagation()
  if (basketEl.classList.contains('show')) {
  //hide
  hideBasket()
  }
  else {
    //show
    showBasket()
  }
})
// 드롭다운 박스를 클릭했을 때, 상자가 사라지지 않도록
basketEl.addEventListener('click', function (event) {
  event.stopPropagation()
})

window.addEventListener('click', function() {
  basketEl.classList.remove('show')
})

function showBasket() {
  basketEl.classList.add('show')
}
function hideBasket() {
  basketEl.classList.remove('show')
}


//검색
const headerEl = document.querySelector('header')
//... => 전개연산자 , querySelectorAll을 통해서 찾아낸 요소들이 전개연산에 의해 해체됨 / 배열로 변환
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')]
const searchWrapEl = headerEl.querySelector('.search-wrap')
const searchStarterEl = headerEl.querySelector('.search-starter')
const searchCloserEl = searchWrapEl.querySelector('.search-closer')
const searchShadowEl = searchWrapEl.querySelector('.shadow')
const searchInputEl = searchWrapEl.querySelector('input')
const searchDelayEls = [...searchWrapEl.querySelectorAll('li')]

//돋보기 버튼 누르면 해당 내용 볼 수 있도록
searchStarterEl.addEventListener('click', showSearch)
//엑스 버튼 누르면 내용이 사라지도록
searchCloserEl.addEventListener('click', function(event) {
  // 엑스 버튼을 클릭한 것이 상위 요소에까지 영향을 끼치는 것을 막아줌
  event.stopPropagation()
  hideSearch()
})
//불투명한 바탕누르면 내용이 사라지도록
searchShadowEl.addEventListener('click', hideSearch)

function showSearch() {
  headerEl.classList.add('searching')
  stopScroll()
  headerMenuEls.reverse().forEach(function (el, index) {
    // 1초 뒤에 애니메이션 처리 시작됨
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  setTimeout(function () {
    searchInputEl.focus()
  }, 600)
}
function hideSearch() {
  headerEl.classList.remove('searching')
  playScroll()
  headerMenuEls.reverse().forEach(function (el, index) {
    // 1초 뒤에 애니메이션 처리 시작됨
    el.style.transitionDelay = index * .4 / headerMenuEls.length + 's'
  })
  searchDelayEls.reverse().forEach(function (el, index) {
    el.style.transitionDelay = index * .4 / searchDelayEls.length + 's'
  })
  searchDelayEls.reverse()
  searchInputEl.value = ''
} 


function playScoll () {
  document.documentElement.classList.remove('fixed')
}
function stopScroll () {
  document.documentElement.classList.add('fixed')
}



//헤더 메뉴 토글!
const menuStarterEl = document.querySelector('header .menu-starter')

menuStarterEl.addEventListener('click', function () {
  if (headerEl.classList.contains('menuing')) {
    headerEl.classList.remove('menuing')
    searchInputEl.value = ''
    playScroll()
  }
  else {
    headerEl.classList.add('menuing')
    stopScroll()
  }
})


//헤더 검색
const searchTextFieldEl = document.querySelector('header .textfield')
const searchCancelEl = document.querySelector('header .search-canceler')

searchTextFieldEl.addEventListener('click', function() {
  headerEl.classList.add('searching--mobile')
})
searchCancelEl.addEventListener('click', function() {
  headerEl.classList.remove('searching--mobile')
  searchInputEl.focus()
})

// 윈도우의 크기가 바뀔 때마다 함수가 실행
window.addEventListener('resize', function() {
  // 모바일 모드
  if(window.innerWidth <= 740 ) {
    headerEl.classList.remove('searching')
  }
  // 태블릿 또는 데스크탑 모드
  else {
    headerEl.classList.remove('searching--mobile')
  }
})


const navEl = document.querySelector('nav')
const navMenuToggleEl = navEl.querySelector('.menu-toggler')
const navMenuShadowEl = navEl.querySelector('.shadow')

navMenuToggleEl.addEventListener('click', function() {
  if(navEl.classList.contains('menuing')) {
    hideNavMenu()
  }
  else {
    showNavMenu()
  }
})

// nav를 클릭했을 때, window를 클릭한 것과 같은 효과를 막아줌
navEl.addEventListener('click',function(event) {
  event.stopPropagation()
})
navMenuShadowEl.addEventListener('click', hideNavMenu)
window.addEventListener('click', hideNavMenu)


function showNavMenu() {
  navEl.classList.add('menuing')
}
function hideNavMenu() {
  navEl.classList.remove('menuing')
}


// 요소의 가시성 관찰
const io = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting) {
      return
    }
    entry.target.classList.add('show')
  })
})

const infoEls = document.querySelectorAll('.info')
infoEls.forEach(function (el) {
  io.observe(el)
})


// 비디오 재생

window.onload = function() {
  const video = document.querySelector('.stage video')
  const playBtn = document.querySelector('stage .controller--play')
  const pauseBtn = document.querySelector('stage .controller--pause')

  
  playBtn.addEventListener('click', function () {
    video.play()
    playBtn.classList.add('hide')
    pauseBtn.classList.remove('hide')
  })
  pauseBtn.addEventListener('click', function () {
    video.pause()
    playBtn.classList.remove('hide')
    pauseBtn.classList.add('hide')
  })
}



// '당신에게 맞는 iPad는?' 렌더링
const itemsEl = document.querySelector('section.compare .items')

ipads.forEach(function (ipad) {
  const itemEl = document.createElement('div')
  itemEl.classList.add('item')

let colorList = ''
ipad.colors.forEach(function (color) {
  colorList += `<li style="background-color : ${color};"></li>`
})

  itemEl.innerHTML = /*html*/`
    <div class="thumbnail">
      <img src="${ipad.thumbnail}" alt="${ipad.name}" />
    </div>
    <ul class="colors">
      ${colorList}
    </ul>
    <h3 class="name">${ipad.name}</h3>
    <p class="tagline">${ipad.tagline}</p>
    <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
    <button class="btn">구입하기</button>
    <a href="${ipad.url}" class="link">더 알아보기</a>
    `

  itemsEl.append(itemEl)
})


const navigationsEl = document.querySelector('footer .navigations')
navigations.forEach(function (nav) {
  const mapEl = document.createElement('div')
  mapEl.classList.add('map')

  let mapList = ''
  nav.maps.forEach(function (map) {
    mapList += /*HTML*/ `
      <li>
        <a href="${map.url}">${map.name}</a>
      <li>
      `
  })

  mapEl.innerHTML = /*HTML*/`
  <h3>
    <span class="text">${nav.title}</span>
    <span class="icon">+</span>
  </h3>
  <ul>
    ${mapList}
  <ul>
  `

  navigationsEl.append(mapEl)
})

const thisYearEl = document.querySelector('span.this-year')
thisYearEl.textContent = new Date().getFullYear()


const mapEls = document.querySelectorAll('footer .navigations .map')
mapEls.forEach(function (el) {
  const h3El = el.querySelector('h3')
  h3El.addEventListener('click', function () {
    el.classList.toggle('active')
  })
})