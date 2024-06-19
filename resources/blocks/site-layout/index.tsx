import { registerBlockType } from '@wordpress/blocks'
import { InnerBlocks } from '@wordpress/block-editor'

import Edit from './SiteLayout'
import metadata from './block.json'

registerBlockType(metadata.name, {
  icon: {
    src: () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1 5H3V3C1.9 3 1 3.9 1 5ZM3 9H1V7H3V9ZM3 13H1V11H3V13ZM11 21H9V19H11V21ZM1 17H3V15H1V17ZM3 19V21C1.9 21 1 20.1 1 19H3ZM21 17H23V15H21V17ZM11 5H9V3H11V5ZM5 21H7V19H5V21ZM7 5H5V3H7V5ZM21 21C22.1 21 23 20.1 23 19H21V21ZM23 13H21V11H23V13ZM13 21H15V19H13V21ZM19 21H17V19H19V21ZM21 9H23V7H21V9ZM19 5H17V3H19V5ZM13 5H15V3H13V5ZM21 5H23C23 3.9 22.1 3 21 3V5Z" fill="black"/>
      </svg>
    )
  },

	edit: Edit,

  save: props => <InnerBlocks.Content />
})
