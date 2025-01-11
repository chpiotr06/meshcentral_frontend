import { routing } from "@/lib/routing";
import { ListItem } from "@/components/features/top-bar/nav-item";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export const AdminNav = () => {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className="border">Admin</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
          <ListItem
            key="add-org"
            title="Add organization"
            href={routing.dashboard.addOrganization}
          >
            Add organization to system
          </ListItem>
          <ListItem
            key="add-user"
            title="Add User"
            href={routing.dashboard.addUser}
          >
            Add User to system
          </ListItem>
          <ListItem
            key="add-assign"
            title="Assign users"
            href={routing.dashboard.assignUser}
          >
            Assign users to organization
          </ListItem>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
};
