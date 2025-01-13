import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ReactNode, useState } from "react";
import { useCreateDeviceFormSchema } from "./create-device-form-schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAddDeviceMutation } from "@/api/hooks/devices/useAddDeviceMutation";
import { Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Textarea } from "@/components/ui/textarea";

export const CreateDeviceForm = ({ children }: { children: ReactNode }) => {
  const schema = useCreateDeviceFormSchema();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      firmwareVersion: "",
      ipv4: "",
      mac: "",
      name: "",
    },
  });

  const { mutate, isPending, isSuccess } = useAddDeviceMutation(() => {
    setOpen(false);
    form.reset();
  });

  const onSubmit = (values: z.infer<typeof schema>) => {
    mutate(values);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new device</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Device name</FormLabel>
                    <FormControl>
                      <Input placeholder="Truck-17" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is device public name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ipv4"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>IPv4 Address</FormLabel>
                    <FormControl>
                      <Input placeholder="192.168.1.1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mac"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>MAC Address</FormLabel>
                    <FormControl>
                      <Input placeholder="00:B0:D0:63:C2:26" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="firmwareVersion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Firmware version</FormLabel>
                    <FormControl>
                      <Input placeholder="1.2.3" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is SemVer compliant version.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full"
                disabled={isPending || isSuccess}
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {isSuccess && (
        <AlertDialog defaultOpen>
          <AlertDialogTrigger className="hidden"></AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                You have added new device. Please save token below.
              </AlertDialogTitle>
              <AlertDialogDescription>
                Token below is used to authorize your device in out API. Be sure
                to save is somewhere else and keep it safe. You will not be able
                to access this code again.
              </AlertDialogDescription>
              <Textarea
                value="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhMjU1YzRlNC1hOGVmLTQxOGYtYmI0My1iYTFmOTZlZTY1MGUiLCJpYXQiOjE3MzY3ODM3OTEsImV4cCI6MTc2ODMxOTc5MX0.hz02d1QjMRZV_t3_SsoPOKLqjupL_KUgHCeAVgo9JqE"
                className="break-all h-32 resize-none"
                readOnly
              ></Textarea>
              {/* {data.token} */}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogAction className="w-full">
                I saved this token. Close this window.
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  );
};
