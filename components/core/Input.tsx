import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type?: HTMLInputTypeAttribute;
  error?: string;
  className?: string;
  wrapperClass?: string;
  isRequired?: boolean;
  onChange?: any;
  onBlur?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      name,
      label,
      type = "text",
      error,
      className,
      wrapperClass,
      isRequired = false,
      onChange,
      onBlur,
      ...rest
    },
    ref
  ) => (
    <div className={`relative ${wrapperClass || ""}`}>
      <input
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref}
        required={isRequired}
        {...rest}
        id={name}
        type={type}
        className={`peer rounded-md border-2 dark:border-slate-700 py-3 px-4 placeholder:opacity-0 focus-within:border-2  focus-within:placeholder:opacity-0 focus:outline-none dark:text-slate-300  w-full dark:bg-slate-800  ${
          error
            ? "border-red-400 focus-within:border-red-400 dark:border-red-500"
            : "focus-within:border-primary"
        } ${className || ""} `}
        placeholder="Harshad Birajdar"
      />
      <label
        htmlFor={name}
        className={`select-none absolute -top-2.5 left-3 z-[5] dark:text-slate-400  cursor-text bg-white dark:bg-slate-900 dark:peer-placeholder-shown:bg-slate-800 rounded-md text-sm transition-all duration-300 ease-in-out peer-placeholder-shown:top-3 peer-placeholder-shown:left-2.5 peer-placeholder-shown:text-base  peer-focus:-top-2.5 peer-focus:left-3 peer-focus:text-sm  px-1 ${
          error
            ? "text-red-500 dark:text-red-500"
            : "peer-placeholder-shown:text-gray-400 peer-focus:text-black dark:peer-focus:text-slate-400 dark:peer-focus:bg-slate-900"
        }`}
      >
        {label}
        {isRequired ? " *" : ""}
      </label>
      <span className="block text-xs ml-3 text-red-500">{error}</span>
    </div>
  )
);

Input.displayName = "Input";

export default Input;
