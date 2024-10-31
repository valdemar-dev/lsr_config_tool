type Addon = {
    id: number;
    name: string;
    description: string;
    addonFolderName: string;
    isRequired: boolean;
    addonFolderFiles: string[];
}

type Config = {
    id: number;
    title: string;
    description: string;
    author: string;
    modVersion: string;
    createdAt: Date;
    addons: Addon[];
}
