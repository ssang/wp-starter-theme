import {
  CheckboxControl,
  __experimentalScrollable as Scrollable,
  TextControl,
  __experimentalVStack as VStack
} from '@wordpress/components';
import { useEntityProp, useEntityRecords } from '@wordpress/core-data';
import { useMemo, useState } from '@wordpress/element';
import { decodeEntities } from '@wordpress/html-entities';
import { PostRelationshipProps } from './types';

export function sortBySelected(allItems, selectedItems) {
  const _allItems = [...allItems];

  _allItems.sort((itemA, itemB) => {
    const itemASelected = selectedItems.indexOf(itemA.id) !== -1;
    const itemBSelected = selectedItems.indexOf(itemB.id) !== -1;

    if (itemASelected && !itemBSelected) {
      return -1;
    }
    if (!itemASelected && itemBSelected) {
      return 1;
    }
    return 0;
  });

  return _allItems;
}

const BasicPostRelationship: React.FC<PostRelationshipProps> = ({
  label = 'Select Post',
  postId,
  postType,
  metaKey,
  relatedPostType = 'post',
  onItemsUpdated = () => {}
}) => {
  const [filterValue, setFilterValue] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  const { hasResolved, records } = useEntityRecords(
    'postType',
    relatedPostType,
    {
      posts_per_page: -1
    }
  );

  const [meta, updateMeta] = useEntityProp(
    'postType',
    postType,
    'meta',
    postId
  );

  const { [metaKey]: items } = meta;

  const availableItems = useMemo(() => {
    return hasResolved ? sortBySelected(records, items ?? []) : [];
  }, [hasResolved, items]);

  const renderItems = (renderedItems) => {
    return renderedItems.map((item) => {
      return (
        <div key={item.id}>
          <CheckboxControl
            __nextHasNoMarginBottom
            checked={items.indexOf(item.id) !== -1}
            onChange={() => {
              const itemId = parseInt(item.id, 10);
              const hasItem = items.includes(itemId);

              const _items = hasItem
                ? items.filter((id) => id !== itemId)
                : [...items, itemId];

              updateMeta({ [metaKey]: _items });

              onItemsUpdated(_items);
            }}
            label={decodeEntities(item.title.rendered)}
          />
        </div>
      );
    });
  };

  const setFilter = (value) => {
    setFilterValue(value);
    setFilteredItems(
      availableItems.filter((item) =>
        item.title.rendered.toLowerCase().startsWith(value)
      )
    );
  };

  return (
    <VStack spacing={4}>
      {hasResolved && items && (
        <>
          <TextControl
            __nextHasNoMarginBottom
            label={label}
            value={filterValue}
            onChange={setFilter}
          />
          <Scrollable style={{ maxHeight: 100 }}>
            <VStack spacing={1}>
              {renderItems(filterValue !== '' ? filteredItems : availableItems)}
            </VStack>
          </Scrollable>
        </>
      )}
    </VStack>
  );
};

export default BasicPostRelationship;
