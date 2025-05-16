import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price,
  );

export const formatPercent = (
  percent: number,
  signDisplay: "auto" | "never" | "always" | "exceptZero" = "auto",
) =>
  new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
    signDisplay,
  }).format(percent);

export const formatNumber = (
  value: number | bigint,
  options?: Intl.NumberFormatOptions,
) => new Intl.NumberFormat("en-US", options).format(value);

export const fileToBase64 = (file: File) =>
  new Promise<string>((resolve) => {
    const fileReader = new FileReader();
    fileReader.addEventListener(
      "load",
      () => resolve(fileReader.result as string),
      false,
    );
    fileReader.readAsDataURL(file);
  });
