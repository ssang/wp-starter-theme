import { __ } from '@wordpress/i18n'

import { useBlockProps } from '@wordpress/block-editor'

export default function Edit({ attributes, setAttributes }) {
  return (
    <div { ...useBlockProps() }>
      <h1 className="font-heading py-10 text-center text-5xl">
          Example Blocks
      </h1>
    </div>
  );
}
