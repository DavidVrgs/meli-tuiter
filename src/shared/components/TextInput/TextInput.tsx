import { TextField, type TextFieldProps } from "@mui/material";
import type { JSX } from "react";
import { Field } from "react-final-form";
import { useTranslation } from "../../contexts";

export type TextInputProps = TextFieldProps & {
  name: string;
};

export function TextInput({
  name,
  required,
  ...rest
}: TextInputProps): JSX.Element {
  const { t: translate } = useTranslation("form");

  const validation = (value: string) => {
    if (required && !value) return translate("required");
  };

  return (
    <Field
      name={name}
      validate={validation}
      render={({ input, meta }) => (
        <TextField
          {...rest}
          {...input}
          error={meta.touched && meta.error}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
}
