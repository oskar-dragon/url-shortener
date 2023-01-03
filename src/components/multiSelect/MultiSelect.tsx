/* eslint-disable react/require-default-props */
import { Badge, Label } from 'components/elements';
import SearchDropdown from 'components/searchDropdown/SearchDropdown';
import { useState } from 'react';

type Option = {
  label: string;
  value: unknown;
};

type MultiSelectProps<Opt> = {
  label?: string;
  options: Opt[];
  defaultValue?: Opt[];
  onSelect: (data: Opt[]) => void;
};

function MultiSelect<T extends Option>({
  label,
  options,
  defaultValue = [],
  onSelect,
}: MultiSelectProps<T>) {
  const [selectedValues, setSelectedValues] = useState<typeof options>(defaultValue);

  function addSelectedValue(valueToAdd?: typeof options[number]) {
    if (typeof valueToAdd === 'undefined') return;
    if (selectedValues.includes(valueToAdd)) return;

    const result = [...selectedValues, valueToAdd];

    setSelectedValues(result);
    onSelect(result);
  }

  function removeSelectedValue(valueToRemove: Option) {
    const result = selectedValues.filter(
      (selectedValue) => selectedValue.label !== valueToRemove.label,
    );
    setSelectedValues(result);
  }

  return (
    <div>
      {label && <Label>{label}</Label>}
      <SearchDropdown
        options={options}
        defaultValue={defaultValue}
        onChange={(newValue) => addSelectedValue(newValue ?? undefined)}
      />
      <div>
        {selectedValues.map((selectedValue) => (
          <Badge onClick={() => removeSelectedValue(selectedValue)}>{selectedValue.label}</Badge>
        ))}
      </div>
    </div>
  );
}

export default MultiSelect;
