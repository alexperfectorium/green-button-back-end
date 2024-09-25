import { Button } from "./components.entity";

let Section = {
    component: "Section",
    id: "section-id",
    settings: {
        variation: [1, 2, 3],
        is_action: false,
    },
    block: {}
}

export interface SectionType {
    id: string;
    component: string;
    settings: {
        variation: number;
        inMenu: boolean;
        isAction: boolean;
    };
    block: Object;
}

export let HeroSection = {
    ...Section,
    component: "Hero",
    block: {
        title: {
            type: "string",
            description: "Title of hero section"
        },
        subtitle: {
            type: "string",
            description: "Subtitle of hero section"
        },
        // image: {
        //     type: "media",
        //     required: false,
        //     allowed_types: [
        //         "images"
        //     ]
        // },
        // buttons: {
        //     type: "array",
        //     description: "Array of buttons properties. Max 2 items",
        //     items: Button,
        //     maxLength: 2
        // }
    } 
};

export let GallerySection = {
    ...Section,
    component: "Gallery",
    block: {
        title: { 
            type: "string",
            description: "Title of gallery section"
        },
        subtitle: { 
            type: "string",
            description: "Subtitle of gallery section"
        },
        // items: {
        //     type: "array",
        //     items: {
        //         url: {
        //             type: "media",
        //             required: false,
        //             allowed_types: [
        //                 "images"
        //             ]
        //         }
        //     }
        // }
    } 
};

export let ResourcesSection = {
    ...Section,
    component: "Resources",
    block: {
        title: { 
            type: "string",
            description: "Title of resources section" 
        },
        items: {
            type: "array",
            description: "Array of some avaiable resources",
            items: {
                type: "object",
                properties: {
                    title: { 
                        type: "string",
                        description: "Title of resources item"
                    },
                    text: { 
                        type: "string", 
                        description: "Text of resources item"
                    },
                    // button: Button
                }
            }
        }
    } 
};

export let MediaContentSection = {
    ...Section,
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
};

export let FeaturesSection = {
    ...Section,
    component: "Features",
    block: {
        title: { type: "string" },
        items: {
            type: "array",
            items: {
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
};

export let BenefitsSection = {
    ...Section,
    component: "Benefits",
    block: {
        title: { type: "string" },
        button: Button,
        items: {
            type: "array",
            items: {
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
};

export let HowItWorksSection = {
    ...Section,
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
            type: "array",
            items: {
                title: { type: "string" },
                subtitle: { type: "string" }
            }
        }        
    } 
};

export let TestimonialsSection = {
    ...Section,
    component: "Testimonials",
    block: {
        title: { type: "string" },
        items: {
            type: "array",
            items: {
                quote: { type: "string" },
                author: {
                    type: "object",
                    properties: {
                        avatar: {
                            type: "media",
                            allowed_types: [
                                "images"
                            ]
                        },
                        name: { type: "string" },
                        position: { type: "string" }
                    }
                }
            }
        }        
    } 
};

export let FAQSection = {
    ...Section,
    component: "FAQ",
    block: {
        title: { type: "string" },
        items: {
            type: "array",
            items: {
                question: { type: "string" },
                answer: { type: "string" }
            }
        }        
    } 
};

export let CallToActionSection = {
    ...Section,
    settings: {
        ...Section.settings,
        is_action: true
    },
    component: "CallToAction",
    block: {
        title: { type: "string" },
        subtitle: { type: "string" },
        image: {
            type: "media",
            allowed_types: [
                "images"
            ]
        },
    }, 
    form: {
        type: "object",
        properties: {
            fields: {
                type: "array",
                items: {
                    type: {
                        type: "select",
                        options: ["text", "textarea", "tel", "email", "select"],
                        default: "text"
                    },
                    name: { type: "string" },
                    required: { type: "boolean" },
                    placeholder: { type: "string" },
                    options: {
                        type: "array",
                        items: {
                            slug: {type: "string"},
                            title: {type: "string"}
                        },
                        condition: "type.eq.select"
                    }
                }
            },
            success_message: { type: "string" },
            button: { type: "string" }
        }
    },
    contact_info: {
        type: "array",
        items: {
            type: {
                type: "select",
                options: ["location", "phone", "mail"],
                default: "mail"
            },
            text: { type: "string" },
            url: { type: "string" }
        }
    }   
};

export let Sections = [
    HeroSection, 
    GallerySection, 
    ResourcesSection, 
    // MediaContentSection, 
    // FeaturesSection, 
    // BenefitsSection, 
    // HowItWorksSection,
    // TestimonialsSection,
    // FAQSection,
    // CallToActionSection
];