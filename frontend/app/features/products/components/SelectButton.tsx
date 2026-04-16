interface SelectButtonProps {
    className: string;
    ariaLabel?: string;
    label?: string;
  }
  
  function SelectButton({ className, ariaLabel, label }: SelectButtonProps) {
    return (
      <button type="button" aria-label={ariaLabel} className={className}>
        {label}
      </button>
    );
  }

  export default SelectButton;