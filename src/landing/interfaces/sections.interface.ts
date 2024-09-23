import { Button } from "./button.interface";

interface Section {
    component: string
    id: string,
    settings: {
        variation: 1 | 2 | 3;
        isMenu?: boolean;
        isAction?: boolean
    },
    block: {
        title: string;
    }
}

interface HeroSection extends Section {
    block: {
        title: string;
        subtitle: string;
        image: string;
        buttons: Array<Button>
    }
}