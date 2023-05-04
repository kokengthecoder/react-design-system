import React from "react";

export type ToastType = "success" | "warning" | "error" | "info";

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The type of Toast. Control the display */
    type: ToastType;
    /** The content of the Toast. If a `title` is provided, this will act as a description label  */
    label: string;
    /** The title of the Toast  */
    title?: string | undefined;
    /** If specified, the Toast will be automatically dismissed after 4 seconds */
    autoDismiss?: boolean | undefined;
}