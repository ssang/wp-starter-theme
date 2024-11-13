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
        EffectCoverflow
      ],
      navigation: {
        prevEl: this.$refs.prev,
        nextEl: this.$refs.next
      }
    };

    this.swiper = new Swiper(this.$refs.slider, {
      ...SwiperDefaultOptions,
      ...config
    });
  }
});
