import React, { useId, ChangeEvent } from 'react';
import { Label } from '../atoms/Label';
import { Input } from '../atoms/Input';
import { Text } from '../atoms/Text';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';

interface TextFieldProps {
  disabled?: boolean;
  id?: string;
  name?: string;
  label?: string;
  label2?: string;
  label3?: string;
  max?: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number;
  model?: Record<string, any>;
  onChange?: (value: string) => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  disabled,
  id,
  name = '',
  label,
  label2 = '',
  label3 = '',
  max = '',
  placeholder,
  type = 'text',
  value = '',
  model,
  onChange = () => {},
}) => {
  const generatedId = useId();
  const myId = id || generatedId;
  
  const theValue = isString(name) && !isEmpty(name.trim()) && isObject(model) && has(model, name) && !isEmpty(model[name])
    ? model[name]
    : value;
    
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const nv = e.target.value;
    if(!isEmpty(model)) model._updateField(name, nv);
    onChange(nv);
  };

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <Label id={myId}>{label || 'Label'}</Label>
        {label3 && (
          <Text className="text-sm text-gray-500 dark:text-gray-900">
            {label3}
          </Text>
        )}
      </div>

      <Input
        type={type}
        id={myId}
        value={theValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleChange}
        max={max}
      />

      {label2 && (
        <Text className="mt-2 text-sm text-gray-500 dark:text-gray-900">
          {label2}
        </Text>
      )}
    </div>
  );
};
