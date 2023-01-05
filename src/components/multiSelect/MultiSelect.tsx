/* eslint-disable react/require-default-props */
import { Badge, Label } from 'components/elements';
import SearchDropdown from 'components/searchDropdown/SearchDropdown';
import { useMemo, useState } from 'react';

type Option = {
  label: string;
  value: unknown;
};

type MultiSelectProps<Opt> = {
  label?: string;
  options: Opt[];
  defaultValue?: Opt[];
  onChange?: (data: Opt[]) => void;
  onBlur?: (data: Opt[]) => void;
  id?: string;
  name?: string;
};

function MultiSelect<T extends Option>({
  label,
  options,
  defaultValue = [],
  onChange = () => {},
  onBlur = () => {},
  id,
  name,
}: MultiSelectProps<T>) {
  const [selectedValues, setSelectedValues] = useState<typeof options>(defaultValue);
  const optionsToSelect = useMemo(
    () =>
      options.filter((option) =>
        selectedValues.every(
          (selectedValue) =>
            selectedValue.label !== option.label && selectedValue.value !== option.value,
        ),
      ),
    [options, selectedValues],
  );

  function addSelectedValue(valueToAdd?: typeof options[number]) {
    if (typeof valueToAdd === 'undefined') return;
    if (selectedValues.includes(valueToAdd)) return;

    const result = [...selectedValues, valueToAdd];

    setSelectedValues(result);
    onChange(result);
    onBlur(result);
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
        id={id}
        name={name}
        isClearable
        options={optionsToSelect}
        defaultValue={defaultValue}
        onChange={(newValue) => addSelectedValue(newValue ?? undefined)}
      />
      <div className="mt-4 flex flex-wrap gap-2">
        {selectedValues.map((selectedValue) => (
          <Badge
            colour="indigo"
            iconRight="cross"
            onClick={() => removeSelectedValue(selectedValue)}
          >
            {selectedValue.label}
          </Badge>
        ))}
      </div>
    </div>
  );
}

export default MultiSelect;
