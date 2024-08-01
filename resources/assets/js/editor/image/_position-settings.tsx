import {
  FocalPointPicker,
  __experimentalToolsPanelItem as ToolsPanelItem
} from '@wordpress/components';

const imagePositionToCoords = (value) => {
  if (!value) {
    return { x: 0.5, y: 0.5 };
  }

  let [x, y] = value.split(' ').map((v) => parseFloat(v) / 100);
  x = isNaN(x) ? undefined : x;
  y = isNaN(y) ? x : y;

  return { x, y };
};

function ImagePositionSettings({ attributes, setAttributes }) {
  const { image } = attributes;

  return (
    <ToolsPanelItem
      hasValue={() => !!image.url}
      label="Image Positioning"
      panelId="ImageSettings"
      onSelect={() => {
        setAttributes({
          image: {
            ...image,
            imageSize: 'cover',
            imagePosition: `50% 50%`
          }
        });
      }}
    >
      <FocalPointPicker
        __next40pxDefaultSize
        label={'Position'}
        url={image.url}
        value={imagePositionToCoords(image.imagePosition)}
        onChange={(value) => {
          setAttributes({
            image: {
              ...image,
              imagePosition: `${value.x * 100}% ${value.y * 100}%`
            }
          });
        }}
      />
    </ToolsPanelItem>
  );
}

export default ImagePositionSettings;
