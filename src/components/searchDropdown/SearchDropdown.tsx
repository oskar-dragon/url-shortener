import Select, { components } from 'react-select';
import CreatableSelect from 'react-select/creatable';
import type { GroupBase, Props } from 'react-select';
import { cx } from 'class-variance-authority';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// FIXME: "any" type below when I have some time
function Control({ children, ...props }: any) {
  return (
    <components.Control {...props} className="flex gap-2">
      <MagnifyingGlassIcon className="h-5 text-neutral-500" />
      {children}
    </components.Control>
  );
}

function SearchDropdown<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ isClearable, ...restProps }: Props<Option, IsMulti, Group>) {
  return isClearable ? (
    <CreatableSelect
      {...restProps}
      components={{ Control }}
      unstyled
      classNames={{
        container: ({ isFocused }) =>
          cx(
            'border rounded-lg border-neutral-300 bg-neutral-100 text-md py-0.5',
            isFocused ? 'custom-focus' : '',
          ),
        control: () => 'pl-2.5 pr-2 placeholder:text-neutral-500',
        placeholder: () => 'text-neutral-500',
        valueContainer: ({ isDisabled }) =>
          cx(isDisabled ? 'text-neutral-500 cursor-not-allowed' : 'text-black'),
        indicatorsContainer: () => cx('w-0'),
        dropdownIndicator: () => cx('text-transparent'),
        menu: () => 'mt-2 rounded-lg border border-neutral-100 shadow-xl',
        option: ({ isSelected }) =>
          cx('py-2.5 px-3 custom-transition', isSelected ? 'bg-neutral-50' : 'hover:bg-neutral-50'),
        noOptionsMessage: () => cx('py-2.5 px-3'),
      }}
    />
  ) : (
    <Select
      {...restProps}
      components={{ Control }}
      unstyled
      classNames={{
        container: ({ isFocused }) =>
          cx(
            'border rounded-lg border-neutral-300 bg-neutral-100 text-md py-0.5',
            isFocused ? 'custom-focus' : '',
          ),
        control: () => 'pl-2.5 pr-2 placeholder:text-neutral-500',
        placeholder: () => 'text-neutral-500',
        valueContainer: ({ isDisabled }) =>
          cx(isDisabled ? 'text-neutral-500 cursor-not-allowed' : 'text-black'),
        indicatorsContainer: () => cx('w-0'),
        dropdownIndicator: () => cx('text-transparent'),
        menu: () => 'mt-2 rounded-lg border border-neutral-100 shadow-xl',
        option: ({ isSelected }) =>
          cx('py-2.5 px-3 custom-transition', isSelected ? 'bg-neutral-50' : 'hover:bg-neutral-50'),
        noOptionsMessage: () => cx('py-2.5 px-3'),
      }}
    />
  );
}

export default SearchDropdown;
