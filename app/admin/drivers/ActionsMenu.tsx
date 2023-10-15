"use client";

import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
interface ActionsMenuProps {
  email: string;
}

const ActionsMenu: React.FC<ActionsMenuProps> = ({ email }) => {
  const router = useRouter();

  const handleDelete = () => {
    axios
      .delete(`/api/driver/${email}`)
      .then((response) => {
        console.log(response.data.message);
        if (response.data.message === "User deleted successfully") {
          toast.success("Deleted successfully");
          router.refresh();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="flex text-sm p-2 cursor-pointer ">Delete</div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              account and remove its data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ActionsMenu;
