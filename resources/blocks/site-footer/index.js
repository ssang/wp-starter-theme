/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks'

/**
 * Internal dependencies
 */
import Edit from './SiteFooter'
import metadata from './block.json'

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata.name, {
  icon: {
    src: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M15.49 9.63C15.31 6.84 14.18 4.12 12.06 2C9.92 4.14 8.74 6.86 8.51 9.63C9.79 10.31 10.97 11.19 12 12.26C13.03 11.2 14.21 10.32 15.49 9.63ZM8.93338 12.2407C8.95256 12.2537 8.97145 12.2668 8.99 12.28C8.97399 12.2686 8.95773 12.2574 8.94124 12.2464C8.93862 12.2445 8.936 12.2426 8.93338 12.2407ZM8.93338 12.2407C6.9769 10.8306 4.58605 10 2 10C2 15.32 5.36 19.82 10.03 21.49C10.66 21.72 11.32 21.89 12 22C12.68 21.88 13.33 21.71 13.97 21.49C18.64 19.82 22 15.32 22 10C17.82 10 14.15 12.17 12 15.45C11.1819 14.202 10.1438 13.1146 8.94124 12.2464C8.8898 12.2121 8.83626 12.1797 8.78196 12.1468L8.78195 12.1468L8.78195 12.1468C8.70146 12.098 8.61933 12.0482 8.54 11.99C8.60294 12.032 8.66764 12.0722 8.73189 12.1121C8.80047 12.1547 8.86853 12.197 8.93338 12.2407Z" fill="black"/>
      </svg>
    )
  },

	/**
	 * @see ./edit.js
	 */
	edit: Edit,

  /**
	 * @see ./save.js
	 */
  save: () => null
});
