import { Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { HTMLInputTypeAttribute } from "react";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
}

export const FormInputText = ({
  name,
  control,
  label,
  type,
  ...props
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={type ?? "text"}
          autoComplete="off"
          sx={{
            mb: 2,
          }}
          required
          {...props}
        />
      )}
    />
  );
};