import { routing } from "@/lib/routing";
import { ListItem } from "@/components/features/top-bar/nav-item";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const DeviceNav = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="border">Devices</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          <ListItem
            key="full-map"
            title="Dashboard"
            href={routing.dashboard.root}
          >
            Map of all registered devices
          </ListItem>
          <ListItem
            key="device-list"
            title="Device List"
            href={routing.devices.root}
          >
            Device list with route map
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
