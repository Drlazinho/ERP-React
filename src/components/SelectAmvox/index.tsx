import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import InputAmvox from '../InputAmvox';

interface SelectAmvoxProps<T>
  extends Omit<
    AutocompleteProps<T, false, false, false>,
    'renderInput' | 'options'
  > {
  options: T[];
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
}
function SelectAmvox<T>({
  options,
  label = 'Selecione uma opção',
  placeholder,
  error,
  helperText,

  ...props
}: SelectAmvoxProps<T>) {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => (
        <InputAmvox
          {...params}
          label={label}
          placeholder={placeholder}
          error={error}
          helperText={helperText}
        />
      )}
      {...props}
    />
  );
}

export default SelectAmvox;
