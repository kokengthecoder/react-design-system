import React from "react";

export type NotificationToast =
    | "success"
    | "warning"
    | "error"
    | "info"
    | "successDark"
    | "warningDark"
    | "errorDark"
    | "infoDark";

export interface NotificationToastProps
    extends React.HTMLAttributes<HTMLDivElement> {
    type: NotificationToast;
    title: string | undefined;
    description: string | undefined;
    icon: string | undefined;
}
