"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useProModal } from "@/hooks/use-pro-modal";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAction } from "@/hooks/use-actions";
import { stripeRedirect } from "@/app/actions/stripe-redirect";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ModalProps {
  is_subscriptionValid: boolean;
}

const Modal: React.FC<ModalProps> = ({ is_subscriptionValid }) => {
  const router = useRouter();
  const [issubscribed, Setissubscribed] = useState(false);
  const { execute, isLoading } = useAction(stripeRedirect, {
    onSuccess: (data) => {
      window.location.href = data;
    },
    onError: (error) => {
      toast.error(error);
    },
  });
  const onClick = () => {
    execute({});
  };
  const proModal = useProModal();
  if (!proModal.isOpen) {
    router.push("/admin/dashboard");
    proModal.onOpen();
  }
  useEffect(() => {
    Setissubscribed(is_subscriptionValid);
  }, [is_subscriptionValid]);

  return (
    <div>
      {!issubscribed ? (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-4">Upgrade to Pro Plan</DialogTitle>
              <div className="aspect-video relative flex items-center justify-center">
                <Image
                  src="/pro-modal.svg"
                  alt="pro"
                  className="object-cover"
                  fill
                />
              </div>
              <div className="space-y-6 p-2">
                <DialogDescription className=" w-full">
                  Free plan only allows 10 registered drivers but with Pro plan
                  you can have unlimited drivers
                </DialogDescription>
              </div>
              <Button disabled={isLoading} onClick={onClick} type="submit">
                Upgrade
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      ) : (
        <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="mb-4">Cancel Subscription</DialogTitle>

              <div className="aspect-video relative flex items-center justify-center mb-4">
                <Image
                  src="/pro-modal.svg"
                  alt="pro"
                  className="object-cover"
                  fill
                />
              </div>
              <div className=" space-y-6 ">
                <DialogDescription className="text-white w-full">
                  The free plan only offers 10 drivers to be registered but with
                  Pro Plan you can have unlimited drivers
                </DialogDescription>
              </div>
              <Button disabled={isLoading} onClick={onClick} type="submit">
                Cancel Subscription
              </Button>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};
export default Modal;
