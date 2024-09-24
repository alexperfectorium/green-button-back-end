export interface ColorsType {
    "light": string,
    "dark": string,
    "accent": string,
    "text": string,
    "miscellaneous": string
}

export let Colors = {
    "light": { type: "color-picker" },
    "dark": { type: "color-picker" },
    "accent": { type: "color-picker" },
    "text": { type: "color-picker" },
    "miscellaneous": { type: "color-picker" }
}