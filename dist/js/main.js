
const body = document.querySelector('body'),
    html = document.querySelector('html'),
    menu = document.querySelectorAll('.header__burger, .header__nav, body'),
    burger = document.querySelector('.header__burger'),
    header = document.querySelector('.header');


let slideCheck = true;
let slideUp = (target, duration=500) => {
  slideCheck = false;
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.boxSizing = 'border-box';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout( () => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    slideCheck = true;
  }, duration);
}

let slideDown = (target, duration=500) => {
  target.style.removeProperty('display');
  slideCheck = false;
  let display = window.getComputedStyle(target).display;

  if (display === 'none')
    display = 'block';

  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.boxSizing = 'border-box';
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout( () => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    slideCheck = true;
  }, duration);
}

let thisTarget;
body.addEventListener('click', function (event) {

  function $(elem) {
    return event.target.closest(elem);
  }

  // =-=-=-=-=-=-=-=-=-=- <burger in header> -=-=-=-=-=-=-=-=-=-=-

  if ($('.header__burger')) {
      menu.forEach(element => {
          element.classList.toggle('_active')
      })
  }
  
  // =-=-=-=-=-=-=-=-=-=- </burger in header> -=-=-=-=-=-=-=-=-=-=-


  // =-=-=-=-=-=-=-=-=-=- <scroll to section> -=-=-=-=-=-=-=-=-=-=-

  let btnToScroll = $('.btn-scroll-wrapper a');
  if(btnToScroll) {
    event.preventDefault();
    let section;

    if(btnToScroll.getAttribute('href').length <= 1) {
      section = 0
    } else {
      section = document.querySelector(btnToScroll.getAttribute('href')).offsetTop;
    }

    menu.forEach(elem => {
      elem.classList.remove('_active')
    })

    window.scroll({
      left: 0,
      top: section,
      behavior: 'smooth'
    })

  }

  // =-=-=-=-=-=-=-=-=-=- </scroll to section> -=-=-=-=-=-=-=-=-=-=-

  

  // =-=-=-=-=-=-=-=-=-=- <choose lang> -=-=-=-=-=-=-=-=-=-=-

  let headerLangTarget = $('.header__lang--target');
  if(headerLangTarget) {
    headerLangTarget.classList.toggle('_active')
  } else if(!$('.header__lang') && document.querySelector('.header__lang--target')) {
    document.querySelectorAll('.header__lang--target').forEach(target => {
      target.classList.remove('_active')
    })
  }

  // =-=-=-=-=-=-=-=-=-=- </choose lang> -=-=-=-=-=-=-=-=-=-=-



  // =-=-=-=-=-=-=-=-=-=- <FAQ> -=-=-=-=-=-=-=-=-=-=-

  const faqItemQuestion = $('.faq__item--question');
  if(faqItemQuestion) {
    const item = faqItemQuestion.closest('.faq__item'),
          answear = item.querySelector('.faq__item--answear');

    if(!item.classList.contains('_sliding')) {
      item.classList.add('_sliding');
      if(item.classList.contains('_active')) {
        slideUp(answear)
        answear.style.display = 'block';
        item.classList.remove('_active')
        setTimeout(() => {
          item.classList.remove('_sliding');
        },500)
      } else {
        slideDown(answear)
        item.classList.add('_active')
        setTimeout(() => {
          item.classList.remove('_sliding');
        },500)
      }
    }
    
  }

  // =-=-=-=-=-=-=-=-=-=- </FAQ> -=-=-=-=-=-=-=-=-=-=-

})

/* body.addEventListener("mouseover", function (event) {
  function $(elem) {
    return event.target.closest(elem);
  }

  const headerLang = $('.header__lang');
  if(headerLang) {
    if(!headerLang.classList.contains('_hover')) {
      headerLang.classList.add('_hover')
    }
  }

})

body.addEventListener("mouseout", function (event) {
  function $to(elem) {
    return event.relatedTarget.closest(elem);
  }

  function $from(elem) {
    return event.target.closest(elem);
  }

  const headerLang = $from('.header__lang');
  if(headerLang) {
    if(headerLang.classList.contains('_hover') && !event.relatedTarget.closest('.header__lang')) {
      headerLang.classList.remove('_hover')
    }
  }

}) */

function hover(hover, blur) {
  body.addEventListener("mouseover", function (event) {

    hover(
      function $(elem) {
        return event.target.closest(elem);
      }
    )

  })
  
  body.addEventListener("mouseout", function (event) {

    blur(
      function $from(elem) {
        return event.target.closest(elem);
      },
      function $to(elem) {
        return event.relatedTarget.closest(elem);
      }
    )
  
  })
}

hover(
  function ($) {

    const headerLang = $('.header__lang');
    if(headerLang) {
      if(!headerLang.classList.contains('_hover')) {
        headerLang.classList.add('_hover')
      }
    }

  },
  function ($from, $to) {

    const headerLang = $from('.header__lang');
    if(headerLang) {
      if(headerLang.classList.contains('_hover') && !$to('.header__lang')) {
        headerLang.classList.remove('_hover')
      }
    }

  })

// =-=-=-=-=-=-=-=-=-=-=-=- <slider> -=-=-=-=-=-=-=-=-=-=-=-=

let reviewsSlider = new Swiper('.reviews__slider', {
  
    spaceBetween: 30,
    slidesPerView: 1,
    /* centeredSlides: false,

    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }, */
    navigation: {
        nextEl: '#reviews-slider-arrow-next',
        prevEl: '#reviews-slider-arrow-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      }
    }
}); 

let reviewsCustomersSlider = new Swiper('.reviews-customers__slider', {
  
  spaceBetween: 15,
  slidesPerView: 1,
  loop: true,
  /* centeredSlides: false,

  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }, */
  navigation: {
      nextEl: '#reviews-customers-slider-arrow-next',
      prevEl: '#reviews-customers-slider-arrow-prev',
  },
  breakpoints: {
    600: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    992: {
      slidesPerView: 3,
    },
  }
}); 

// =-=-=-=-=-=-=-=-=-=-=-=- </slider> -=-=-=-=-=-=-=-=-=-=-=-=

function resize() {

  html.style.setProperty('--height-screen', window.innerHeight + 'px')

}

resize();

window.onresize = resize;

/* var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene); */
document.querySelectorAll('.parallax').forEach(parallax => {
  new Parallax(parallax, {
    gyroscope: true,
  });
})

/* 
// =-=-=-=-=-=-=-=-=-=-=-=- <Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

wow = new WOW({
mobile:       false,
})
wow.init();

// =-=-=-=-=-=-=-=-=-=-=-=- </Анимации> -=-=-=-=-=-=-=-=-=-=-=-=

*/
