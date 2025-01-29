import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CreateDeviceForm } from "./create-device/create-device-form";
import { useFetchDevices } from "@/api/hooks/devices/useFetchDevices";
import { Loader2 } from "lucide-react";
import { DeviceInfo } from "@/api/types/devices.types";
import { Badge } from "@/components/ui/badge";
import { Dispatch, SetStateAction } from "react";

export type DeviceProps = {
  device: DeviceInfo;
  setSelectedDevice: Dispatch<SetStateAction<string | null>>;
};
export const Device = ({ device, setSelectedDevice }: DeviceProps) => {
  return (
    <div
      className="border w-full rounded-md p-4 mb-2 hover:bg-slate-100 cursor-pointer"
      onClick={() => setSelectedDevice(() => device.uuid)}
    >
      <div className="text-lg">{device.name}</div>
      <div className="grid grid-cols-2 gap-1">
        <div className="flex flex-row gap-2 align-middle">
          <Badge>IPv4</Badge>
          <div>{device.ipv4}</div>
        </div>
        <div className="flex flex-row gap-2 align-middle">
          <Badge>MAC</Badge>
          <div>{device.mac}</div>
        </div>
        <div className="flex flex-row gap-2 align-middle">
          <Badge>Firmware Version</Badge>
          <div>{device.firmwareVersion}</div>
        </div>
      </div>
      <div className="mt-1 flex flex-row gap-2 align-middle">
        <Badge>Added at</Badge>
        <div>{new Date(device.createdAt).toLocaleString()}</div>
      </div>
      <div className="flex flex-row gap-2 align-middle mt-1">
        <Badge>UUID</Badge>
        <div>{device.uuid}</div>
      </div>
    </div>
  );
};

export const DevicesScrollable = ({
  setSelectedDevice,
}: {
  setSelectedDevice: Dispatch<SetStateAction<string | null>>;
}) => {
  const { data, isPending } = useFetchDevices();

  return (
    <ScrollArea className="h-[calc(100vh-56px-2*16px)] p-2 border relative rounded-lg">
      {isPending && <Loader2 />}
      {data &&
        data.map((device) => (
          <Device
            device={device}
            key={device.uuid}
            setSelectedDevice={setSelectedDevice}
          />
        ))}
      <CreateDeviceForm>
        <Button className="w-[calc(100%-2*8px)] absolute bottom-2">
          Add new device
        </Button>
      </CreateDeviceForm>
    </ScrollArea>
  );
};
