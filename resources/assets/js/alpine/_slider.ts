import Swiper from 'swiper';
import {
  Autoplay,
  EffectCoverflow,
  EffectFade,
  Navigation,
  Pagination,
  Parallax,
  Scrollbar
} from 'swiper/modules';
import SlideFade from '../swiper/_fade-out.mjs';
import MaterialEffect from '../swiper/_material-effect.mjs';

export default (config) => ({
  swiper: null,

  hasDuplicateSlides: false,

  async init() {
    const SwiperDefaultOptions = {
      modules: [
        Navigation,
        Pagination,
        Parallax,
        Autoplay,
        EffectFade,
        Scrollbar,
        MaterialEffect,
        EffectCoverflow,
        SlideFade
      ],
      navigation: {
        prevEl: this.$refs.prev,
        nextEl: this.$refs.next
      }
    };

    if (config.effect === 'material') {
      this.setupDuplicateSlides(config.slidesPerView);
    } else if (config.hasOwnProperty('breakpoints')) {
      for (const breakpoint in config.breakpoints) {
        if (config.breakpoints[breakpoint].effect === 'material') {
          this.setupDuplicateSlides(
            config.breakpoints[breakpoint].slidesPerView
          );

          break;
        }
      }
    }

    this.swiper = new Swiper(this.$refs.slider, {
      ...SwiperDefaultOptions,
      ...config
    });
  },

  get pages() {
    return this.$refs.slider.querySelectorAll(
      ':scope .swiper-slide:not(.swiper-slide-duplicate)'
    ).length;
  },

  get activeSlide() {
    if (this.swiper === null) return 0;

    if (!this.hasDuplicateSlides) {
      return this.swiper.activeIndex;
    }

    const activeSlide = this.swiper.slides[this.swiper.activeIndex];

    return (
      activeSlide.getAttribute('data-swiper-duplicate-of') ??
      activeSlide.getAttribute('data-swiper-slide-index')
    );
  },

  goToSlide(slideIndex) {
    if (!this.hasDuplicateSlides) {
      this.swiper.slideTo(slideIndex);
    }

    const slideList = this.swiper.slides;
    const currentSlideIndex = this.swiper.activeIndex;
    const currentSlideValue =
      slideList[currentSlideIndex].getAttribute('data-swiper-duplicate-of') ??
      slideList[currentSlideIndex].getAttribute('data-swiper-slide-index');

    if (currentSlideValue == slideIndex) return;

    let j =
      currentSlideIndex == 0 ? slideList.length - 1 : currentSlideIndex - 1;
    let k =
      currentSlideIndex == slideList.length - 1 ? 0 : currentSlideIndex + 1;

    while (k != j) {
      let i =
        slideList[k].getAttribute('data-swiper-duplicate-of') ??
        slideList[k].getAttribute('data-swiper-slide-index');

      if (i == slideIndex) {
        this.swiper.slideTo(k);

        return;
      }

      i =
        slideList[j].getAttribute('data-swiper-duplicate-of') ??
        slideList[j].getAttribute('data-swiper-slide-index');

      if (i == slideIndex) {
        this.swiper.slideTo(j);

        return;
      }

      k = k == slideList.length - 1 ? 0 : k + 1;
      j = j == 0 ? slideList.length - 1 : j - 1;
    }

    this.swiper.slideTo(k);
  },

  setupDuplicateSlides(slidesPerView) {
    const slides = this.$refs.slider.querySelectorAll(':scope .swiper-slide');

    if (slides.length > slidesPerView * 2) {
      return;
    }

    const slideWrapper = this.$refs.slider.querySelector(
      ':scope .swiper-wrapper'
    );

    this.hasDuplicateSlides = true;

    slides.forEach((slide, index) => {
      const _slide = slide.cloneNode(true);

      _slide.classList.add('swiper-slide-duplicate');
      _slide.setAttribute('data-swiper-duplicate-of', index);

      slideWrapper.appendChild(_slide);
    });
  }
});
