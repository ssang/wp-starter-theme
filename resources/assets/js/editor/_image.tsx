import { createHigherOrderComponent } from '@wordpress/compose';
import { addFilter } from '@wordpress/hooks';

import ImageSettingsPanel from './image';

addFilter(
  'editor.BlockEdit',
  'crew/add-image-controls',
  createHigherOrderComponent((BlockEdit) => {
    return (props) => {
      return (
        <>
          <BlockEdit key="edit" {...props} />
          <ImageSettingsPanel {...props} />
        </>
      );
    };
  }, 'ImageControls'),
  10
);
