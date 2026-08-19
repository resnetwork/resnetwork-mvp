declare module "react-simple-maps" {
  import { ComponentType, ReactNode } from "react";

  export const ComposableMap: ComponentType<any>;
  export const Geographies: ComponentType<{
    geography: string;
    children: (args: { geographies: any[] }) => ReactNode;
  }>;
  export const Geography: ComponentType<any>;
  export const Marker: ComponentType<any>;
  export const Line: ComponentType<any>;
}

declare module "topojson-client" {
  export function feature(topology: any, object: any): any;
}