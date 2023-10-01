"use client";

import Modal from "./modal";
import { useEffect, useState } from "react";

interface ModalProps {
  is_modalopen: boolean;
}

function ModalProvider({ is_modalopen }: ModalProps) {
  const [isMounted, SetIsMounted] = useState(false);
  useEffect(() => {
    SetIsMounted(is_modalopen);
  }, []);

  if (!is_modalopen) {
    return null;
  }

  return (
    <>
      <Modal is_modalopen={isMounted} onChange={() => {}} />
    </>
  );
}

export default ModalProvider;
