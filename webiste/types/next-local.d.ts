declare module "next/image" {
  import type { ComponentType, ImgHTMLAttributes } from "react";

  type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
    src: string;
    alt: string;
    fill?: boolean;
    priority?: boolean;
  };

  const Image: ComponentType<ImageProps>;
  export default Image;
}

declare module "next/types.js" {
  export type ResolvingMetadata = unknown;
  export type ResolvingViewport = unknown;
}

declare module "next/dist/lib/metadata/types/metadata-interface.js" {
  export type Metadata = Record<string, unknown>;
  export type ResolvingMetadata = unknown;
  export type ResolvingViewport = unknown;
}

declare module "next/dist/build/segment-config/app/app-segment-config.js" {
  export type AppSegmentConfig = Record<string, unknown>;
  export type InstantConfigForTypeCheckInternal = Record<string, unknown>;
}

type LayoutProps<Route extends string = string> = {
  children: React.ReactNode;
  params?: Promise<Record<string, string | string[]>>;
  route?: Route;
};

declare module "*.css";
