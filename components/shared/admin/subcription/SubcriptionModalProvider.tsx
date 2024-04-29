"use client";

import Modal from "./SubcriptionModal";
import { useEffect, useState } from "react";

interface ModalProps {
  is_subscriptionValid: boolean;
}

function SubscriptionModal({ is_subscriptionValid }: ModalProps) {
  const [issubscribed, Setissubscribed] = useState(false);

  useEffect(() => {
    Setissubscribed(is_subscriptionValid);
  }, [is_subscriptionValid]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && (
      <div>
        <Modal is_subscriptionValid={issubscribed} />
      </div>
    )
  );
}

export default SubscriptionModal;
