import {
  Alpine,
  Livewire
} from '../../../../vendor/livewire/livewire/dist/livewire.esm.js';

import Collapse from '@alpinejs/collapse';
import Focus from '@alpinejs/focus';
import Intersect from '@alpinejs/intersect';

Alpine.plugin(Collapse);
Alpine.plugin(Intersect);
Alpine.plugin(Focus);

/**
 * Custom Plugins
 */
import emerge from './_emerge';
import { default as header } from './_header';

Alpine.store('header', header);

/**
 * Reusable Data Objects
 */
import slider from './_slider.js';

Alpine.plugin(emerge);

Alpine.data('slider', slider);

Livewire.start();
