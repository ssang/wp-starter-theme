import {
  __experimentalToolsPanelItem as ToolsPanelItem,
  __experimentalToggleGroupControl as ToggleGroupControl,
  __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';

function ImageSizingSettings({ attributes, setAttributes }) {
  const { image } = attributes;

  const updateImageSize = (value) => {
    setAttributes({
      image: {
        ...image,
        imageSize: value
      }
    });
  };

  return (
    <ToolsPanelItem
      hasValue={() => !!image.url}
      label="Image Sizing"
      panelId="ImageSettings"
      onSelect={() => {
        updateImageSize('cover');
      }}
    >
      <ToggleGroupControl
        size={'__unstable-large'}
        label={'Size'}
        value={image.imageSize}
        onChange={(value) => {
          updateImageSize(value);
        }}
      >
        <ToggleGroupControlOption
          key={'cover'}
          value={'cover'}
          label={'Cover'}
        />
        <ToggleGroupControlOption
          key={'contain'}
          value={'contain'}
          label={'Contain'}
        />
        <ToggleGroupControlOption key={'fit'} value={'fit'} label={'Fit'} />
      </ToggleGroupControl>
    </ToolsPanelItem>
  );
}

export default ImageSizingSettings;
