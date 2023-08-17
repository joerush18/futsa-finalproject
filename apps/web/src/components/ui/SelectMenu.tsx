import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectProps,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface SelectMenuProps extends SelectProps {
  name: string;
  control: any;
  label: string;
  options: {
    label: string;
    value: string;
  }[];
}

export const SelectMenu: React.FC<SelectMenuProps> = ({
  name,
  control,
  label,
  options,
  ...props
}) => {
  const generateSingleOptions = () => {
    return options.map((option: any) => {
      return (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      );
    });
  };
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-multiple-name-label">{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => (
          <Select
            onChange={onChange}
            value={value}
            {...props}
            input={<OutlinedInput label={label} />}
          >
            {generateSingleOptions()}
          </Select>
        )}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
