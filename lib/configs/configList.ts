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
                description: "Adds The Sloppy Joe Burger & TAG-HARD Flashlight.",
                addonFolderName: "SloppyJoeBurger",
                addonFolderFiles: [
                    "ModItems.xml",
                ],
                isRequired: true,
            },
            {
                id: 1,
                name: "Nuka-Cola",
                description: "Adds the Nuka-Cola Item.",
                addonFolderName: "NukaCola",
                addonFolderFiles: [
                    "ModItems.xml",
                ],
                isRequired: false,
            },
        ]
    }
];

export default configList;
