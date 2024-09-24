import { Button } from "./components.entity";

let Section = {
    component: "Section",
    id: "section-id",
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
};

export let GallerySection = {
    ...Section,
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
};

export let ResourcesSection = {
    ...Section,
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
};

export let BenefitsSection = {
    ...Section,
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
            type: "repeater",
            component: {
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
            type: "repeater",
            component: {
                quote: { type: "string" },
                author: {
                    type: "group",
                    component: {
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
            type: "repeater",
            component: {
                question: { type: "string" },
                answer: { type: "string" }
            }
        }        
    } 
};

export let CallToActionSection = {
    ...Section,
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
        form: {
            type: "group",
            component: {
                fields: {
                    type: "repeater",
                    component: {
                        type: {
                            type: "select",
                            options: ["text", "textarea", "tel", "email", "select"],
                            default: "text"
                        },
                        name: { type: "string" },
                        required: { type: "boolean" },
                        placeholder: { type: "string" },
                        options: {
                            type: "repeater",
                            component: {
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
            type: "repeater",
            component: {
                type: {
                    type: "select",
                    options: ["location", "phone", "mail"],
                    default: "mail"
                },
                text: { type: "string" },
                url: { type: "string" }
            }
        }   
    } 
};

export let Sections = [
    HeroSection, 
    GallerySection, 
    ResourcesSection, 
    MediaContentSection, 
    FeaturesSection, 
    BenefitsSection, 
    HowItWorksSection,
    TestimonialsSection,
    FAQSection,
    CallToActionSection
];