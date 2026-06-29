import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

type BaseProps = {
  label?: string;
  error?: string;
  containerClassName?: string;
};

type InputProps = BaseProps &
  InputHTMLAttributes<HTMLInputElement> & {
    as?: "input";
  };

type TextareaProps = BaseProps &
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as: "textarea";
  };

type Props = InputProps | TextareaProps;

const FormInput = ({
  label,
  error,
  containerClassName = "",
  className = "",
  as = "input",
  ...props
}: Props) => {
  const baseStyle = `w-full rounded-xl border p-3 outline-none ${
    error ? "border-red-500" : "border-gray-300"
  } ${className}`;

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="mb-1 block text-sm text-slate-600">
          {label}
        </label>
      )}

      {as === "textarea" ? (
        <textarea
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          className={`${baseStyle} min-h-25`}
        />
      ) : (
        <input
          {...(props as InputHTMLAttributes<HTMLInputElement>)}
          className={baseStyle}
        />
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;