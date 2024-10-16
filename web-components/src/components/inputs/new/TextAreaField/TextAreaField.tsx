import { forwardRef, ReactNode } from 'react';
import { InputAdornment, InputProps, SxProps } from '@mui/material';
import { Theme } from '@mui/material/styles';

import FieldFormControl, {
  DefaultStyleProps,
} from '../FieldFormControl/FieldFormControl';
import Input from '../Input/Input';

interface TextareaFieldProps extends InputProps, DefaultStyleProps {
  charLimit?: number;
  description?: string;
  label?: ReactNode;
  optional?: boolean | string;
  disabled?: boolean;
  children?: React.ReactNode;
  exampleText?: string;
  onExampleClick?: () => void;
  error?: boolean;
  helperText?: string;
  sx?: SxProps<Theme>;
}

export const TextAreaField = forwardRef<HTMLInputElement, TextareaFieldProps>(
  (
    {
      charLimit,
      className,
      description,
      endAdornment,
      label,
      optional,
      disabled = false,
      startAdornment,
      exampleText,
      onExampleClick,
      defaultStyle = true,
      children,
      sx,
      error,
      helperText,
      ...inputProps
    }: TextareaFieldProps,
    ref,
  ): JSX.Element => (
    <FieldFormControl
      label={label}
      description={description}
      exampleText={exampleText}
      onExampleClick={onExampleClick}
      disabled={disabled}
      optional={optional}
      className={className}
      defaultStyle={defaultStyle}
      error={error}
      helperText={helperText}
      sx={sx}
      required={inputProps.required}
    >
      <>
        <Input
          {...inputProps}
          disabled={disabled}
          startAdornment={
            startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : null
          }
          endAdornment={
            endAdornment ? (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ) : null
          }
          ref={ref}
        />
        {children}
      </>
    </FieldFormControl>
  ),
);
