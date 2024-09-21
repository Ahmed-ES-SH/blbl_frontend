import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export interface navlinkstype {
  title: string;
  imgsrc: string;
  to: string;
}

export interface pagenationtableprops {
  headers: string[];
  api: string;
  apidelete: string;
  keys: string[];
}

export interface mapeletype {
  [key: string]: any;
}
export interface dropprofiletype {
  title: string;
  icon: any;
  to?: string;
}

export interface allstring {
  [key: string]: string;
}
