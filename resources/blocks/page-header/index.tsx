import { registerBlockType } from '@wordpress/blocks';

import Edit from './PageHeader';
import metadata from './block.json';

registerBlockType(metadata.name, {
  icon: {
    src: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="black"
        height={24}
        width={24}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 7.5-9-5.25L3 7.5m18 0-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
        />
      </svg>
    )
  },

  edit: Edit,

  save: () => null
});
