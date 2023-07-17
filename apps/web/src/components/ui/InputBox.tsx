import { Controller } from "react-hook-form";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { HTMLInputTypeAttribute } from "react";
import Color from "@/utils/color";

interface FormInputProps {
  name: string;
  control: any;
  label: string;
  placeholder?: string;
  type?: HTMLInputTypeAttribute;
  props?: TextFieldProps;
}

export const FormInputText = ({
  name,
  control,
  label,
  type,
  props,
}: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
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
            fontSize: "10px",
            color: Color.text.main,
          }}
          required
          {...props}
        />
      )}
    />
  );
};
