import { registerBlockType } from "@wordpress/blocks";
import { InnerBlocks } from "@wordpress/block-editor";

import Edit from "./ExampleBlock";
import metadata from "./block.json";

registerBlockType(metadata.name, {
  icon: {
    src: () => (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="18"
        viewBox="0 0 28 18"
        fill="none"
      >
        <rect width="28" height="18" rx="9" fill="#DF4661" />
        <rect
          x="4"
          y="3.5"
          width="11"
          height="11"
          rx="5.5"
          fill="#DF4661"
        />
      </svg>
    ),
  },

  edit: Edit,

  save: (props) => <InnerBlocks.Content />,
});
