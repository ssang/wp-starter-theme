import { Livewire, Alpine } from '../../../../vendor/livewire/livewire/dist/livewire.esm'

/**
 * Custom Plugins
 */
import emerge from "./_emerge"

/**
 * Stores
 */
import { default as header } from './_header'

/**
 * Reusable Data Objects
 */

Alpine.plugin(emerge)

Alpine.store('header', header)

Livewire.start()