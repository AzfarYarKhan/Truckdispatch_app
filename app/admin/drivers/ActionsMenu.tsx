"use client";

import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

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

  return <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>;
};

export default ActionsMenu;
