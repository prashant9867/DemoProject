'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const openModal = function (e) {
  e.preventDefault();
  console.log(e);
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);
btnsOpenModal.forEach(btn => {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//                   Button Scroll

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log("S1", s1coords);

  // console.log(window.pageXOffset, window.pageYOffset);
  // console.log(e.target.getBoundingClientRect());

  // console.log("show height/width of ViewPort", document.documentElement.clientHeight, document.documentElement.clientWidth);
  // window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);
  // window.scrollTo({
  //   left: s1coords.left,
  //   top: s1coords.top,
  //   behavior: 'smooth',

  // })
  section1.scrollIntoView({ behavior: "smooth" });
})


//      PAGE NAVIGATION

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     console.log("link");
//     console.log(el);
//     const id = el.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   })
// })

//              PAGE NAVIGATION USING EVENT PROPAGATION

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log(e.target);

  //          apply matching pattern for e.target 
  if (e.target.classList.contains('nav__link')) {
    // console.log("LINK");
    const id = e.target.getAttribute('href');
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
})


//                    Tabbed Components

const tabs = document.querySelectorAll('.operations__tab');

const tabContainer = document.querySelector('.operations__tab-container');

const tabsContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);
  tabs.forEach(function (el) {
    el.classList.remove('operations__tab--active');
  })
  if (!clicked) return;
  clicked.classList.add('operations__tab--active');
  // console.log();

  const dataTarget = clicked.dataset.tab;
  console.log(dataTarget);

  tabsContent.forEach((el, idx) => {
    if (idx + 1 === Number(dataTarget)) {
      el.classList.add('operations__content--active')
    } else {
      el.classList.remove('operations__content--active');
    }
  })
})


//      Parsing Arguments to events handlers

const nav = document.querySelector('.nav');
const navLink = document.querySelectorAll('.nav__link');

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    // console.log("link", link);
    // console.log("Siblings", siblings);
    // console.log("LOGO", logo);
    siblings.forEach(el => {
      if (el != e.target) el.style.opacity = this
    })
    logo.style.opacity = this;
  }
  // console.log(this);
}
nav.addEventListener('mouseover', handleHover.bind(0.5))

nav.addEventListener('mouseout', handleHover.bind(1))



//         STICKY NAVIGATION
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY, initialCoords.top);
//   // console.log(initialCoords);
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// })

//          InteractionObserver API

// const obsCallBack = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }

// const obsOptions = {
//   root: null,
//   threshold: 0.1
// }

// const observer = new IntersectionObserver(obsCallBack, obsOptions);
// observer.observe(document.querySelector('.features__img'));

const header = document.querySelector('.header');

const stikyNav = function (entries, headerObserver) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}

const navCoords = nav.getBoundingClientRect();
// console.log(navCoords);

const headerObserver = new IntersectionObserver(stikyNav,
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navCoords.height}px`
  }
)

headerObserver.observe(header);



//   REVEAL SECTIONS USING INTERSECTIONOBSERVER API

const sectionTabs = document.querySelectorAll('.section');
// console.log(sectionTabs);
const sectionCallBack = function (entries, sectionObserver) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden');

  sectionObserver.unobserve(entry.target);
}
const sectionOptions = {
  root: null,
  threshold: 0.1,
}
const sectionObserver = new IntersectionObserver(sectionCallBack, sectionOptions);
sectionTabs.forEach(el => {
  sectionObserver.observe(el);
  // el.classList.add('section--hidden');
});



//      LAZY LOADING IMAGES
const imgTargets = document.querySelectorAll('img[data-src]');

// console.log(imgTargets);

const imgCallback = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  if (entry.isIntersecting) {
    // console.log(entry);
    console.log(entry.target);
  }
  entry.target.src = entry.target.dataset.src;


  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  })

  observer.unobserve(entry.target)

}
const imgOptions = {
  root: null,
  threshold: 1,
}
const imgObserver = new IntersectionObserver(imgCallback, imgOptions);
imgTargets.forEach(img => imgObserver.observe(img));


// SLIDER COMPONENTS


const slides = document.querySelectorAll('.slide');
console.log(slides);
// const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.2) translateX(-800px)';
// slider.style.overflow = 'visible';
const rightSlide = document.querySelector('.slider__btn--right');
const leftSlide = document.querySelector('.slider__btn--left');
const dotContainer = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot dots__dot--active" data-slide="${i}"></button>`)
  })
}
const goTOSlide = function (cur) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - cur)}%)`;
    curSlideActive(cur);
    //0 % 100 % 200 % 300 %
    // -100% 0% 100% 200% 
    // el.style.translate
  })
}

const curSlideActive = function (curDots) {
  const dots = dotContainer.querySelectorAll('.dots__dot');
  dots.forEach(function (el, i) {
    if (i == curDots) {
      el.classList.add('dots__dot--active');
    } else {
      el.classList.remove('dots__dot--active');
    }
  })
}

const init = function () {
  goTOSlide(0);
  createDots();
  curSlideActive(0);
}
init();

const nextSlide = function () {
  if (curSlide == maxSlide - 1) curSlide = 0;
  else curSlide++
  goTOSlide(curSlide);
  console.log(curSlide);
}

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  }
  else curSlide--
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  })
  console.log(curSlide);
}

rightSlide.addEventListener('click', nextSlide)
leftSlide.addEventListener('click', prevSlide)

document.addEventListener('keydown', function (e) {
  console.log(e);
  if (e.key == 'ArrowRight') nextSlide();
  e.key === 'ArrowLeft' && prevSlide();
})

dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const curDots = Number(e.target.dataset.slide);
    console.log(e.target);
    console.log(curDots);
    curSlideActive(curDots);
    goTOSlide(curDots);
  }
})
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');

// console.log(allSections);

// console.log(document.getElementById('section--1'));

// const allButtons = document.getElementsByTagName('button');

// console.log(allButtons);
// //creating and inserting 
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.innerHTML = 'we are the best. <button class = "btn btn--close-cookie">Got it !</button>';

// //Appending  

// header.append(message);
// header.prepend(message.cloneNode(true));
// header.after(message.cloneNode(true));


//Deleting

// document.querySelector('.btn--close-cookie').addEventListener('click', function () {
//   message.remove();
// });


// message.style.backgroundColor = 'lightgreen';



// message.style.height = Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';
// console.log(message.style.height);
// console.log(getComputedStyle(message).height);

// document.documentElement.style.setProperty('--color-primary', 'orangered');



// const logo = document.querySelector('.nav__logo');

// console.log(logo.className);
// console.log(logo.getAttribute('src'));



//Event Propagation Practice

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () => {
//   return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`
// };

// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   e.preventDefault();
//   this.style.backgroundColor = randomColor();
//   console.log("Link", e.target, e.currentTarget);
//   // e.stopPropagation();
// })

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Container", e.target, e.currentTarget);
// }, true)

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   console.log("Nav", e.target, e.currentTarget);
// }, true)



//              DOM Traversing 

// const h1 = document.querySelector('h1');

// console.log(h1);

// //Going Downwards: child

// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);


document.addEventListener('DOMContentLoaded', function (e) {
  console.log("DOMContent", e);
})