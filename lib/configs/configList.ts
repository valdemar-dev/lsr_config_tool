type Config = {
    id: number;
    title: string;
    description: string;
    author: string;
    modVersion: string;
    createdAt: Date;
    addons: Addon[];
}

const configList: Config[] = [
    {
        id: 0,
        title: "Burger Shot Pack",
        description: "Ever wanted to eat a burger made of [REDACTED]? Well now you can! Come to burger shot, and try out our all new Sloppy Joe!",
        author: "the.monologue",
        modVersion: "1.00378",
        createdAt: new Date("2008-11-12"),
        addons: [
            {
                id: 0,
                name: "Sloppy Joe Burger",
                description: "The Sloppy Joe Burger.",
                addonFolderName: "SloppyJoeBurger",
                isRequired: true,
            },
        ]
    }
];

export default configList;
