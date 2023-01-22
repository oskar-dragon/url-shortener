/* eslint-disable react/require-default-props */
import { EmptyState } from 'components';
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useAddLinkModalStore } from 'features/links/stores';

type LinksTableEmptyStateProps = {
  className?: string;
};

function LinksTableEmptyState({ className }: LinksTableEmptyStateProps) {
  const openModal = useAddLinkModalStore((state) => state.open);

  return (
    <EmptyState className={className}>
      <EmptyState.Icon icon={<MagnifyingGlassIcon className="w-7" />} />
      <EmptyState.Title>No links found</EmptyState.Title>
      <EmptyState.Body>
        You haven&apos;t created any links yet. Click the button below to create your first link.
      </EmptyState.Body>
      <EmptyState.ButtonGroup>
        <EmptyState.PrimaryAction leftIcon={<PlusIcon />} onClick={openModal}>
          Add link
        </EmptyState.PrimaryAction>
      </EmptyState.ButtonGroup>
    </EmptyState>
  );
}

export default LinksTableEmptyState;
