"use client";

import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/app/actions/user.actions";
import { useRouter } from "next/navigation";
import Loadingspinner from "@/app/driver/loading";
import { User } from "@prisma/client";
import { useEffect } from "react";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ChangeEvent } from "react";

interface ModalProps {
  is_modalopen: boolean;
  onChange: (open: boolean) => void;
  currentUser: User | null;
}
const formSchema = z.object({
  image: z.string().url().nonempty(),
  company: z.string().min(3).max(30),
  address: z.string().min(10).max(30),
  phone: z.string().min(5).max(20),
});

const Modal: React.FC<ModalProps> = ({
  is_modalopen,
  onChange,
  currentUser,
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const { startUpload } = useUploadThing("media");
  const router = useRouter();
  const [PreviewUrl, setPreviewUrl] = useState<string>("");
  useEffect(() => {
    setPreviewUrl(
      currentUser?.image
        ? currentUser.image
        : "/assets/driver/default_profile_image.png"
    );
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: currentUser?.image ? currentUser.image : "",
      company: "",
      address: "",
      phone: "",
    },
  });
  const handleImage = (
    e: ChangeEvent<HTMLInputElement>,
    fieldChange: (value: string) => void
  ) => {
    e.preventDefault();

    const fileReader = new FileReader();

    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setFiles(Array.from(e.target.files));

      if (!file.type.includes("image")) return;

      fileReader.onload = async (event) => {
        const imageDataUrl = event.target?.result?.toString() || "";
        fieldChange(imageDataUrl);
      };

      fileReader.readAsDataURL(file);

      const objectURL = URL.createObjectURL(file);
      setPreviewUrl(objectURL);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const blob = values.image;
      const hasImageChanged = isBase64Image(blob);
      if (!hasImageChanged && values.image !== "") {
        form.clearErrors("image");
      }
      if (hasImageChanged) {
        const imgres = await startUpload(files);
        if (imgres && imgres[0].url) {
          values.image = imgres[0].url;
        }
      }
      await updateUser(values);
      router.refresh();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  if (!is_modalopen) {
    return null;
  }

  return (
    <>
      {loading ? (
        <Loadingspinner />
      ) : (
        <Dialog
          open={is_modalopen}
          defaultOpen={is_modalopen}
          onOpenChange={onChange}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Onboarding</DialogTitle>
              <DialogDescription>
                Complete the onboarding flow now, click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="image"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-4">
                      <FormLabel
                        htmlFor="image"
                        className="onboarding-form_image-label"
                      >
                        <Image
                          src={
                            PreviewUrl
                              ? PreviewUrl
                              : "/assets/driver/default_profile_image.png"
                          }
                          alt="image_icon"
                          width={100}
                          height={100}
                          className=" rounded-full  w-full h-full object-cover"
                        />
                      </FormLabel>

                      <FormControl className="flex-1 text-base-semibold text-grey-200">
                        <Input
                          id="image"
                          type="file"
                          accept="image/*"
                          placeholder="Upload a photo"
                          className="onboarding-form_image-input"
                          onChange={(e) => handleImage(e, field.onChange)}
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="company">Company</FormLabel>
                      <FormControl>
                        <Input
                          className="onboarding-form_input"
                          id="company"
                          {...field}
                          placeholder="Company"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="address">Address</FormLabel>
                      <FormControl>
                        <Input
                          className="onboarding-form_input"
                          id="address"
                          {...field}
                          placeholder="Address"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="phone">Phone No</FormLabel>
                      <FormControl>
                        <Input
                          className="onboarding-form_input"
                          id="phone"
                          {...field}
                          placeholder="Phone Number"
                        />
                      </FormControl>
                      <FormDescription />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
export default Modal;
