export interface Button {
    type: "link" | "button",
    text: string;
    link?: string;
    action?: string
}