import { useState } from "react";

const useModal = () => {
  const [open, setOpen] = useState(false);
  function onClose() {
    setOpen(false);
  }
  function onOpen() {
    setOpen(true);
  }
  return {
    open,
    onClose,
    onOpen,
  };
};

export default useModal;
