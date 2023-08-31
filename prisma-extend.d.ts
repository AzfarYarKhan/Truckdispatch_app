import { UserInclude, Driver } from "@prisma/client";

type ExtendedUserInclude = UserInclude & {
  driver?: Driver;
};

declare module "@prisma/client" {
  export interface UserInclude extends ExtendedUserInclude {}
}
