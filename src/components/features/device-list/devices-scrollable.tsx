import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateDeviceForm } from "./create-device/create-device-form";

export const DevicesScrollable = () => {
  return (
    <ScrollArea className="h-[calc(100vh-56px-2*16px)] px-2 border relative rounded-lg">
      <CreateDeviceForm>
        <Button className="w-[calc(100%-2*8px)] absolute bottom-2">
          Add new device
        </Button>
      </CreateDeviceForm>
    </ScrollArea>
  );
};
