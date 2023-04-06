import './_bootstrap';
import './_fonts';

import header from './alpine/_header'

import '../css/app.css'

window.Alpine.store('header', header);
 
window.Alpine.start()