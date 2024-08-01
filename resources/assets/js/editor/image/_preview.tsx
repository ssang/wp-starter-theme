import { MediaUpload } from '@wordpress/block-editor';
import {
  Button,
  __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

function ImageSelectionPreviewSelection({
  image,
  panelId,
  onChange,
  resetAll
}) {
  return (
    <ToolsPanelItem
      hasValue={() => !!image.url}
      label="Image Selection"
      panelId={panelId}
      isShownByDefault={true}
    >
      <MediaUpload
        onSelect={onChange}
        allowedTypes={['image']}
        value={image.id}
        render={({ open }) => (
          <div className="flex gap-2">
            <Button variant="primary" onClick={open}>
              {!!image.url ? 'Replace Image' : 'Set Image'}
            </Button>
            {!!image.url && (
              <Button variant="secondary" onClick={resetAll}>
                Reset Image
              </Button>
            )}
          </div>
        )}
      />
    </ToolsPanelItem>
  );
}

export default ImageSelectionPreviewSelection;
