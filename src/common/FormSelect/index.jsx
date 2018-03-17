import React from 'react';
import { Field } from 'react-form';

import Select from '../Select';

const FormSelect = props => {
  const { onChange, onBlur, field, ...rest } = props;

  return (
    <Field field={field}>
      {fieldApi => {
        const { value, setValue, setTouched } = fieldApi;

        return (
          <Select
            {...rest}
            value={value || ''}
            onChange={e => {
              setValue(e.target.value);
              if (onChange) {
                onChange(e.target.value, e);
              }
            }}
            onBlur={e => {
              setTouched();
              if (onBlur) {
                onBlur(e);
              }
            }}
          />
        );
      }}
    </Field>
  );
};

export default FormSelect;
