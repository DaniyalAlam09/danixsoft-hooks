import { useState, useCallback, ChangeEvent, FocusEvent } from 'react';

export interface UseFormOptions<TValues> {
  initialValues: TValues;
  validate?: (values: TValues) => Partial<Record<keyof TValues, string>>;
  onSubmit?: (values: TValues) => void | Promise<void>;
}

export function useForm<TValues extends Record<string, any>>({
  initialValues,
  validate,
  onSubmit,
}: UseFormOptions<TValues>) {
  const [values, setValues] = useState<TValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof TValues, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof TValues, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
      
      setValues((prev) => ({ ...prev, [name]: val }));
    },
    []
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      
      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
      }
    },
    [validate, values]
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);

      if (validate) {
        const validationErrors = validate(values);
        setErrors(validationErrors);
        
        if (Object.keys(validationErrors).length > 0) {
          setIsSubmitting(false);
          // Touch all fields to show errors
          const allTouched = Object.keys(values).reduce((acc, key) => {
            acc[key as keyof TValues] = true;
            return acc;
          }, {} as Partial<Record<keyof TValues, boolean>>);
          setTouched(allTouched);
          return;
        }
      }

      if (onSubmit) {
        await onSubmit(values);
      }
      setIsSubmitting(false);
    },
    [validate, values, onSubmit]
  );

  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
  };
}
