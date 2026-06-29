import type { Dispatch, FormEventHandler, SetStateAction } from "react";

export interface AsyncState {
  isLoading: boolean;
  isError: boolean;
}

export interface DataTableProps<T> extends AsyncState {
  data: T[];
  errorMessage: string;
}

export interface DataContainerProps<T> extends AsyncState {
  data: T[];
  error: unknown;
}

export interface FormFieldConfig<T> {
  label: string;
  key: keyof T;
  placeholder?: string;
  type?: string;
  step?: string;
  required?: boolean;
}

export interface ModalFormProps<T> {
  isOpen: boolean;
  onClose: () => void;
  formState: T;
  setFormState: Dispatch<SetStateAction<T>>;
  onSubmit: FormEventHandler<HTMLFormElement>;
  isPending: boolean;
  isError: boolean;
  errorMessage: string;
}
