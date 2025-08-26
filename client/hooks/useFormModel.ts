import { useState, useMemo } from 'react';

type FormState = Record<string, any>;

export function useFormModel<T extends FormState>(initialState: T) {
  const [form, setForm] = useState<T>(initialState);

  const updateField = (key: keyof T, value: T[keyof T]) => {
    setForm(prev => ({ ...prev, [key]: value }));
  };

  const model = useMemo(() => ({
    ...form,
    _updateField: updateField,
  }), [form]);

  const resetForm = () => setForm(initialState);

  return { model, form, setForm, resetForm };
}
