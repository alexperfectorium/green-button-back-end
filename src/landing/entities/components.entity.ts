export const Button = {
    type: {
        type: "select",
        options: ["link", "button"],
        required: true,
        default: "link"
    },
    text: {
        type: "string",
        required: true
    },
    link: {
        type: "string"
    },
    action: {
        type: "string"
    }
};