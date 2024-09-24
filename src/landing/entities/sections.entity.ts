import { Button } from "./components.entity";

let Section = {
    component: "Section",
    id: {
        type: "random-string",
        required: true
    },
    settings: {
        variation: {
            type: "select",
            options: [1, 2, 3],
            default: 2
        },
        is_action: {
            type: "boolean",
            default: false
        },
    },
    block: {}
}

export let HeroSection = Object.assign(Section, {
    component: "Hero",
    block: {
        title: {
            type: "string",
        },
        subtitle: {
            type: "string",
        },
        image: {
            type: "media",
            required: false,
            allowed_types: [
                "images"
            ]
        },
        buttons: {
            type: "repeater",
            max: 2,
            component: Button
        }
    } 
});

export let GallerySection = Object.assign(Section, {
    component: "Gallery",
    block: {
        title: { type: "string" },
        subtitle: { type: "string" },
        items: {
            type: "repeater",
            component: {
                url: {
                    type: "media",
                    required: false,
                    allowed_types: [
                        "images"
                    ]
                }
            }
        }
    } 
});

export let ResourcesSection = Object.assign(Section, {
    component: "Resources",
    block: {
        title: { type: "string" },
        items: {
            type: "repeater",
            component: {
                title: { type: "string" },
                text: { type: "string" },
                button: Button
            }
        }
    } 
});

export let MediaContentSection = Object.assign(Section, {
    component: "MediaContent",
    block: {
        top_title: { type: "string" },
        title: { type: "string" },
        text: { type: "string" },
        button: Button,
        media: {
            type: "media",
            allowed_types: [
                "images"
            ]
        }
    } 
});

export let FeaturesSection = Object.assign(Section, {
    component: "Features",
    block: {
        title: { type: "string" },
        items: {
            type: "repeater",
            component: {
                title: { type: "string" },
                text: { type: "string" },
                image: {
                    type: "media",
                    allowed_types: [
                        "images"
                    ]
                }
            }
        },
        image: {
            type: "media",
            allowed_types: [
                "images"
            ]
        }
    } 
});

export let BenefitsSection = Object.assign(Section, {
    component: "Benefits",
    block: {
        title: { type: "string" },
        button: Button,
        items: {
            type: "repeater",
            component: {
                title: { type: "string" },
                subtitle: { type: "string" },
                image: {
                    type: "media",
                    allowed_types: [
                        "images"
                    ]
                }
            }
        },
        image: {
            type: "media",
            allowed_types: [
                "images"
            ]
        }
    } 
});

export let HowItWorksSection = Object.assign(Section, {
    component: "HowItWorks",
    block: {
        title: { type: "string" },
        subtitle: { type: "string" },
        button: Button,
        image: {
            type: "media",
            allowed_types: [
                "images"
            ]
        },
        steps: {
            type: "repeater",
            component: {
                title: { type: "string" },
                subtitle: { type: "string" }
            }
        }        
    } 
});

export let TestimonialsSection = Object.assign(Section, {
    component: "Testimonials",
    block: {
        title: { type: "string" },
        subtitle: { type: "string" },
        button: Button,
        image: {
            type: "media",
            allowed_types: [
                "images"
            ]
        },
        steps: {
            type: "repeater",
            component: {
                title: { type: "string" },
                subtitle: { type: "string" }
            }
        }        
    } 
});
