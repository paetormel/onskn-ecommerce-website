import { useState } from "react";

export function useDisclosure(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((previous) => !previous);

  return {
    isOpen,
    setIsOpen,
    open,
    close,
    toggle,
  };
}
