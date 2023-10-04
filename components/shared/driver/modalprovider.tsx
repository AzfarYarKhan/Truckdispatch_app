"use client";

import Modal from "./modal";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

interface ModalProps {
  is_modalopen: boolean;
  currentUser: User | null;
}

function ModalProvider({ is_modalopen, currentUser }: ModalProps) {
  const [isMounted, SetIsMounted] = useState(false);
  useEffect(() => {
    SetIsMounted(is_modalopen);
  }, []);

  if (!is_modalopen) {
    return null;
  }

  return (
    <>
      <Modal
        is_modalopen={isMounted}
        onChange={() => {}}
        currentUser={currentUser}
      />
    </>
  );
}

export default ModalProvider;
