import { InspectorControls, MediaUpload } from '@wordpress/block-editor';
import { getBlockSupport } from '@wordpress/blocks';
import {
  BaseControl,
  Button,
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
  __experimentalVStack as VStack
} from '@wordpress/components';

import ImagePositionSettings from './_position-settings';
import ImageSelectionPreviewSelection from './_preview';
import ImageSizingSettings from './_sizing-settings';

function ImageSettingsPanel(props) {
  if (!getBlockSupport(props.name, ['image'])) {
    return null;
  }

  const { attributes, setAttributes } = props;

  if (
    getBlockSupport(props.name, ['image', 'dependsOn'])?.every((test) => {
      return (attributes[test[0]] ?? true) === (test[1] ?? true);
    }) === false
  ) {
    return null;
  }

  const { image } = attributes;

  const resetAll = () => {
    const _image = {
      url: null,
      id: null
    };

    if ('imageSize' in image) {
      _image['imageSize'] = 'cover';
      _image['imagePosition'] = '50% 50%';
    }

    if (getBlockSupport(props.name, ['image', 'mobile'])) {
      _image['mobile'] = {
        url: null,
        id: null
      };
    }

    setAttributes({
      image: _image
    });
  };

  return (
    <InspectorControls>
      <VStack
        as={ToolsPanel}
        spacing={4}
        label="Image Settings"
        panelId="ImageSettings"
        resetAll={resetAll}
      >
        <ImageSelectionPreviewSelection
          image={image}
          onChange={(media) => {
            const _image = {
              ...image,
              id: media.id,
              url: media.url
            };

            if (getBlockSupport(props.name, ['image', 'imageSize'])) {
              _image['imageSize'] = 'cover';
              _image['imagePosition'] = '50% 50%';
            }

            setAttributes({
              image: _image
            });
          }}
          panelId="ImageSettings"
          resetAll={resetAll}
        />
        {getBlockSupport(props.name, ['image', 'imagePosition']) && (
          <ImagePositionSettings {...props} />
        )}
        {getBlockSupport(props.name, ['image', 'imageSize']) && (
          <ImageSizingSettings {...props} />
        )}
        {getBlockSupport(props.name, ['image', 'mobile']) && (
          <ToolsPanelItem
            hasValue={() => !!image.mobile?.url}
            label="Mobile Image"
            panelId="ImageSettings"
            isShownByDefault={false}
          >
            <BaseControl label="Mobile Image">
              <MediaUpload
                onSelect={(media) => {
                  const _image = { ...image };

                  _image['mobile'] = {
                    url: media.url,
                    id: media.id
                  };

                  setAttributes({
                    image: _image
                  });
                }}
                allowedTypes={['image']}
                value={image.mobile?.id}
                render={({ open }) => (
                  <VStack>
                    {!!image.mobile?.url && (
                      <img className="block" src={image.mobile?.url} />
                    )}
                    <div className="flex gap-2">
                      <Button variant="primary" onClick={open}>
                        {!!image.mobile?.url ? 'Replace Image' : 'Set Image'}
                      </Button>
                      {!!image.mobile?.url && (
                        <Button
                          variant="secondary"
                          onClick={() => {
                            const _image = { ...image };

                            _image['mobile'] = {
                              url: null,
                              id: null
                            };

                            setAttributes({
                              image: _image
                            });
                          }}
                        >
                          Reset Image
                        </Button>
                      )}
                    </div>
                  </VStack>
                )}
              />
            </BaseControl>
          </ToolsPanelItem>
        )}
      </VStack>
    </InspectorControls>
  );
}

export default ImageSettingsPanel;
