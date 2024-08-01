export type PostRelationshipProps = {
  label?: string;
  postId: string;
  postType: string;
  metaKey: string;
  relatedPostType: string;
  onItemsUpdated?: (itemIds: number[]) => void;
};
