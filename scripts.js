gsap.registerPlugin(ScrollTrigger)

document.documentElement.classList.remove('no-js')

const nav = document.querySelector('nav')
const menuItems = nav.querySelectorAll('a')
window.addEventListener('load', () => {
  nav.classList.add('loaded')
})

const pageTransitionContainer = document.querySelector('.page-transition-container')
const pageTransition = document.querySelectorAll('.page-transition')

window.addEventListener('load', () => {
  pageTransition[0].classList.add('first')
  gsap.to(pageTransition, {
    y: '100%',
    stagger: 0.2,
    onComplete() {
      pageTransitionContainer.classList.add('done')
      pageTransition[0].classList.remove('first')
    }
  })
})

menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault()
    pageTransitionContainer.classList.remove('done')
    pageTransition[1].classList.add('first')
    gsap.fromTo(pageTransition, {
      y: '-100%'
    },{
      y: '0%',
      stagger: 0.2,
      onComplete() {
        location.replace(item.href)
      }
    })
  })
})

const openModal = document.querySelector('.open-modal')
const modal = document.querySelector('.modal')
const modalClose = document.querySelector('.modal .close')

openModal.addEventListener('click', () => {
  modal.classList.add('open')
})

modalClose.addEventListener('click', () => {
  modal.classList.remove('open')
})


const startTransitionButton = document.querySelector('.start-transition')
const transitionBox = document.querySelector('.box.transition')

startTransitionButton.addEventListener('click', () => {
  transitionBox.classList.add('start-transition')
})

transitionBox.addEventListener('transitionstart', () => {
  startTransitionButton.textContent = 'Animation started'
})

let id 
transitionBox.addEventListener('transitionend', () => {
  clearTimeout(id)
  startTransitionButton.textContent = 'Animation completed'
  transitionBox.classList.remove('start-transition')
  id = setTimeout(() => {
    startTransitionButton.textContent = 'Start transition'
  }, 1000)
})

const startAnimationButton = document.querySelector('.start-animation')
const animationIterations = document.querySelector('.animation-iterations')
let animationIterationsCounter = 0
const animationFromTo = document.querySelector('.animation-fromto')
const animationBox = document.querySelector('.box.animation')
let isPaused = false
const pauseAnimation = document.querySelector('.pause-animation')

startAnimationButton.addEventListener('click', () => {
  animationBox.classList.toggle('animation-started')
  startAnimationButton.textContent = animationBox.classList.contains('animation-started') ? 'Stop animation' : 'Start animation'
})

animationFromTo.addEventListener('animationiteration', () => {
  animationIterationsCounter++
  animationIterations.textContent = `Animation iterations: ${animationIterationsCounter}`
})
animationBox.addEventListener('animationiteration', () => {
  animationIterationsCounter++
  animationIterations.textContent = `Animation iterations: ${animationIterationsCounter}`
})

pauseAnimation.addEventListener('click', () => {
  isPaused = !isPaused
  if (isPaused) {
    animationFromTo.style = 'animation-play-state: paused'
    animationBox.style = 'animation-play-state: paused'
  } else {
    animationFromTo.style = 'animation-play-state: running'
    animationBox.style = 'animation-play-state: running'
  }
})

const intersect = document.querySelector('.intersect')
const observer = new IntersectionObserver((entries) => {
  intersect.style = `transform: translate(${entries[0].intersectionRatio * 500}%, 0)`
}, {
  threshold: [0.25, 0.5, 0.75, 1]
})
observer.observe(intersect);

const scrollContainer = document.querySelector('.scroll-container')
const containerBox = scrollContainer.getBoundingClientRect()
const scrollBox = document.querySelector('.scroll.box')
const main = document.querySelector('main')

function clamp (value, min, max) {
  return Math.min(Math.max(value, min), max)
}

function lerp(v0, v1, t) {
  return v0*(1-t)+v1*t
}

function inverseLerp( x, y, value ) {
	if ( x !== y ) {
		return ( value - x ) / ( y - x );
	} else {
		return 0;
	}
}

main.addEventListener('scroll', () => {
  const clamped = clamp(main.scrollTop, containerBox.top, containerBox.bottom)
  const lerped = inverseLerp(containerBox.top, containerBox.bottom, clamped)
  scrollBox.style = `transform: translateY(${lerped * 800}%)`
}, {
  passive: true
})

const boxGsapTo = document.querySelector('.box.gsap-to')
const gsapToStartButton = document.querySelector('.start-gsap-to-animation')
let aan = false
gsapToStartButton.addEventListener('click', () => {
  aan = !aan
  const value = aan ? 300: 0
  gsap.to(boxGsapTo, {
    x: value,
    y: value
  })
})

const gsapTimelineStartButton = document.querySelector('.start-gsap-timeline-animation')
const gsapTimelineBox = document.querySelector('.gsap-timeline')
const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1, paused: true, yoyo: true })
timeline.to(gsapTimelineBox, {
  x: 100,
  // ease: 'linear'
}).to(gsapTimelineBox, {
  y: 100,
  // ease: 'linear'
}).to(gsapTimelineBox, {
  x: 0,
  y: 200,
  // ease: 'linear'
})
let isPlaying = true

gsapTimelineStartButton.addEventListener('click', () => {
  isPlaying = !isPlaying
  if (isPlaying) {
    timeline.pause()
  } else {
    timeline.play()
  }
})